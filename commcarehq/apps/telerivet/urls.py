from django.conf.urls import *

urlpatterns = patterns('commcarehq.apps.telerivet.views',
    url(r'^in/?$', 'incoming_message', name='incoming_message'),
)
