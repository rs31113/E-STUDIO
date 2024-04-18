from django.shortcuts import get_object_or_404
import django.views
import shop.models


class CatalogView(django.views.generic.ListView):
    model = shop.models.Product
    template_name = "shop/catalog.html"
    context_object_name = "catalog"


class ProductDetailView(django.views.generic.DetailView):
    model = shop.models.Product
    template_name = "shop/product_detail.html"
    context_object_name = "product"

    def get_object(self, queryset=None):
        article = self.kwargs["article"]
        return get_object_or_404(shop.models.Product, article=article)


__all__ = ()
