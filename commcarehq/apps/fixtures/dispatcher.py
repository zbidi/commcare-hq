from commcarehq import privileges
from commcarehq.apps.accounting.decorators import requires_privilege_with_fallback
from commcarehq.apps.reports.dispatcher import ProjectReportDispatcher
from django.utils.decorators import method_decorator
from commcarehq.apps.users.decorators import require_permission
from commcarehq.apps.users.models import Permissions


require_can_edit_fixtures = lambda *args, **kwargs: (
    require_permission(Permissions.edit_data)(
        requires_privilege_with_fallback(privileges.LOOKUP_TABLES)(*args, **kwargs)
    )
)


class FixtureInterfaceDispatcher(ProjectReportDispatcher):
    prefix = 'fixture_interface'
    map_name = 'FIXTURE_INTERFACES'

    @method_decorator(require_can_edit_fixtures)
    def dispatch(self, request, *args, **kwargs):
        return super(FixtureInterfaceDispatcher, self).dispatch(request, *args, **kwargs)
