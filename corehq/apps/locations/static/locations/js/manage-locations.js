/* global define */
/**
 *  Handles "Manage Organization Structure" page.
 */
define([
    "locations/ko/location_tree.async",
    "django",
    "jquery",
    "knockout",
    "style/js/hq.helpers",
], function(
    location_tree,
    django,
    $,
    ko
) {
    "use strict";

    debugger;
    django.gettext("jls");
    var initialPageData = $.parseJSON($("#initial-page-json").text()),
        locs = initialPageData.locs,
        can_edit_root = initialPageData.can_edit_root,
        hierarchy = initialPageData.hierarchy,
        show_inactive = initialPageData.show_inactive,
        LOAD_LOCS_URL = initialPageData.api_root;

    var NEW_LOC_URL = '{% url "create_location" domain %}';

    function loc_edit_url(loc_id) {
        var template = '{% url "edit_location" domain "-locid-" %}';
        return template.replace('-locid-', loc_id);
    }

    function loc_archive_url(loc_id) {
        var template = '{% url "archive_location" domain "-locid-" %}';
        return template.replace('-locid-', loc_id);
    }

    function loc_unarchive_url(loc_id) {
        var template = '{% url "unarchive_location" domain "-locid-" %}';
        return template.replace('-locid-', loc_id);
    }

    function loc_delete_url(loc_id) {
        var template = '{% url "delete_location" domain "-locid-" %}';
        return template.replace('-locid-', loc_id);
    }

    function loc_descendant_url(loc_id) {
        var template = '{% url "location_descendants_count" domain "-locid-" %}';
        return template.replace('-locid-', loc_id);
    }

    var archive_success_message = _.template(gettext("You have successfully archived the location <%=name%>."));

    var delete_success_message = _.template(
        gettext("You have successfully deleted the location <%=name%> and all of its child locations.")
    );

    var delete_error_message = gettext("An error occurred while deleting your location. If the problem persists, please report an issue.");

    archive_loc = function(button, name, loc_id) {
        var archive_location_modal = $('#archive-location-modal')[0];

        function archive_fn() {
            $(button).disableButton();
            $.ajax({
                type: 'POST',
                url: loc_archive_url(loc_id),
                dataType: 'json',
                error: 'error',
                success: function (response) {
                    alert_user(archive_success_message({"name": name}), "success");
                    remove_elements_after_action(button);
                }
            });
            $(archive_location_modal).modal('hide');
            ga_track_event('Organization Structure', 'Archive')
        }

        var modal_context = {
            "name": name,
            "loc_id": loc_id,
            "archive_fn": archive_fn
        };
        ko.cleanNode(archive_location_modal);
        $(archive_location_modal).koApplyBindings(modal_context);
        $(archive_location_modal).modal('show');
    };

    unarchive_loc = function(button, loc_id) {
        $(button).disableButton();
        $.ajax({
            type: 'POST',
            url: loc_unarchive_url(loc_id),
            dataType: 'json',
            error: 'error',
            success: function (response) {
                remove_elements_after_action(button);
            }
        });
    };

    delete_loc = function(button, name, loc_id) {
        var delete_location_modal = $('#delete-location-modal')[0];
        var modal_context;

        function delete_fn() {
            if (modal_context.count == modal_context.signOff()) {
                $(button).disableButton();
                $.ajax({
                    type: 'DELETE',
                    url: loc_delete_url(loc_id),
                    dataType: 'json',
                    error: function (response, status, error) {
                        alert_user(delete_error_message, "warning");
                        $(button).enableButton();
                    },
                    success: function (response) {
                        if (response.success){
                            alert_user(delete_success_message({"name": name}), "success");
                            remove_elements_after_action(button);
                        }
                        else {
                            alert_user(response.message, "warning");
                            $(button).enableButton();
                        }
                    }
                });
                $(delete_location_modal).modal('hide');
                ga_track_event('Organization Structure', 'Delete')
            }
        }

        $.ajax({
            type: 'GET',
            url: loc_descendant_url(loc_id),
            dataType: 'json',
            success: function (response) {
                modal_context = {
                    "name": name,
                    "loc_id": loc_id,
                    "delete_fn": delete_fn,
                    "count": response.count,
                    "signOff": ko.observable('')
                };
                ko.cleanNode(delete_location_modal);
                ko.applyBindings(modal_context, delete_location_modal);
                $(delete_location_modal).modal('show');
            }
        });
    };

    remove_elements_after_action = function(button) {
        $(button).closest('.loc_section').remove();
    };

debugger;
    var model = new location_tree.LocationTreeViewModel(hierarchy);
    $('#location_tree').koApplyBindings(model);
    model.load(locs);

    gaTrackLink($('#edit-org-levels'), 'Organization Structure', 'Edit Organization Levels');

    gaTrackLink($('#edit-loc-fields'), 'Organization Structure', 'Edit Location Fields');
});
