from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    article = models.CharField(max_length=50, unique=True)
    sizes = models.ManyToManyField("Size", through="ProductSize")
    photos = models.ManyToManyField("Photo")

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)


class Photo(models.Model):
    image = models.ImageField(upload_to="static/photos")

    def __str__(self):
        return self.image.name
