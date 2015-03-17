from django.conf import settings
from django.conf.urls import patterns, url, include
from django.views.generic import TemplateView, RedirectView
from commcarehq.apps.domain.utils import legacy_domain_re

from django.contrib import admin
from commcarehq.apps.domain.views import ProBonoStaticView
from commcarehq.apps.hqwebapp.templatetags.hq_shared_tags import static
from commcarehq.apps.orgs.urls import organizations_urls
from commcarehq.apps.reports.urls import report_urls

try:
    from localsettings import LOCAL_APP_URLS
except ImportError:
    LOCAL_APP_URLS = ()
admin.autodiscover()

handler500 = 'commcarehq.apps.hqwebapp.views.server_error'
handler404 = 'commcarehq.apps.hqwebapp.views.not_found'
handler403 = 'commcarehq.apps.hqwebapp.views.no_permissions'

from commcarehq.apps.hqwebapp.urls import domain_specific as hqwebapp_domain_specific
from commcarehq.apps.settings.urls import domain_specific as settings_domain_specific
from commcarehq.apps.settings.urls import users_redirect, domain_redirect
from commcarehq.apps.adm.urls import adm_admin_interface_urls
from commcarehq.apps.sms.urls import sms_admin_interface_urls


domain_specific = patterns('',
    url(r'^logo.png', 'commcarehq.apps.domain.views.logo', name='logo'),
    (r'^apps/', include('commcarehq.apps.app_manager.urls')),
    (r'^api/', include('commcarehq.apps.api.urls')),
    # the receiver needs to accept posts at an endpoint that might
    # not have a slash, so don't include it at the root urlconf
    (r'^receiver', include('commcarehq.apps.receiverwrapper.urls')),
    (r'^settings/', include(settings_domain_specific)),
    (r'^users/', include(users_redirect)),
    (r'^domain/', include(domain_redirect)),
    (r'^groups/', include('commcarehq.apps.groups.urls')),
    (r'^phone/', include('commcarehq.apps.ota.urls')),
    (r'^phone/', include('commcarehq.apps.mobile_auth.urls')),
    (r'^sms/', include('commcarehq.apps.sms.urls')),
    (r'^commtrack/', include('commcarehq.apps.commtrack.urls')),
    (r'^reminders/', include('commcarehq.apps.reminders.urls')),
    (r'^indicators/mvp/', include('mvp.urls')),
    (r'^indicators/', include('commcarehq.apps.indicators.urls')),
    (r'^reports/adm/', include('commcarehq.apps.adm.urls')),
    (r'^reports/', include('commcarehq.apps.reports.urls')),
    (r'^data/', include('commcarehq.apps.data_interfaces.urls')),
    (r'^', include(hqwebapp_domain_specific)),
    (r'^case/', include('commcarehq.apps.hqcase.urls')),
    (r'^cleanup/', include('commcarehq.apps.cleanup.urls')),
    (r'^cloudcare/', include('commcarehq.apps.cloudcare.urls')),
    (r'^fixtures/', include('commcarehq.apps.fixtures.urls')),
    (r'^importer/', include('commcarehq.apps.importer.urls')),
    (r'^sqlextract/', include('ctable_view.urls')),
    (r'^fri/', include('custom.fri.urls')),
    (r'^ilsgateway/', include('custom.ilsgateway.urls')),
    (r'^dhis2/', include('custom.dhis2.urls')),
    (r'^ewsghana/', include('custom.ewsghana.urls')),
    (r'^up_nrhm/', include('custom.up_nrhm.urls')),
    (r'^', include('custom.m4change.urls')),
    (r'^', include('custom.uth.urls')),
    (r'^dashboard/', include('commcarehq.apps.dashboard.urls')),
    (r'^configurable_reports/', include('commcarehq.apps.userreports.urls')),
)

urlpatterns = patterns('',
    (r'^favicon\.ico$', RedirectView.as_view(
        url=static('hqwebapp/img/favicon2.png'))),
    (r'^auditcare/', include('auditcare.urls')),
    (r'^admin/', include(admin.site.urls)),
    (r'^register/', include('commcarehq.apps.registration.urls')),
    (r'^a/(?P<domain>%s)/' % legacy_domain_re, include(domain_specific)),
    (r'^o/', include('commcarehq.apps.orgs.urls')),
    (r'^organizations/', include(organizations_urls)),
    (r'^account/', include('commcarehq.apps.settings.urls')),
    (r'^couch/', include('djangocouch.urls')),
    (r'^project_store(.*)$', 'commcarehq.apps.appstore.views.rewrite_url'),
    (r'^exchange/', include('commcarehq.apps.appstore.urls')),
    (r'^webforms/', include('touchforms.formplayer.urls')),
    (r'', include('commcarehq.apps.hqwebapp.urls')),
    (r'', include('commcarehq.apps.domain.urls')),
    (r'^adm/', include(adm_admin_interface_urls)),
    (r'^announcements/', include('commcarehq.apps.announcements.urls')),
    (r'^hq/accounting/', include('commcarehq.apps.accounting.urls')),
    (r'^hq/sms/', include(sms_admin_interface_urls)),
    (r'^hq/multimedia/', include('commcarehq.apps.hqmedia.urls')),
    (r'^hq/admin/', include('commcarehq.apps.hqadmin.urls')),
    (r'^hq/reports/', include(report_urls)),
    (r'^hq/flags/', include('commcarehq.apps.toggle_ui.urls')),
    (r'^hq/pillow_errors/', include('commcarehq.apps.hqpillow_retry.urls')),
    (r'^couchlog/', include('couchlog.urls')),
    (r'^formtranslate/', include('formtranslate.urls')),
    (r'^unicel/', include('commcarehq.apps.unicel.urls')),
    (r'^tropo/', include('commcarehq.apps.tropo.urls')),
    (r'^twilio/', include('commcarehq.apps.twilio.urls')),
    (r'^megamobile/', include('commcarehq.apps.megamobile.urls')),
    (r'^telerivet/', include('commcarehq.apps.telerivet.urls')),
    (r'^kookoo/', include('commcarehq.apps.kookoo.urls')),
    (r'^yo/', include('commcarehq.apps.yo.urls')),
    (r'^gvi/', include('commcarehq.apps.grapevine.urls')),
    (r'^sislog/', include('commcarehq.apps.sislog.urls')),
    (r'^langcodes/', include('langcodes.urls')),
    (r'^builds/', include('commcarehq.apps.builds.urls')),
    (r'^downloads/temp/', include('soil.urls')),
    (r'^test/CommCare.jar', 'commcarehq.apps.app_manager.views.download_test_jar'),
    (r'^sqlextract/', include('ctable_view.urls')),
    (r'^styleguide/', include('commcarehq.apps.styleguide.urls')),
    (r'^500/$', TemplateView.as_view(template_name='500.html')),
    (r'^404/$', TemplateView.as_view(template_name='404.html')),
    (r'^403/$', TemplateView.as_view(template_name='403.html')),
    url(r'^eula_basic/$', TemplateView.as_view(template_name='eula.html'), name='eula_basic'),
    url(r'^eula/$', 'commcarehq.apps.hqwebapp.views.eula', name='eula'),
    url(r'^apache_license_basic/$', TemplateView.as_view(template_name='apache_license.html'), name='apache_license_basic'),
    url(r'^apache_license/$', 'commcarehq.apps.hqwebapp.views.apache_license', name='apache_license'),
    url(r'^bsd_license_basic/$', TemplateView.as_view(template_name='bsd_license.html'), name='bsd_license_basic'),
    url(r'^bsd_license/$', 'commcarehq.apps.hqwebapp.views.bsd_license', name='bsd_license'),
    url(r'^product_agreement/$', 'commcarehq.apps.hqwebapp.views.product_agreement', name='product_agreement'),
    url(r'^exchange/cda_basic/$', TemplateView.as_view(template_name='cda.html'), name='cda_basic'),
    url(r'^exchange/cda/$', 'commcarehq.apps.hqwebapp.views.cda', name='cda'),
    url(r'^sms_in/$', 'commcarehq.apps.sms.views.sms_in', name='sms_in'),
    url(r'^unsubscribe/(?P<user_id>[\w-]+)/',
        'commcarehq.apps.hqwebapp.views.unsubscribe', name='unsubscribe'),
    (r'^wisepill/', include('custom.apps.wisepill.urls')),
    url(r'^pro_bono/$', ProBonoStaticView.as_view(),
        name=ProBonoStaticView.urlname),
    url(r'^loadtest/', include('commcarehq.apps.loadtestendpoints.urls')),
    (r'^public/', include('commcarehq.apps.public.urls')),
) + patterns('', *LOCAL_APP_URLS)

# django rosetta support if configured
if 'rosetta' in settings.INSTALLED_APPS:
    urlpatterns += patterns('',
        url(r'^rosetta/', include('rosetta.urls')),
    )

#django-staticfiles static/ url mapper
if settings.DEBUG:
    urlpatterns += patterns('django.contrib.staticfiles.views',
        url(r'^static/(?P<path>.*)$', 'serve'),
    )

