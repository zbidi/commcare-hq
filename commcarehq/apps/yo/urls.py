from django.conf.urls import *

urlpatterns = patterns('commcarehq.apps.yo.views',
    url(r'^sms/?$', 'sms_in', name='sms_in'),
)
