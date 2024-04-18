from django.urls import path
import faq.views


app_name = "faq"

urlpatterns = [
    path("", faq.views.FaqView.as_view(), name="faq"),
]


__all__ = ()
