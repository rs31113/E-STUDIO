import django.views
import gallery.models


class GalleryView(django.views.generic.ListView):
    template_name = "gallery/gallery.html"
    model = gallery.models.Collection
    context_object_name = "gallery"


__all__ = ()
