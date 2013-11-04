import datetime


def days_visit_overdue(form):
    val = form.xpath('form/case/update/days_visit_overdue')
    if val not in (None, ''):
        return int(val)
    else:
        return val


def date_modified(form, force_to_date=True):
    val = form.xpath('form/case/@date_modified')
    if force_to_date and isinstance(val, datetime.datetime):
        return val.date()
    else:
        return val


def date_next_bp(form):
    return form.xpath('form/case/update/date_next_bp') or None


def date_next_pnc(form):
    return form.xpath('form/case/update/date_next_pnc') or None


def date_next_eb(form):
    return form.xpath('form/case/update/date_next_eb') or None


def date_next_cf(form):
    return form.xpath('form/case/update/date_next_cf') or None
