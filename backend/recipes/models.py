# from django.db import models

# class User(models.Model):
#     name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     email = models.CharField(max_length=100, unique=True)
#     password = models.CharField(max_length=24)
#     salt = models.CharField(max_length=64, default='')

#     def __str__(self) -> str:
#         return self.name + " " + self.last_name + " " + self.email
