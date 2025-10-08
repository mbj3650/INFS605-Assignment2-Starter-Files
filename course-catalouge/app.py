from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os 
import json
import time

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL", "postgres://studentuser:studentpass@student-db:5432/studentsdb")

max_retries = 20
for i in range(max_retries):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        print("Connected to DB!")
        break
    except psycopg2.OperationalError as e:
        print(f"DB connection failed ({i+1}/{max_retries}), retrying in 2s...")
        time.sleep(2)
else:
    raise Exception("Could not connect to the database after 20 retries")

def get_connection():
    return psycopg2.connect(DATABASE_URL)

@app.route("/")
def home():
    return "Hello from Course-Catalouge service (with Postgres DB)! This is a line of text to let you know that the API service is running smoothly with full CRUD capability"

# GET all students
@app.route("/catalouge", methods=["GET"])
def get_students():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, CourseID, Points, Level, Description, Resources, Semester FROM coursecatalouge ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    courses = [{"id": r[0], "name": r[1], "CourseID": r[2], "Points": r[3], "Level": r[4], "Description": r[5], "Resources": r[6], "Semester": r[7],} for r in rows]
    return jsonify(courses), 200

# GET student by ID
@app.route("/catalouge/<int:course_id>", methods=["GET"])
def get_student(student_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, CourseID, Points, Level, Description, Resources, Semester FROM coursecatalouge WHERE id=%s", (student_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        return jsonify({"error": "Student not found"}), 404
    course = [{"id": r[0], "name": r[1], "CourseID": r[2], "Points": r[3], "Level": r[4], "Description": r[5], "Resources": r[6], "Semester": r[7],} for r in rows]
    return jsonify(course), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5401, debug=True)