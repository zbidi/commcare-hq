from django.conf.urls import *

urlpatterns = patterns('commcarehq.apps.hqcouchlog.views',
    (r'^fail/$', 'fail'),
)
