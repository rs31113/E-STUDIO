from django.views.generic.base import View
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from cart.models import CartItem, Delivery, Promocode
from shop.models import Product
import cart.forms
from django.utils import timezone


class AddToCart(View):
    def post(self, request, article):
        size = request.POST.get("size")

        if not request.session.session_key:
            request.session.create()

        session_id = request.session.session_key

        product = get_object_or_404(Product, article=article)
        cart_item, created = CartItem.objects.get_or_create(
            product=product,
            size=size,
            session_id=session_id,
        )

        if not created:
            cart_item.quantity += 1
            cart_item.save()
        request.session.modified = True
        return redirect("shop:product_detail", article=article)


class ViewCart(View):
    def get(self, request):
        session_id = request.session.session_key
        cart_items = CartItem.objects.filter(session_id=session_id)
        if cart_items.count() == 0:
            return render(request, "cart/empty_cart.html")
        deliveries = Delivery.objects.all()
        contact_info_form = cart.forms.ContactInfoForm()
        delivery_info_form = cart.forms.DeliveryInfoForm()
        promocode_form = cart.forms.PromocodeForm()
        total_price = sum(item.product.price * item.quantity for item in cart_items)

        context = {
            "cart_items": cart_items,
            "deliveries": deliveries,
            "contact_info": contact_info_form,
            "delivery_info": delivery_info_form,
            "promocode_form": promocode_form,
            "total_price": total_price,
        }
        return render(request, "cart/cart.html", context)

    def post(self, request):
        action = request.POST["action"]
        if action == "apply_promocode":
            promocode_form = cart.forms.PromocodeForm(request.POST)
            if promocode_form.is_valid():
                promocode = promocode_form.cleaned_data["code"]
                session_id = request.session.session_key
                cart_items = CartItem.objects.filter(session_id=session_id)
                deliveries = Delivery.objects.all()
                contact_info_form = cart.forms.ContactInfoForm()
                delivery_info_form = cart.forms.DeliveryInfoForm()
                total_price = sum(item.product.price * item.quantity for item in cart_items)
                context = {
                    "cart_items": cart_items,
                    "deliveries": deliveries,
                    "contact_info": contact_info_form,
                    "delivery_info": delivery_info_form,
                    "promocode_form": promocode_form,
                    "total_price": total_price,
                }
                try:
                    promocode_obj = Promocode.objects.get(name=promocode)
                    if promocode_obj.expiration_date > timezone.now().date():
                        discount = promocode_obj.value / 100
                        promocode_obj.limit -= 1
                        promocode_obj.save()
                        if promocode_obj.limit == 0:
                            promocode_obj.delete()
                        total_price = sum(item.product.price * item.quantity for item in cart_items)
                        total_price = total_price - int(total_price * discount)
                        promocode_response = f"Вы успешно применили промокод на {int(discount * 100)}%!"
                        context["total_price"] = total_price
                        context["promocode_response"] = promocode_response
                        return render(request, "cart/cart.html", context)
                    else:
                        promocode_obj.delete()
                        promocode_response = "Промокод не найден"
                        context["promocode_response"] = promocode_response
                        return render(request, "cart/cart.html", context)
                except Promocode.DoesNotExist:
                    promocode_response = "Промокод не найден"
                    context["promocode_response"] = promocode_response
                    return render(request, "cart/cart.html", context)

        elif action == "new_order":
            contact_info_form = cart.forms.ContactInfoForm(request.POST)
            delivery_info_form = cart.forms.DeliveryInfoForm(request.POST)
            if contact_info_form.is_valid() and delivery_info_form.is_valid():
                delivery_id = request.POST.get("delivery")
                return render(request, "cart/order_success.html")

            session_id = request.session.session_key
            cart_items = CartItem.objects.filter(session_id=session_id)
            deliveries = Delivery.objects.all()
            promocode_form = cart.forms.PromocodeForm()
            total_price = sum(item.product.price * item.quantity for item in cart_items)

            context = {
                "cart_items": cart_items,
                "deliveries": deliveries,
                "contact_info": contact_info_form,
                "delivery_info": delivery_info_form,
                "promocode_form": promocode_form,
                "total_price": total_price,
            }
            return render(request, "cart/cart.html", context)


class UpdateCart(View):
    def post(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id)
            action = request.POST.get("action")
            if cart_item.quantity == 1 and action == "decrement":
                cart_item.delete()
                return render(request, "cart/empty_cart.html")
            else:
                if action == "increment":
                    cart_item.quantity += 1
                else:
                    cart_item.quantity -= 1
                cart_item.save()
            return redirect("cart:cart")
        except CartItem.DoesNotExist:
            return redirect("cart:cart")


class DeleteItem(View):
    def post(self, request, cart_item_id):
        cart_item = get_object_or_404(CartItem, id=cart_item_id)
        cart_item.delete()
        return redirect("cart:cart")


__all__ = ()
