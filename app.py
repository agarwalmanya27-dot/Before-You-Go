from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
import os
from dotenv import load_dotenv
app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database="byg"
)
print("MYSQL connected successfully!")

@app.route("/")
def home():
    return render_template("index.html")

# Login / Create account
@app.route("/login", methods=["POST"])
def login_user():
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    cursor = db.cursor()

    # Check if name + email already exist
    cursor.execute(
        "SELECT password FROM users WHERE name = %s AND email = %s",
        (name, email)
    )
    user = cursor.fetchone()
    
    # Existing user
    if user:
        stored_password = user[0]

        # Check password
        if password == stored_password:
            return redirect(url_for("first"))
        else:
            return "Incorrect password."
    # New user
    else:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password)
        )

        db.commit()

        return redirect(url_for("first"))
        
@app.route("/first")
def first():
    return render_template("first.html")

if __name__ == "__main__":
    app.run(debug=True)
