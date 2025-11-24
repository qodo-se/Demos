from typing import Optional
from .database import db
from .models import UserCreate, UserInDB
import psycopg2


class UserRepository:
    @staticmethod
    def create_user(user: UserCreate, hashed_password: str) -> UserInDB:
        with db.get_cursor() as cursor:
            cursor.execute("""
                INSERT INTO users (email, username, hashed_password, is_active, created_at)
                VALUES (%s, %s, %s, %s, NOW())
                RETURNING id, email, username, hashed_password, is_active, created_at, updated_at
            """, (user.email, user.username, hashed_password, True))
            
            row = cursor.fetchone()
            return UserInDB(**dict(row))
    
    @staticmethod
    def get_user_by_email(email: str) -> Optional[UserInDB]:
        with db.get_cursor() as cursor:
            cursor.execute("""
                SELECT id, email, username, hashed_password, is_active, created_at, updated_at
                FROM users
                WHERE email = %s
            """, (email,))
            
            row = cursor.fetchone()
            if row:
                return UserInDB(**dict(row))
            return None
    
    @staticmethod
    def get_user_by_username(username: str) -> Optional[UserInDB]:
        with db.get_cursor() as cursor:
            cursor.execute("""
                SELECT id, email, username, hashed_password, is_active, created_at, updated_at
                FROM users
                WHERE username = %s
            """, (username,))
            
            row = cursor.fetchone()
            if row:
                return UserInDB(**dict(row))
            return None
    
    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[UserInDB]:
        with db.get_cursor() as cursor:
            cursor.execute("""
                SELECT id, email, username, hashed_password, is_active, created_at, updated_at
                FROM users
                WHERE id = %s
            """, (user_id,))
            
            row = cursor.fetchone()
            if row:
                return UserInDB(**dict(row))
            return None
    
    @staticmethod
    def update_user_password(user_id: int, hashed_password: str) -> bool:
        with db.get_cursor() as cursor:
            cursor.execute("""
                UPDATE users
                SET hashed_password = %s, updated_at = NOW()
                WHERE id = %s
            """, (hashed_password, user_id))
            
            return cursor.rowcount > 0
    
    @staticmethod
    def deactivate_user(user_id: int) -> bool:
        with db.get_cursor() as cursor:
            cursor.execute("""
                UPDATE users
                SET is_active = FALSE, updated_at = NOW()
                WHERE id = %s
            """, (user_id,))
            
            return cursor.rowcount > 0