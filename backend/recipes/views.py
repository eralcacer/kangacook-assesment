from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Recipe
from .serializers import UserSerializer, RecipeListSerializer, RecipeSerializer
from .services.pagination import RecipePagination

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.pagination import PageNumberPagination

from django.shortcuts import get_object_or_404
from django.http import Http404

import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def user_list(request):
    try:
        if request.method == 'GET':
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return JsonResponse({"Users": serializer.data})
            
    except Exception as e:
        logger.error(f"Error in user_list view: {str(e)}")

        return Response({"error":"Something went wrong. Please try again later."})

@api_view(['POST'])
def signup(request):
    try:
        if request.method == 'POST':
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                if User.objects.filter(email=request.data['email']).exists() or User.objects.filter(username=request.data['username']).exists():
                    return Response({"success": False, "msg": "User is already in use."}, status=status.HTTP_401_UNAUTHORIZED)
                serializer.save()
                user = User.objects.get(email=request.data['email'])
                user.set_password(request.data['password'])
                user.save()
                token = Token.objects.create(user=user)
                response = Response({"success": True, "token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
                response.set_cookie(
                key='auth_token',
                value=token.key,
                httponly=True,
                secure=False,
                samesite='Lax'
                )

                return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error trying to signup: {str(e)}")

        return Response({"error": "Something went wrong trying to signup."}, status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    try:
        if request.method == 'POST':
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')

            if username:
                try:
                    user = get_object_or_404(User, username=username)
                except Http404:
                    user = None

            # If user is not found by username, try to get user by email
            if user is None and email:
                try:
                    user = get_object_or_404(User, email=email)
                except Http404:
                    user = None
        
            if user is None:
                return Response({"success": False, "msg": "Invalid username or email."}, status=status.HTTP_401_UNAUTHORIZED)
            # Check the password
            if not user.check_password(password):
                return Response({"success": False, "msg": "Unable to sign in."}, status=status.HTTP_401_UNAUTHORIZED)
            
            token, created = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(instance=user)
            
            response = Response({
                "success": True,
                "msg": "Login successful.",
                "user": serializer.data
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='auth_token',
                value=token.key,
                httponly=True,
                secure=False,
                samesite='Lax'
            )

            return response
        
        return Response({"success": False, "msg": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error trying to login: {str(e)}")

        return Response({"error": "Something went wrong trying to login."}, status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def authenticate(request):
    try:
        if request.method == 'GET':
            serializer = UserSerializer(request.user)

            return Response({
                "success": True,
                "msg": f"Welcome back {request.user}",
                "user": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({"success": False, "msg": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error trying to authenticate: {str(e)}")

        return Response({
            "error": "Something went wrong trying to authenticate."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def logout(request):
    response = JsonResponse({'success': True, 'message': 'Logged out successfully'})
    response.delete_cookie('auth_token', path='/')
    return response

@api_view(['GET'])
def get_recipes(request):
    try:
        if request.method == 'GET':
            recipes = Recipe.objects.all()
            paginator = RecipePagination()
            paginated_recipes = paginator.paginate_queryset(recipes, request)
            serializer = RecipeListSerializer(paginated_recipes, many=True)

            paginated_response = paginator.get_paginated_response(serializer.data)
            
            paginated_response.data['success'] = True
            paginated_response.data['msg'] = "Here is the list of recipes"
            
            return paginated_response

        return Response({"success": False, "msg": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error trying to get recipes: {str(e)}")

        return Response({
            "errror": "Something went wrong trying to post recipe."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_recipe_by_id(request, recipe_id):
    try:
        if request.method == 'GET':
            recipe = Recipe.objects.get(id=recipe_id)
            serializer = RecipeSerializer(recipe)
            return Response({
                "success": True,
                "recipe": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
                "success": False,
                "msg": "Recipe not found."
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error trying to get recipe by ID: {str(e)}")
        return Response({
            "error": "Something went wrong trying to get the recipe."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
