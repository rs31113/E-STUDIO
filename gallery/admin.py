from django.contrib import admin
import gallery.models

admin.site.register(gallery.models.Collection)
admin.site.register(gallery.models.Photo)


__all__ = ()
