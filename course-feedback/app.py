from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os 
import json
import time

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL", "postgres://studentuser:studentpass@course-db:6432/coursesdb")

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
    return "Hello from coursefeedback service (with Postgres DB)! This is a line of text to let you know that the API service is running smoothly with full CRUD capability"

# GET all feedback
@app.route("/coursefeedback", methods=["GET"])
def get_feedbacks():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, CourseID, Feedback FROM courses ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    feedback = [{"id": r[0], "name": r[1], "email": r[2], "attendance": r[3] or []} for r in rows]
    return jsonify(feedback), 200

# GET feedback by CourseID
@app.route("/coursefeedback/<CourseID>", methods=["GET"])
def get_feedback(CourseID):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, CourseID, Feedback FROM courses WHERE CourseID=%s", (CourseID,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        return jsonify({"error": "Course not found"}), 404
    feedback = {"id": row[0], "name": row[1], "CourseID": row[2], "Feedback": row[3] or []}
    return jsonify(feedback), 200

# POST new feedback
@app.route("/coursefeedback", methods=["POST"])
def add_feedback():
    data = request.get_json() or {}
    if "name" not in data or "CourseID" not in data:
        return jsonify({"error": "name and CourseID are required"}), 400
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO courses (name, CourseID, Feedback) VALUES (%s, %s, %s) RETURNING id",
        (data["name"], data["CourseID"], json.dumps([]))
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"id": new_id, "name": data["name"], "CourseID": data["CourseID"], "feedback": []}), 201

# PUT update feedback
@app.route("/coursefeedback/<int:feedback_id>", methods=["PUT"])
def update_feedback(feedback_id):
    data = request.get_json() or {}
    fields = []
    values = []
    if "name" in data:
        fields.append("name=%s")
        values.append(data["name"])
    if "email" in data:
        fields.append("email=%s")
        values.append(data["email"])
    if not fields:
        return jsonify({"error": "No updatable fields provided"}), 400
    values.append(feedback_id)
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"UPDATE courses SET {', '.join(fields)} WHERE id=%s RETURNING id, name, CourseID, Feedback", tuple(values))
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not row:
        return jsonify({"error": "Feedback not found"}), 404
    return jsonify({"id": row[0], "name": row[1], "CourseID": row[2], "Feedback": row[3] or []}), 200

# DELETE feedback
@app.route("/coursefeedback/<int:feedback_id>", methods=["DELETE"])
def delete_feedback(feedback_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM courses WHERE id=%s RETURNING id", (feedback_id,))
    deleted = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not deleted:
        return jsonify({"error": "Feedback not found"}), 404
    return jsonify({"message": "Deleted"}), 200

# POST attendance record
@app.route("/coursefeedback/<int:feedback_id>/attendance", methods=["POST"])
def record_attendance(feedback_id):
    data = request.get_json() or {}
    if "date" not in data or "status" not in data:
        return jsonify({"error": "date and status are required"}), 400
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT feedback FROM courses WHERE id=%s", (feedback_id,))
    row = cur.fetchone()
    if not row:
        cur.close()
        conn.close()
        return jsonify({"error": "Course not found"}), 404

    attendance = row[0] or []
    attendance.append({"date": data["date"], "status": data["status"]})

    cur.execute("UPDATE courses SET attendance=%s WHERE id=%s", (json.dumps(attendance), feedback_id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"id": feedback_id, "attendance": attendance}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6001, debug=True)