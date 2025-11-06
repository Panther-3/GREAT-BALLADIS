# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class AdminDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Example protected data for admin dashboard
        # You can add more logic (e.g. check user.is_staff) if you want only staff
        user = request.user
        if not user.is_staff:
            return Response({'detail': 'Forbidden: staff only'}, status=status.HTTP_403_FORBIDDEN)

        data = {
            "message": "Welcome to the admin dashboard API",
            "stats": {
                "users": 120,
                "orders": 37,
            }
        }
        return Response(data)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
        })
