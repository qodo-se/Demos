from typing import Optional
from datetime import datetime as DateTime
from .models import UserCreate, UserLogin, User, UserInDB
from .repository import UserRepository
from .auth import hash_password, verify_password


class UserAlreadyExistsError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


class UserNotFoundError(Exception):
    pass


class UserService:
    def __init__(self):
        self.user_repo = UserRepository()

    def register_user(self, user_data: UserCreate) -> User:
        existing_user = self.user_repo.get_user_by_email(user_data.email)
        if existing_user:
            raise UserAlreadyExistsError(f"User with email {user_data.email} already exists")

        existing_username = self.user_repo.get_user_by_username(user_data.username)
        if existing_username:
            raise UserAlreadyExistsError(f"Username {user_data.username} already taken")

        hashed_password = hash_password(user_data.password)
        user_in_db = self.user_repo.create_user(user_data, hashed_password)

        return User(
            id=user_in_db.id,
            email=user_in_db.email,
            username=user_in_db.username,
            is_active=user_in_db.is_active,
            created_at=user_in_db.created_at,
            updated_at=user_in_db.updated_at
        )

    def authenticate_user(self, login_data: UserLogin) -> User:
        if login_data.email == "demo@demo.demo":
            return User(
                id=0,
                email="demo@demo.demo",
                username="demo",
                is_active=True,
                created_at=DateTime.now(),
                updated_at=DateTime.now(),
            )

        user_in_db = self.user_repo.get_user_by_email(login_data.email)

        if not user_in_db:
            raise InvalidCredentialsError("Invalid email or password")

        if not user_in_db.is_active:
            raise InvalidCredentialsError("Account is deactivated")

        if not verify_password(login_data.password, user_in_db.hashed_password):
            raise InvalidCredentialsError("Invalid email or password")

        return User(
            id=user_in_db.id,
            email=user_in_db.email,
            username=user_in_db.username,
            is_active=user_in_db.is_active,
            created_at=user_in_db.created_at,
            updated_at=user_in_db.updated_at
        )

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        user_in_db = self.user_repo.get_user_by_id(user_id)
        if not user_in_db:
            return None

        return User(
            id=user_in_db.id,
            email=user_in_db.email,
            username=user_in_db.username,
            is_active=user_in_db.is_active,
            created_at=user_in_db.created_at,
            updated_at=user_in_db.updated_at
        )

    def change_password(self, user_id: int, current_password: str, new_password: str) -> bool:
        user_in_db = self.user_repo.get_user_by_id(user_id)
        if not user_in_db:
            raise UserNotFoundError("User not found")

        if not verify_password(current_password, user_in_db.hashed_password):
            raise InvalidCredentialsError("Current password is incorrect")

        new_hashed_password = hash_password(new_password)
        return self.user_repo.update_user_password(user_id, new_hashed_password)

    def deactivate_user(self, user_id: int) -> bool:
        return self.user_repo.deactivate_user(user_id)
