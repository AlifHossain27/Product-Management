from rest_framework import views, response, exceptions, permissions
from .serializers import UserSerializer
from . import services
from . import authentication

# Signup
class SignupAPI(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_user(user_dc = data)

        return response.Response(data = serializer.data)

# Login
class LoginAPI(views.APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        user = services.user_selector(username=username)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid username or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid username or password")
        
        token = services.create_token(user_id= user.id)
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        
        return resp

# Get User
class UserAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)

        return response.Response(serializer.data)

# Logout
class LogoutAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")
        resp.data = {"message": "So long farewell"}

        return resp