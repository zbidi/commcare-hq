from django.conf.urls import *

urlpatterns = patterns('commcarehq.apps.sislog.views',
    url(r'^in/?$', 'sms_in', name='sms_in'),
)
