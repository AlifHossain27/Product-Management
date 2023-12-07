from django.urls import path
from .views import SignupAPI, LoginAPI, UserAPI, LogoutAPI

urlpatterns = [
    path("signup/", SignupAPI.as_view(), name= "signup"),
    path("login/", LoginAPI.as_view(), name= "login"),
    path("me/", UserAPI.as_view(), name= "me"),
    path("logout/", LogoutAPI.as_view(), name= "logout")
]