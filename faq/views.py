from django.shortcuts import get_object_or_404
import django.views
import faq.models


class FaqView(django.views.generic.ListView):
    model = faq.models.Answer
    template_name = "faq/faq.html"
    context_object_name = "answers"


__all__ = ()
