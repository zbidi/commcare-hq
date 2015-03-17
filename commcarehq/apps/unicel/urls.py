from django.conf.urls import *

urlpatterns = patterns('',         
    url(r'^in/$', 'commcarehq.apps.unicel.views.incoming'),
)

