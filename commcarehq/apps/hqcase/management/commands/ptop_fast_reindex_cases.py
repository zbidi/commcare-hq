from casexml.apps.case.models import CommCareCase
from commcarehq.apps.hqcase.management.commands.ptop_fast_reindexer import ElasticReindexer
from commcarehq.pillows.case import CasePillow


class Command(ElasticReindexer):
    help = "Fast reindex of case elastic index by using the case view and reindexing cases"

    doc_class = CommCareCase
    view_name = 'case/by_owner'
    pillow_class = CasePillow
