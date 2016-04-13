from django.core.management.base import LabelCommand

from corehq.apps.userreports.dbaccessors import get_report_configs_for_domain, get_datasources_for_domain


class Command(LabelCommand):
    help = """Create a new domain or update an existing domain to match the settings and data of another domain"""

    def handle(self, *args, **options):
        # feature flags
        # feature previews
        # domain settings
        # apps
        # fixtures?
        # locations?
        # products?
        # UCR's
        #
        pass


def clone_domain_and_settings(old_domain, new_domain):
    from corehq.apps.domain.models import Domain
    domain = Domain.get_by_name(old_domain)
    domain.name = new_domain
    save_copy(domain)

    from corehq.apps.commtrack.models import CommtrackConfig
    commtrack_config = CommtrackConfig.for_domain(domain)
    save_copy(commtrack_config, new_domain)


def set_flags(old_domain, new_domain):
    from corehq.toggles import all_toggles, NAMESPACE_DOMAIN
    from corehq.feature_previews import all_previews
    from corehq.apps.hqwebapp.templatetags.hq_shared_tags import toggle_js_domain_cachebuster

    for toggle in all_toggles():
        if toggle.enabled(old_domain):
            toggle.set(new_domain, True, NAMESPACE_DOMAIN)

    for preview in all_previews():
        if preview.enabled(old_domain):
            preview.set(new_domain, True, NAMESPACE_DOMAIN)
            if preview.save_fn is not None:
                preview.save_fn(new_domain, True)

    toggle_js_domain_cachebuster.clear(new_domain)


def copy_fixtures(old_domain, new_domain):
    from corehq.apps.fixtures.models import FixtureDataItem
    from corehq.apps.fixtures.dbaccessors import get_fixture_data_types_in_domain

    fixture_types = get_fixture_data_types_in_domain(old_domain)
    for fixture_type in fixture_types:
        old_id, new_id = save_copy(fixture_type, new_domain)
        for item in FixtureDataItem.by_data_type(old_domain, old_id):
            item.data_type_id = new_id
            save_copy(item, new_domain)

    # TODO: FixtureOwnership - requires copying users & groups


def copy_locations(old_domain, new_domain):
    from corehq.apps.locations.models import LocationType
    from corehq.apps.locations.models import Location

    location_types = LocationType.objects.filter(domain=old_domain)
    for location_type in location_types:
        location_type.domain = new_domain
        location_type.id = None
        location_type.save()

    def copy_location_hierarchy(location, id_map):
        try:
            location.lineage = [id_map[ancestor] for ancestor in location.lineage]
        except KeyError:
            pass # ancestor not found
        old_id, new_id = save_copy(location, new_domain)
        id_map[old_id] = new_id
        for child in location.children:
            copy_location_hierarchy(child, id_map)

    locations = Location.root_locations(old_domain)
    for location in locations:
        copy_location_hierarchy(location, {})


def copy_applications(old_domain, new_domain, report_map):
    from corehq.apps.app_manager.dbaccessors import get_apps_in_domain
    from corehq.apps.app_manager.models import ReportModule
    app_map = {}
    apps = get_apps_in_domain(old_domain)
    for app in apps:
        for module in app.modules:
            if module.module_type == ReportModule.module_type:
                for config in module.report_configs:
                    config.report_id = report_map[config.report_id]

        old_id, new_id = save_copy(app, new_domain)
        app_map[old_id] = new_id
    return app_map


def copy_ucr_data(old_domain, new_domain):
    datasource_map = copy_ucr_datasources(new_domain, old_domain)
    report_map = copy_ucr_reports(datasource_map, new_domain)
    return report_map


def copy_ucr_reports(datasource_map, new_domain):
    report_map = {}
    reports = get_report_configs_for_domain('icds-sql')
    for report in reports:
        old_datasource_id = report.config_id
        try:
            report.config_id = datasource_map[old_datasource_id]
        except KeyError:
            pass  # datasource not found

        old_id, new_id = save_copy(report, new_domain)
        report_map[old_id] = new_id
    return report_map


def copy_ucr_datasources(new_domain, old_domain):
    datasource_map = {}
    datasources = get_datasources_for_domain(old_domain)
    for datasource in datasources:
        datasource.meta.build.finished = False
        datasource.meta.build.initiated = None

        old_id, new_id = save_copy(datasource, new_domain)
        datasource_map[old_id] = new_id
    return datasource_map


def save_copy(doc, new_domain=None):
    old_id = doc['_id']
    del doc['_id']
    del doc['_rev']
    if new_domain:
        doc.domain = new_domain
    doc.save()
    return old_id, doc['_id']
