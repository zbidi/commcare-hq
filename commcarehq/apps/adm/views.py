from django.http import HttpResponseRedirect
from django.shortcuts import render

from commcarehq.apps.crud.views import BaseAdminCRUDFormView
from commcarehq.apps.domain.decorators import (require_superuser,
    login_and_domain_required)

@login_and_domain_required
def default_adm_report(request, domain, template="reports/base_template.html", **kwargs):
    from commcarehq.apps.adm.reports import ADMSectionView
    context = dict(
        domain=domain,
        project=domain,
        report=dict(
            title="Select a Report to View",
            show=True,
            slug=None,
            is_async=True,
            section_name=ADMSectionView.section_name,
        )
    )
    return render(request, template, context)

@require_superuser
def default_adm_admin(request):
    from commcarehq.apps.adm.admin.reports import ADMReportAdminInterface
    return HttpResponseRedirect(ADMReportAdminInterface.get_url())

class ADMAdminCRUDFormView(BaseAdminCRUDFormView):
    base_loc = "commcarehq.apps.adm.admin.forms"

    def is_form_class_valid(self, form_class):
        from commcarehq.apps.adm.admin.forms import ConfigurableADMColumnChoiceForm
        if form_class == ConfigurableADMColumnChoiceForm:
            self.template_name = "adm/forms/configurable_admin_adm_item.html"
        return True
