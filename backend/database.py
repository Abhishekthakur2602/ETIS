import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="etis",
    user="abhisheksingh",
    password="YOUR_PASSWORD",
    port="5432"
)

conn.autocommit = True