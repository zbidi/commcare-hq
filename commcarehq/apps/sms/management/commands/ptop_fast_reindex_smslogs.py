from commcarehq.apps.sms.models import SMSLog
from commcarehq.apps.hqcase.management.commands.ptop_fast_reindexer import ElasticReindexer
from commcarehq.pillows.sms import SMSPillow


class Command(ElasticReindexer):
    help = "Fast reindex of user elastic index by using the domain view and reindexing users"

    doc_class = SMSLog
    view_name = 'sms/by_domain'
    pillow_class = SMSPillow
