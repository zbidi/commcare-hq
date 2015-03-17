from django.conf.urls import *
from commcarehq.apps.hqpillow_retry.views import EditPillowError

urlpatterns = patterns('commcarehq.apps.hqpillow_retry.views',
    url(r'^edit_errors/$', EditPillowError.as_view(), name=EditPillowError.urlname),

)
