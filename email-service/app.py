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
    return "Hello from email-service (with Postgres DB)! This is a line of text to let you know that the API service is running smoothly with full CRUD capability"

# GET all students
@app.route("/allemail", methods=["GET"])
def allemail():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, recipient, recipientemail, Course, emailcontent FROM emails ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    students = [{"id": r[0], "recipient": r[1], "recipientemail": r[2], "Course": r[3], "email content": r[4]} for r in rows]
    return jsonify(students), 200

# GET specific students
@app.route("/allemail/<studentname>", methods=["GET"])
def mailspecific(studentname):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, recipient, recipientemail, Course, emailcontent FROM emails WHERE recipient='%s' ORDER BY id ASC" % (studentname))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    students = [{"id": r[0], "recipient": r[1], "recipientemail": r[2], "Course": r[3], "email content": r[4]} for r in rows]
    return jsonify(students), 200



# GET students by email and OUTPUT a log 
@app.route("/sendemail", methods=["POST"])
def send_email():
    data = request.get_json() or {}
    if "name" not in data or "Feedback" not in data or "CourseID" not in data:
        print("Bad", flush=True)
        return jsonify({"error": "name, CourseID and Feedback are required"}), 400
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT email FROM students WHERE name ='%s'" % (data["name"],))
    row = cur.fetchone()
    if not row:
        email = 'N/A'
    if row:
        email = row[0]
    print("To: %s\nThank you %s for your feedback on Course: %s!\nFeedback Message:\n%s" % (email, data["name"], data["CourseID"], data["Feedback"]),flush=True)
    cur.execute(
            "INSERT INTO emails (recipient, recipientemail, emailcontent, course) VALUES (%s, %s, %s, %s) RETURNING id",
            (data["name"], email, data["Feedback"], data["CourseID"])
    )

    cur.close()
    conn.close()
    return jsonify({"Status": "Success"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7474, debug=True)