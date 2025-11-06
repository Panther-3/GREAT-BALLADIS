from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import logging

# Set up logging
logger = logging.getLogger(__name__)

class AdminDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Check if the user is staff
            user = request.user
            if not user.is_staff:
                logger.warning(f"Unauthorized access attempt by non-staff user: {user.username}")
                return Response({'detail': 'Forbidden: staff only'}, status=status.HTTP_403_FORBIDDEN)

            # Example protected data for the admin dashboard
            data = {
                "message": "Welcome to the admin dashboard API",
                "stats": {
                    "users": 120,
                    "orders": 37,
                }
            }
            return Response(data)

        except Exception as e:
            logger.error(f"Error fetching admin data: {str(e)}")
            return Response({'detail': 'An error occurred while fetching data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Fetch user data
            user = request.user
            user_data = {
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
            }
            return Response(user_data)

        except Exception as e:
            logger.error(f"Error fetching user data: {str(e)}")
            return Response({'detail': 'An error occurred while fetching user data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Retrieve the refresh token from the request data
            refresh_token = request.data.get('refresh', None)
            
            if refresh_token:
                # Create the RefreshToken instance and blacklist it
                token = RefreshToken(refresh_token)
                token.blacklist()  # This blacklists the refresh token, invalidating it
                logger.info(f"Refresh token blacklisted for user: {request.user.username}")

            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            logger.error(f"Error during logout: {str(e)}")
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
