from django.urls import path
from .views.auth_view import (
    AdminDataView,
    MeView,
    LogoutView,
)

urlpatterns = [
    # Route to access admin data, protected by JWT authentication
    path('admin-data/', AdminDataView.as_view(), name='admin-data'),
    
    # Route to access the authenticated user's data (e.g., username, email, is_staff)
    path('me/', MeView.as_view(), name='me'),
    
    # Logout endpoint that blacklists the refresh token upon logout
    path('logout/', LogoutView.as_view(), name='logout'),  # Add logout endpoint
]
