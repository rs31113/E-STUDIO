from django.contrib import admin
import cart.models


admin.site.register(cart.models.Delivery)
admin.site.register(cart.models.Promocode)


__all__ = ()
