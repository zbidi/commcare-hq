from commcarehq.apps.domain.decorators import cls_require_superusers
from commcarehq.apps.reports.dispatcher import ReportDispatcher


class SMSAdminInterfaceDispatcher(ReportDispatcher):
    prefix = 'sms_admin_interface'
    map_name = "SMS_ADMIN_INTERFACES"

    @cls_require_superusers
    def dispatch(self, request, *args, **kwargs):
        return super(SMSAdminInterfaceDispatcher, self).dispatch(request, *args, **kwargs)
