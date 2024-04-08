from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("shop/", include("shop.urls", namespace="shop")),
    path("about/", include("about.urls", namespace="about")),
    path("cart/", include("cart.urls", namespace="cart")),
    path("admin/", admin.site.urls),
]
