from django.conf.urls import *
from commcarehq.apps.adm.dispatcher import ADMAdminInterfaceDispatcher, ADMSectionDispatcher
from commcarehq.apps.adm.views import ADMAdminCRUDFormView

adm_admin_interface_urls = patterns('commcarehq.apps.adm.views',
    url(r'^$', 'default_adm_admin', name="default_adm_admin_interface"),
    url(r'^form/(?P<form_type>[\w_]+)/(?P<action>[(update)|(new)|(delete)]+)/((?P<item_id>[\w_]+)/)?$',
        ADMAdminCRUDFormView.as_view(), name="adm_item_form"),
    ADMAdminInterfaceDispatcher.url_pattern(),
)

urlpatterns = patterns('commcarehq.apps.adm.views',
    url(r'^$', 'default_adm_report', name="default_adm_report"),
    ADMSectionDispatcher.url_pattern(),
)
