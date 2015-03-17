from commcarehq.apps.cachehq.invalidate import invalidate_document
from commcarehq.apps.domain.signals import commcare_domain_post_save
from commcarehq.apps.users.signals import couch_user_post_save


def invalidate_cached_domain(sender, domain, **kwargs):
    invalidate_document(domain)


def invalidate_cached_user(sender, couch_user, **kwargs):
    invalidate_document(couch_user)


commcare_domain_post_save.connect(invalidate_cached_domain)
couch_user_post_save.connect(invalidate_cached_user)
