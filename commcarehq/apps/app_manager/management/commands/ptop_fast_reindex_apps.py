from commcarehq.apps.app_manager.models import ApplicationBase
from commcarehq.apps.hqcase.management.commands.ptop_fast_reindexer import ElasticReindexer
from commcarehq.pillows.application import AppPillow


class Command(ElasticReindexer):
    help = "Fast reindex of app elastic index by using the applications view and reindexing apps"

    doc_class = ApplicationBase
    view_name = 'app_manager/applications'
    pillow_class = AppPillow
