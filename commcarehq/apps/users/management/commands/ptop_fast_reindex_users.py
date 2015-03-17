from commcarehq.apps.users.models import CommCareUser
from commcarehq.apps.hqcase.management.commands.ptop_fast_reindexer import ElasticReindexer
from commcarehq.pillows.user import UserPillow


class Command(ElasticReindexer):
    help = "Fast reindex of user elastic index by using the domain view and reindexing users"

    doc_class = CommCareUser
    view_name = 'users/by_username'
    pillow_class = UserPillow
