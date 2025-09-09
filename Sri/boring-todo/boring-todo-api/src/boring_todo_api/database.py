import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import os


class DatabaseConnection:
    def __init__(self, host="localhost", port="5432", database="boring_todo", user="postgres", password=""):
        self.host = os.getenv("DB_HOST", host)
        self.port = os.getenv("DB_PORT", port)
        self.database = os.getenv("DB_NAME", database)
        self.user = os.getenv("DB_USER", user)
        self.password = os.getenv("DB_PASSWORD", password)
    
    def get_connection(self):
        return psycopg2.connect(
            host=self.host,
            port=self.port,
            database=self.database,
            user=self.user,
            password=self.password,
            cursor_factory=RealDictCursor
        )
    
    @contextmanager
    def get_cursor(self):
        conn = self.get_connection()
        try:
            cursor = conn.cursor()
            yield cursor
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            cursor.close()
            conn.close()


db = DatabaseConnection()