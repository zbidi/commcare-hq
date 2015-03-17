from django.conf.urls import url, patterns
from commcarehq.apps.ota.views import PrimeRestoreCacheView


urlpatterns = patterns('commcarehq.apps.ota.views',
    url(r'^restore/$', 'restore'),
    url(r'^historical_forms/$', 'historical_forms'),
    url(r'^prime_restore/$', PrimeRestoreCacheView.as_view(), name=PrimeRestoreCacheView.urlname),
)
