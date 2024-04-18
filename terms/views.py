import django.views


class TermsView(django.views.generic.TemplateView):
    template_name = "terms/terms.html"


__all__ = ()
