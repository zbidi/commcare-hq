from __future__ import absolute_import

try:
    from commcarehq.apps.app_manager.tests.test_app_manager import *
    from commcarehq.apps.app_manager.tests.test_xml_parsing import *
    from commcarehq.apps.app_manager.tests.test_xform_parsing import *
    from commcarehq.apps.app_manager.tests.test_form_versioning import *
    from commcarehq.apps.app_manager.tests.test_success_message import *
    from commcarehq.apps.app_manager.tests.test_form_preparation_v2 import *
    from commcarehq.apps.app_manager.tests.test_days_ago_migration import *
    from commcarehq.apps.app_manager.tests.test_suite import *
    from commcarehq.apps.app_manager.tests.test_media_suite import *
    from commcarehq.apps.app_manager.tests.test_profile import *
    from commcarehq.apps.app_manager.tests.test_build_errors import *
    from commcarehq.apps.app_manager.tests.test_bulk_ui_translation import *
    from commcarehq.apps.app_manager.tests.test_views import *
    from commcarehq.apps.app_manager.tests.test_commcare_settings import *
    from commcarehq.apps.app_manager.tests.test_brief_view import *
    from commcarehq.apps.app_manager.tests.test_xpath import *
    from commcarehq.apps.app_manager.tests.test_bulk_app_translation import *
    from .test_location_xpath import *
    from .test_get_questions import *
    from .test_repeater import *
    from .test_broken_build import *
    from commcarehq.apps.app_manager.tests.test_case_meta import *
except ImportError, e:
    # for some reason the test harness squashes these so log them here for clarity
    # otherwise debugging is a pain
    import logging
    logging.exception(e)
    raise

from commcarehq.apps.app_manager.util import is_valid_case_type
from commcarehq.apps.app_manager.id_strings import _format_to_regex

__test__ = {
    'is_valid_case_type': is_valid_case_type,
    '_format_to_regex': _format_to_regex,
}
