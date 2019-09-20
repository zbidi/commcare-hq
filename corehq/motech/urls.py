from django.conf.urls import url

from corehq.motech.repeaters.views import (
    AddCaseRepeaterView,
    AddFormRepeaterView,
    AddRepeaterView,
    DomainForwardingOptionsView,
    EditCaseRepeaterView,
    EditFormRepeaterView,
    EditOpenmrsRepeaterView,
    EditRepeaterView,
    drop_repeater,
    pause_repeater,
    resume_repeater,
    test_repeater,
)
from corehq.motech.repeaters.views.repeaters import EditDhis2RepeaterView
from corehq.motech.views import MotechLogDetailView, MotechLogListView


urlpatterns = [
    url(r'^forwarding/$', DomainForwardingOptionsView.as_view(), name=DomainForwardingOptionsView.urlname),
    url(r'^forwarding/new/FormRepeater/$', AddFormRepeaterView.as_view(), {'repeater_type': 'FormRepeater'},
        name=AddFormRepeaterView.urlname),
    url(r'^forwarding/new/CaseRepeater/$', AddCaseRepeaterView.as_view(), {'repeater_type': 'CaseRepeater'},
        name=AddCaseRepeaterView.urlname),
    url(r'^forwarding/new/(?P<repeater_type>\w+)/$', AddRepeaterView.as_view(), name=AddRepeaterView.urlname),

    url(r'^forwarding/edit/CaseRepeater/(?P<repeater_id>\w+)/$', EditCaseRepeaterView.as_view(),
        {'repeater_type': 'CaseRepeater'}, name=EditCaseRepeaterView.urlname),
    url(r'^forwarding/edit/FormRepeater/(?P<repeater_id>\w+)/$', EditFormRepeaterView.as_view(),
        {'repeater_type': 'FormRepeater'}, name=EditFormRepeaterView.urlname),
    url(r'^forwarding/edit/OpenmrsRepeater/(?P<repeater_id>\w+)/$', EditOpenmrsRepeaterView.as_view(),
        {'repeater_type': 'OpenmrsRepeater'}, name=EditOpenmrsRepeaterView.urlname),
    url(r'^forwarding/edit/Dhis2Repeater/(?P<repeater_id>\w+)/$', EditDhis2RepeaterView.as_view(),
        {'repeater_type': 'Dhis2Repeater'}, name=EditDhis2RepeaterView.urlname),
    url(r'^forwarding/edit/(?P<repeater_type>\w+)/(?P<repeater_id>\w+)/$', EditRepeaterView.as_view(),
        name=EditRepeaterView.urlname),

    url(r'^forwarding/test/$', test_repeater, name='test_repeater'),
    url(r'^forwarding/drop/(?P<repeater_id>[\w-]+)/$', drop_repeater, name='drop_repeater'),
    url(r'^forwarding/pause/(?P<repeater_id>[\w-]+)/$', pause_repeater, name='pause_repeater'),
    url(r'^forwarding/resume/(?P<repeater_id>[\w-]+)/$', resume_repeater, name='resume_repeater'),

    url(r'^logs/$', MotechLogListView.as_view(), name=MotechLogListView.urlname),
    url(r'^logs/(?P<pk>\d+)/$', MotechLogDetailView.as_view(), name=MotechLogDetailView.urlname),
]
