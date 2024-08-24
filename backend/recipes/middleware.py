# middleware.py

from django.utils.deprecation import MiddlewareMixin

class TokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Extract the token from cookies
        token = request.COOKIES.get('auth_token')
        if token:
            # Add the token to the Authorization header
            request.META['HTTP_AUTHORIZATION'] = f'Token {token}'
