from __future__ import print_function
import logging
from commcarehq.apps.callcenter.utils import sync_user_cases
from commcarehq.apps.users.signals import commcare_user_post_save

logger = logging.getLogger(__name__)

def sync_user_cases_signal(sender, **kwargs):
    return sync_user_cases(kwargs["couch_user"])

commcare_user_post_save.connect(sync_user_cases_signal)
