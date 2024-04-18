from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("main.urls", namespace="main")),
    path("shop/", include("shop.urls", namespace="shop")),
    path("gallery/", include("gallery.urls", namespace="gallery")),
    path("about/", include("about.urls", namespace="about")),
    path("cart/", include("cart.urls", namespace="cart")),
    path("faq/", include("faq.urls", namespace="faq")),
    path("terms/", include("terms.urls", namespace="terms")),
    path("admin/", admin.site.urls),
    path("ckeditor5/", include("django_ckeditor_5.urls")),
]
