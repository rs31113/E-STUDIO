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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        product = context[self.context_object_name]

        available_sizes = dict()
        for product_size in shop.models.ProductSize.objects.filter(product=product):
            available_sizes[product_size.size.name] = {
                "quantity": product_size.quantity,
                "disabled": product_size.quantity == 0,
            }
        context["available_sizes"] = available_sizes

        return context


__all__ = ()
