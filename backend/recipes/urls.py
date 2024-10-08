"""
URL configuration for recipes project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from recipes import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.user_list),
    path('sign-up/', views.signup),
    path('login/', views.login),
    path('logout/', views.logout),
    path('authenticate/', views.authenticate),
    path('recipes/', views.get_recipes),
    path('recipe/<int:recipe_id>/', views.get_recipe_by_id)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
