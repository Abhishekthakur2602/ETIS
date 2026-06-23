import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
else:
    conn = None
    print("DATABASE_URL not configured")