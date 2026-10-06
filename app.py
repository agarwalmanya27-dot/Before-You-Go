from flask import Flask, render_template, request, redirect, url_for
#import mysql.connector

app = Flask(__name__)

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

@app.route("/login", methods=["POST"])
def login_user():
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")

    print("Name:", name)
    print("Email:", email)
    print("Password:", password)

    if email == "komal@gmail.com" and password == "1234":
         return redirect(url_for("dashboard"))
    else:
        return "Invalid email or password"

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)