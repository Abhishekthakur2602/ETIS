import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(
    DATABASE_URL,
    sslmode="require"
)

conn.autocommit = True

with conn.cursor() as cursor:
    cursor.execute("SET search_path TO public")

print("Neon Connected Successfully")