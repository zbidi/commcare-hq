"""
Logic about chws phones and cases go here.
"""
from collections import defaultdict
from datetime import datetime
import itertools
import logging
from casexml.apps.case.models import CommCareCase
from casexml.apps.case import const
from casexml.apps.case.xform import CaseDbCache
from casexml.apps.phone.models import CaseState
from dimagi.utils.decorators.memoized import memoized

logger = logging.getLogger(__name__)


def get_related_cases(initial_case_list, domain, strip_history=False, search_up=True):
    """
    Gets the flat list of related cases based on a starting list.
    Walks all the referenced indexes recursively.
    If search_up is True, all cases and their parent cases are returned.
    If search_up is False, all cases and their child cases are returned.
    """
    if not initial_case_list:
        return {}

    # todo: should assert that domain exists here but this breaks tests
    case_db = CaseDbCache(domain=domain,
                          strip_history=strip_history,
                          deleted_ok=True)

    def related(case_db, case):
        return [case_db.get(index.referenced_id) for index in (case.indices if search_up else case.reverse_indices)]

    relevant_cases = {}
    relevant_deleted_case_ids = []

    queue = list(case for case in initial_case_list)
    directly_referenced_indices = itertools.chain(*[[index.referenced_id for index in (case.indices if search_up else case.reverse_indices)]
                                                    for case in initial_case_list])
    case_db.populate(directly_referenced_indices)
    while queue:
        case = queue.pop()
        if case and case.case_id not in relevant_cases:
            relevant_cases[case.case_id] = case
            if case.doc_type == 'CommCareCase-Deleted':
                relevant_deleted_case_ids.append(case.case_id)
            queue.extend(related(case_db, case))

    if relevant_deleted_case_ids:
        logging.info('deleted cases included in footprint (restore): %s' % (
            ', '.join(relevant_deleted_case_ids)
        ))
    return relevant_cases


def get_footprint(initial_case_list, domain, strip_history=False):
    return get_related_cases(initial_case_list, domain, strip_history=strip_history, search_up=True)

class CaseSyncUpdate(object):
    """
    The record of how a case should sync
    """
    def __init__(self, case, sync_token):
        self.case = case
        self.sync_token = sync_token
        # cache this property since computing it can be expensive
        self.required_updates = self._get_required_updates()
        
    
    def _get_required_updates(self):
        """
        Returns a list of the required updates for this case/token
        pairing. Should be a list of actions like [create, update, close]
        """
        ret = []
        if not self.sync_token or not self.sync_token.phone_has_case(self.case.get_id):
            ret.append(const.CASE_ACTION_CREATE)
        # always include an update 
        ret.append(const.CASE_ACTION_UPDATE)
        if self.case.closed:
            ret.append(const.CASE_ACTION_CLOSE)
        return ret


def _to_case_id_set(cases):
    return set([c.case_id for c in cases])


class CaseSyncOperation(object):
    """
    A record of a user's sync operation
    """
    
    def __init__(self, user, last_sync):
        self.user = user
        self.last_sync = last_sync

    @property
    @memoized
    def actual_owned_cases(self):
        try:
            keys = [[owner_id, False] for owner_id in self.user.get_owner_ids()]
        except AttributeError:
            keys = [[self.user.user_id, False]]

        def _user_case_domain_match(case):
            if self.user.domain:
                return self.user.domain == case.domain
            return True

        cases = CommCareCase.view("case/by_owner_lite", keys=keys).all()
        return set(filter(_user_case_domain_match, cases))

    @property
    @memoized
    def actual_cases_to_sync(self):
        # the world to sync involves
        # Union(cases on the phone, footprint of those,
        #       cases the server thinks are the phone's, footprint of those)
        # intersected with:
        # (cases modified by someone else since the last sync)

        # TODO: clean this up. Basically everything is a set of cases,
        # but in order to do proper comparisons we use IDs so all of these
        # operations look much more complicated than they should be.
        actual_cases_to_sync = []
        for _, case in self.all_potential_to_sync_dict.items():
            sync_update = CaseSyncUpdate(case, self.last_sync)
            if sync_update.required_updates:
                actual_cases_to_sync.append(sync_update)

        return actual_cases_to_sync

    @property
    @memoized
    def _all_relevant_cases(self):
        return get_footprint(self.actual_owned_cases, domain=self.user.domain)

    @property
    @memoized
    def actual_relevant_cases(self):
        return set(self._all_relevant_cases.values())

    @property
    @memoized
    def actual_extended_cases(self):
        return set([
            self._get_case(case_id) for case_id in
            _to_case_id_set(self.actual_relevant_cases) -
            _to_case_id_set(self.actual_owned_cases)
        ])

    @property
    @memoized
    def phone_relevant_cases(self):
        return set([
            self._get_case(case_id) for case_id
            in self.last_sync.get_footprint_of_cases_on_phone()
        ]) if self.last_sync else set()

    @property
    @memoized
    def all_potential_cases(self):
        return set([
            self._get_case(case_id) for case_id in
            _to_case_id_set(self.actual_relevant_cases) |
            _to_case_id_set(self.phone_relevant_cases)
        ])

    @property
    @memoized
    def all_potential_to_sync(self):
        return filter_cases_modified_elsewhere_since_sync(list(self.all_potential_cases), self.last_sync)

    @property
    @memoized
    def all_potential_to_sync_dict(self):
        # this is messy but forces uniqueness at the case_id level, without
        # having to reload all the cases from the DB
        return dict((case.get_id, case) for case in self.all_potential_to_sync)

    def _get_case(self, case_id):
        if case_id in self._all_relevant_cases:
            return self._all_relevant_cases[case_id]
        else:
            case = CommCareCase.get_with_rebuild(case_id)
            self._all_relevant_cases[case_id] = case
            return case


class BatchedCaseSyncOperation(object):
    """
    A record of a user's sync operation
    """

    def __init__(self, user, last_sync, chunk_size=1000):
        self.user = user
        self.last_sync = last_sync
        self.chunk_size = chunk_size
        self.domain = self.user.domain
        self.actual_relevant_cases_global = {}
        self.actual_owned_cases_global = {}
        self.actual_cases_to_sync_global = {}

        try:
            self.owner_keys = [[owner_id, False] for owner_id in self.user.get_owner_ids()]
        except AttributeError:
            self.owner_keys = [[self.user.user_id, False]]

        self.case_query_kwargs = {
            'limit': chunk_size,
        }
        logger.debug(
            "BatchedCaseSyncOperation: user(%s) owners(%s)",
            self.user.user_id,
            [key[0] for key in self.owner_keys]
        )
        self.next_key()

    def next_key(self):
        if self.owner_keys:
            self.case_query_kwargs['startkey'] = self.owner_keys.pop()
            self.case_query_kwargs['endkey'] = self.case_query_kwargs['startkey']
        else:
            self.case_query_kwargs['startkey'] = None

    def view_results_chunk(self):
        logger.debug("BatchedCaseSyncOperation: query args: %s", self.case_query_kwargs)
        if not self.case_query_kwargs['startkey']:
            return

        results = CommCareCase.get_db().view(
            "case/by_owner_lite",
            **self.case_query_kwargs
        )
        len_results = len(results)

        for result in results:
            yield result

        logger.debug("BatchedCaseSyncOperation: len_results: %s", len_results)
        if len_results >= self.chunk_size:
            self.case_query_kwargs['startkey_docid'] = result['id']
            self.case_query_kwargs['skip'] = 1
        else:
            self.next_key()
            self.view_results_chunk()

    def _update_global_state(self, global_set, case_liset, case_getter=None):
        case_getter = case_getter if case_getter else lambda case: case
        global_set.update({
            case_getter(item).case_id: CaseState.from_case(case_getter(item)) for item in case_liset
        })

    def prepare_chunk(self):
        self.actual_owned_cases = self._actual_owned_cases()
        if self.actual_owned_cases:
            self.all_relevant_cases_dict = self._all_relevant_cases_dict(self.actual_owned_cases)
            actual_relevant_cases = set(self.all_relevant_cases_dict.values())

            self._update_global_state(self.actual_relevant_cases_global, actual_relevant_cases)
            self._update_global_state(self.actual_owned_cases_global, self.actual_owned_cases)

            potential_to_sync = self.get_potentail_cases(actual_relevant_cases)
            self.actual_cases_to_sync = self._actual_cases_to_sync(potential_to_sync)
            self._update_global_state(
                self.actual_cases_to_sync_global,
                self.actual_cases_to_sync,
                case_getter=lambda update: update.case
            )
            return True
        elif self.last_sync:
            other_cases_on_phone = set([
                self._get_case(case_id) for case_id
                in self.last_sync.get_footprint_of_cases_on_phone()
                if case_id not in self.actual_relevant_cases_global
            ])
            potential_to_sync = self.get_potentail_cases(other_cases_on_phone)
            self.actual_cases_to_sync = self._actual_cases_to_sync(potential_to_sync)
            self._update_global_state(
                self.actual_cases_to_sync_global,
                self.actual_cases_to_sync,
                case_getter=lambda update: update.case
            )
            return True

        return False

    def get_potentail_cases(self, cases):
        return filter_cases_modified_elsewhere_since_sync(list(cases), self.last_sync)

    @property
    def actual_extended_cases_global(self):
        # should only be called once all chunks have been completed
        return list(set(self.actual_relevant_cases_global.values()) - set(self.actual_owned_cases_global.values()))

    def _actual_owned_cases(self):
        def _user_case_domain_match(case):
            return not self.domain or self.domain == case.domain

        cases = [CommCareCase.wrap(result['value']) for result in self.view_results_chunk()]
        return set(filter(_user_case_domain_match, cases))

    def _actual_cases_to_sync(self, all_potential_to_sync):
        # the world to sync involves
        # Union(cases on the phone, footprint of those,
        #       cases the server thinks are the phone's, footprint of those)
        # intersected with:
        # (cases modified by someone else since the last sync)

        # TODO: clean this up. Basically everything is a set of cases,
        # but in order to do proper comparisons we use IDs so all of these
        # operations look much more complicated than they should be.
        actual_cases_to_sync = []
        for case in all_potential_to_sync:
            sync_update = CaseSyncUpdate(case, self.last_sync)
            if sync_update.required_updates:
                actual_cases_to_sync.append(sync_update)

        return actual_cases_to_sync

    def _all_relevant_cases_dict(self, actual_owned_cases):
        return get_footprint(actual_owned_cases, domain=self.user.domain)

    def _get_case(self, case_id):
        if case_id in self.all_relevant_cases_dict:
            return self.all_relevant_cases_dict[case_id]
        else:
            case = CommCareCase.get_with_rebuild(case_id)
            self.all_relevant_cases_dict[case_id] = case
            return case


def get_case_updates(user, last_sync):
    """
    Given a user, get the open/updated cases since the last sync
    operation.  This returns a CaseSyncOperation object containing
    various properties about cases that should sync.
    """
    return CaseSyncOperation(user, last_sync)

def filter_cases_modified_elsewhere_since_sync(cases, last_sync):
    # this function is pretty ugly and is heavily optimized to reduce the number
    # of queries to couch.
    if not last_sync:
        return cases
    else:
        case_ids = [case._id for case in cases]
        case_log_map = CommCareCase.get_db().view('phone/cases_to_sync_logs',
            keys=case_ids,
            reduce=False,
        )
        # incoming format is a list of objects that look like this:
        # {
        #   'value': '[log id]',
        #   'key': '[case id]',
        # }
        unique_combinations = set((row['key'], row['value']) for row in case_log_map)
        modification_dates = CommCareCase.get_db().view('phone/case_modification_status',
            keys=[list(combo) for combo in unique_combinations],
            reduce=True,
            group=True,
        )
        # we'll build a structure that looks like this for efficiency:
        # { case_id: [{'token': '[token value', 'date': '[date value]'}, ...]}
        all_case_updates_by_sync_token = defaultdict(lambda: [])
        for row in modification_dates:
            # incoming format is a list of objects that look like this:
            # {
            #   'value': '2012-08-22T08:55:14Z', (most recent date updated)
            #   'key': ['[case id]', '[sync token id]']
            # }
            if row['value']:
                all_case_updates_by_sync_token[row['key'][0]].append(
                    {'token': row['key'][1], 'date': datetime.strptime(row['value'], '%Y-%m-%dT%H:%M:%SZ')}
                )

        def case_modified_elsewhere_since_sync(case):
            # NOTE: uses closures
            return any([row['date'] >= last_sync.date and row['token'] != last_sync._id
                        for row in all_case_updates_by_sync_token[case._id]])

        def relevant(case):
            return case_modified_elsewhere_since_sync(case) or not last_sync.phone_is_holding_case(case.get_id)

        return filter(relevant, cases)
