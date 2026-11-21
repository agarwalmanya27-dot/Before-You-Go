
from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# MySQL Connection
#db = mysql.connector.connect(
#    host="localhost",
#    user="root",
#    password="1234",
#    database="byg"
#)

#print("MYSQL connected successfully!")


@app.route("/")
def home():
    return render_template("login.html")


# SIGNUP PAGE
@app.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        if password != confirm_password:
            return "Passwords do not match! <a href='/signup'>Try again</a>"

        cursor = db.cursor()

        cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            return "Email already registered! <a href='/signup'>Try again</a>"

        hashed_password = generate_password_hash(password)

        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, hashed_password)
        )

        db.commit()
        cursor.close()

        return redirect(url_for("home"))

    return render_template("signup.html")


# LOGIN PAGE
@app.route("/login", methods=["POST"])
def login_user():

    email = request.form.get("email")
    password = request.form.get("password")

    cursor = db.cursor()

    cursor.execute(
        "SELECT name, email, password FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[2], password):
        return redirect(url_for("dashboard"))

    return "Invalid email or password! <a href='/'>Try again</a>"


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route('/destination/<destination_name>')
def destination(destination_name):
    return render_template(
        'destination.html',
        destination_name=destination_name
    )


if __name__ == "__main__":
    app.run(debug=True)
