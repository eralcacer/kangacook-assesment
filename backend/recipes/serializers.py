from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recipe

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class RecipeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'image']

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'image']
