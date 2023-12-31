import dataclasses
import datetime
import jwt
from typing import TYPE_CHECKING
from .models import User
from django.conf import settings

if TYPE_CHECKING:
    from .models import User

@dataclasses.dataclass
class UserDataClass:
    first_name: str
    last_name: str
    username: str
    email: str 
    password: str = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "User") -> "UserDataClass":
        return cls(
            first_name = user.first_name,
            last_name = user.last_name,
            username = user.username,
            email = user.email,
            id = user.id
        )

def create_user(user_dc: "UserDataClass") -> "UserDataClass":
    instance  = User(
        first_name = user_dc.first_name,
        last_name = user_dc.last_name,
        username = user_dc.username,
        email = user_dc.email
    )
    if user_dc.password is not None:
        instance.set_password(user_dc.password)

    instance.save()
    return UserDataClass.from_instance(instance)

def user_selector(username: str) -> "User":
    user = User.objects.filter(username=username).first()
    return user

def create_token(user_id: int) -> str:
    payload = dict(
        id = user_id,
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        iat = datetime.datetime.utcnow()
    )
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
    return token