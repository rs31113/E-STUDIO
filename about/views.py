import django.views


class AboutView(django.views.generic.TemplateView):
    template_name = "about/about.html"


__all__ = ()
