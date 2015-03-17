from commcarehq.apps.domain.models import Domain
from commcarehq.apps.hqcase.management.commands.ptop_fast_reindexer import ElasticReindexer
from commcarehq.pillows.domain import DomainPillow


class Command(ElasticReindexer):
    help = "Fast reindex of domain elastic index by using the domain view and reindexing domains"

    doc_class = Domain
    view_name = 'domain/domains'
    pillow_class = DomainPillow
