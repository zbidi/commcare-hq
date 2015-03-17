from django.conf.urls import *

urlpatterns = patterns('commcarehq.apps.megamobile.views',
    url(r'^sms/?$', 'sms_in', name='sms_in'),
)
