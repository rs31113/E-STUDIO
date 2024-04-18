import django.views


class FaqView(django.views.generic.TemplateView):
    template_name = "faq/faq.html"


__all__ = ()
