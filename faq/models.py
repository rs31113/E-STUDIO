from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class Answer(models.Model):
    question = models.CharField(max_length=100)
    answer = CKEditor5Field(config_name="default")

    def __str__(self):
        return self.name


__all__ = ()
