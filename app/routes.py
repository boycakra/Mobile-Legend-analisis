import flask
from flask import render_template, url_for, request, redirect, flash
from hashlib import sha256
from app import app, db
from app.models import User

@app.route("/")
def index():
    return render_template("index.html")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() == "mp4"


#@app.route("/form")
#def form():
#    videos = Video.query.all()
#
#    return render_template("uploads.html", videos=videos)

@app.route("/register", methods=["GET"])
def register_view(): 
    if request.method == "GET":
        return render_template("register.html")
    return render_template("error.html")

@app.route("/register/api", methods=["POST"])
def register():
    # Get form data
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')

    # Validate form data
    if not username or not email or not password or not confirm_password:
        flash("Please fill in all fields", "error")
        return render_template("register.html")
    
    if password != confirm_password:
        flash("Passwords do not match", "error")
        return render_template("register.html")
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        flash("Email already registered", "error")
        return render_template("register.html")
   
    # Create a new user and add to the database
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Success response
    flash("Registration successful! You can now log in.", "success")
    return redirect("/login")



#def query():
#    videos = Video.query.all()
#    return render_template("query.html", videos=videos)

# @app.route('/static/assets/video/video.mp4')
# def video():
#    return send_file('static/assets/video/video.mp4', mimetype='video/mp4')
