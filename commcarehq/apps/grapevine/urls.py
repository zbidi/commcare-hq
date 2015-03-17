from django.conf.urls import *
from .api import GrapevineResource

gvi_resource = GrapevineResource()

urlpatterns = patterns('commcarehq.apps.grapevine.views',
    url(r'^api/', include(gvi_resource.urls)),
)
