from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    image = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self) -> str:
        return self.title
