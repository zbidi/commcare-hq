import logging
from django.core.management import BaseCommand
from corehq.apps.app_manager.dbaccessors import get_case_types_from_apps
from corehq.apps.es.domains import DomainES
from corehq.apps.data_dictionary.util import generate_data_dictionary
from corehq.apps.data_dictionary.models import CaseType
from corehq.apps.export.utils import assert_couch_and_dd_inferred_schema_equal


logger = logging.getLogger('data_dicitonary_gen')
logger.setLevel('DEBUG')


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--domain',
            action='store',
            dest='domain',
            default=None,
            help='Domain to generate',
        )
        parser.add_argument(
            '--force-full-generate',
            action='store_true',
            dest='force_full_generate',
            default=False,
            help='Delete data dictionary before generating',
        )
        parser.add_argument(
            '--num-domains',
            action='store',
            dest='num_domains',
            default=1,
            help='Delete data dictionary before generating',
        )
        parser.add_argument(
            '--skip-test',
            action='store_false',
            dest='test',
            default=True,
            help='Delete data dictionary before generating',
        )

    def handle(self, *args, **options):
        if options['domain']:
            domains = [options['domain']]
        else:
            domains = [
                hit['name']
                for hit in (
                    DomainES()
                    .source(['name'])
                    .randomize_results()
                    .size(options['num_domains'])
                    .run().hits
                )
            ]

        self.test = options['test']

        self.generate_and_test(domains, options['force_full_generate'])

    def generate_and_test(self, domains, force_full_generate):
        for domain in domains:
            if force_full_generate:
                logger.info("deleting case types in %s", domain)
                CaseType.objects.filter(domain=domain).delete()
            else:
                db_case_types = CaseType.objects.filter(domain=domain).all()
                already_generated = all(map(lambda c: c.fully_generated, db_case_types))

            case_types = filter(None, get_case_types_from_apps(domain))

            if force_full_generate or not already_generated or len(case_types) > len(db_case_types):
                logger.info("generating data dictionary for %s", domain)
                generate_data_dictionary(domain)
                db_case_types = CaseType.objects.filter(domain=domain).all()

            if self.test:
                if len(case_types) != len(db_case_types):
                    logger.error("Couch and dd have different numbers of case types for %s", domain)
                self.compare_couch_and_dd(domain, db_case_types)

    def compare_couch_and_dd(self, domain, case_types):
        for case_type in case_types:
            try:
                if assert_couch_and_dd_inferred_schema_equal(domain, case_type.name):
                    logger.info("%s in domain %s dd contains inferred schema", case_type.name, domain)
                else:
                    logger.info("%s in domain %s did not have an inferred schema", case_type.name, domain)
            except AssertionError:
                logger.error("%s in domain %s not the same schema", case_type.name, domain)
