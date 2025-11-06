# api/urls.py
from django.urls import path
from .views import auth_view

urlpatterns = [
    path('admin-data/', auth_view.AdminDataView.as_view(), name='admin-data'),
    # optionally add a simple 'me' endpoint
    path('me/', auth_view.MeView.as_view(), name='me'),
]
