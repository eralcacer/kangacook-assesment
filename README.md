# Recipe App
A full-stack application featuring a React frontend and a Django backend. The app allows users to authenticate, view a list of recipes, and see detailed descriptions of each recipe.

## Features
- Frontend:

1. User authentication and session management
2. Recipe listing with interactive cards
3. Popup to view detailed recipe descriptions
4. Error handling with notifications

- Backend:

1. User authentication with token-based sessions
2. API endpoints for login and user authentication

- Tech Stack
  - Frontend: React, react-hot-toast, js-cookie, react-router-dom
  - Backend: Django, Django Rest Framework (DRF)

# Setup Instructions
- Backend (Django)
  1. Clone the Repository:
  ```
  git clone https://github.com/eralcacer/kangacook-assesment.git
  cd $PATH/.../kangacook-assesment/backend
  ```
  2. Create and Activate Virtual Environment:
  ```
  python -m venv venv
  source venv/bin/activate  # On Windows use: venv\Scripts\activate
  ```
  3. Install Dependencies:
  ```
  pip install -r requirements.txt
  ```
  4. apply Migrations:
  ```
  python manage.py migrate
  ```
  5. Create Superuser (Optional for Admin Access):
  ```
  python manage.py createsuperuser
  ```
  6. Run Development Server:
  ```
  python manage.py runserver
  ```
  7. Custom Middleware:
     - Implement custom middleware to handle token extraction from cookies and validation.
     - Example middleware.py:
     ```
     from django.utils.deprecation import MiddlewareMixin
     from rest_framework.authentication import TokenAuthentication
      
     class TokenMiddleware(MiddlewareMixin):
          def process_request(self, request):
              auth = request.META.get('HTTP_AUTHORIZATION', None)
              if auth and auth.startswith('Token '):
                  token = auth[len('Token '):]
                  request.auth = TokenAuthentication().authenticate_credentials(token)
     ```
  8. Add Middleware to `settings.py` file:
     ```
      MIDDLEWARE = [
          # other middleware
          'yourapp.middleware.TokenMiddleware',
      ]
     ```

  - Frontend (React)
    1. Clone the Repository:
    ```
    git clone https://github.com/eralcacer/kangacook-assesment.git
    cd $PATH/.../kangacook-assesment/frontend
    ```
    2. Install Dependencies:
    ```
    npm install
    ```
    3. Run the Development Server:
    ```
    npm start
    ```
    4. Dependencies:
      - react-hot-toast for notifications
      - js-cookie for cookie management
      - react-router-dom for routing
      - Tailwind
    5. Usage:
      - Start the React development server to interact with the Django backend.
      - Access the app at http://localhost:3000.

    ## Token set up with Cookies
    1. Login  API:
      - Set Cookie: Upon successful login, the API generates an authentication token and sets it in a secure, HttpOnly cookie. This cookie is used for authenticating future requests.
      - Attributes: The cookie is set with the Secure, HttpOnly, and SameSite attributes to ensure security.
    2. Sign Up API:
      - Set Cookie: After a successful sign-up, the API generates and sets the authentication token in a secure, HttpOnly cookie, similar to the login process. This enables immediate access to authenticated routes without requiring a separate login step.
      - Attributes: The cookie is set with Secure, HttpOnly, and SameSite attributes for security.
    3. Logout API:
      - Delete Cookie: When a user logs out, the API deletes the authentication cookie by setting it with an expired date. This effectively logs the user out by clearing the token from the client.
      - Attributes: The deletion ensures that the cookie is no longer sent in future requests, preventing unauthorized access.

    This cookie-handling mechanism ensures that authentication is securely managed across login, sign-up, and logout flows.

    ## Conclusion of Project Outcomes
    
    This project successfully integrates both frontend and backend systems to create a full-stack web application that allows users to sign up, log in, view recipes, and log out securely. The backend, built with Django, provides RESTful APIs for user authentication and recipe management, handling sensitive data such as authentication tokens securely with cookies. The frontend, developed with React, manages user state and renders dynamic content, ensuring that authenticated users have access to protected resources.

    - Key achievements include:

      1. Authentication and State Management: User authentication is managed through secure tokens, stored in cookies, ensuring the protection of sensitive data and proper session handling.
      2. Responsive UI: The frontend is designed to be responsive, with recipes displayed in grid layouts that adapt to different screen sizes, ensuring a user-friendly experience across devices.
      3. Popup Integration: Recipe details are displayed in popups for better user interaction, with an intuitive close button for easy navigation.
      4. Pagination and Load More Functionality: The recipe list supports pagination, allowing users to load more recipes with a "Load More" button, improving data handling and user experience.
      5. Error Handling: The system provides feedback through error messages when operations such as API calls fail, enhancing reliability and user trust.

    In conclusion, the project delivers a robust and secure full-stack solution that meets the requirements of user authentication and content management, with a strong focus on security, responsiveness, and user experience. Further improvements, such as deploying the application on the cloud with Docker and setting up load balancing, could elevate the project to production-ready status.
