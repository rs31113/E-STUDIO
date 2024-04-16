import django.views


class GalleryView(django.views.generic.TemplateView):
    template_name = "gallery/gallery.html"


__all__ = ()
