from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=100)
    photos = models.ManyToManyField("Photo")

    def __str__(self):
        return self.name


class Photo(models.Model):
    image = models.ImageField(upload_to="static/photos")

    def __str__(self):
        return self.image.name


__all__ = ()
