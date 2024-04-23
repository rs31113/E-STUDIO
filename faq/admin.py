from django.contrib import admin
import faq.models
import django.db.models
from django_ckeditor_5.widgets import CKEditor5Widget


class FaqAdmin(admin.ModelAdmin):
    formfield_overrides = {
        django.db.models.TextField: {"widget": CKEditor5Widget},
    }


admin.site.register(faq.models.Answer)


__all__ = ()
