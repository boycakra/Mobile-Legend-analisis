from flask import (
    jsonify,
    make_response,
    render_template,
    url_for,
    request,
    redirect,
    flash,
)
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    set_access_cookies,
    set_refresh_cookies,
)
from app import app, db, jwt
from app.models import User


@jwt.unauthorized_loader
def unauthorized_loader(callback):
    flash("please login to access this page")
    return redirect(url_for("login_view"))


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    flash("Your session has expired. Please login again.")
    return redirect(url_for("login_view"))


@app.route("/")
@jwt_required()
def index():
    return render_template("index.html")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() == "mp4"


@app.route("/register", methods=["GET"])
def register_view():
    return render_template("register.html")


@app.route("/register/api", methods=["POST"])
def register():
   # Get form data
   username = request.form.get("username")
   email = request.form.get("email")
   password = request.form.get("password")
   confirm_password = request.form.get("confirm_password")


   print(f"Username: {username}, Email: {email}, Password: {password}, Confirm Password: {confirm_password}")  # Debug

   # Validate form data
   if not username or not email or not password or not confirm_password:
       return redirect(url_for('register_view'))
   if password != confirm_password:
       return redirect(url_for('register_view'))

   # Check if user already exists
   existing_user = User.query.filter_by(email=email).first()
   if existing_user:
       return redirect(url_for('register_view'))
   # Create a new user and add to the database
   new_user = User(username=username, email=email, password=password)
   db.session.add(new_user)
   db.session.commit()

   # Success response

   resp = make_response(redirect(url_for('login_view')))
   return resp


@app.route("/login", methods=["GET"])
def login_view():
    return render_template("login.html")


@app.route("/login/api", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        resp = jsonify(success=True, redirect=url_for("index"))
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)

        return resp

    return jsonify(success=False, message="Invalid email or password"), 400

