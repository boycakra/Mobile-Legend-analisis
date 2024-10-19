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
def missing_token_callback():
    return jsonify({"error": "missing token lmao"}), 401


@app.route("/")
@jwt_required()
def index():
    return render_template("index.html")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() == "mp4"


@app.route("/register", methods=["GET"])
def register_view():
    if request.method == "GET":
        return render_template("register.html")
    return render_template("error.html")


@app.route("/register/api", methods=["POST"])
def register():
    if request.method != "POST":
        return "Method in valid"
    # Get form data
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    confirm_password = request.form.get("confirm_password")

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
        resp = make_response(redirect(url_for("index")))
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        flash(f"Welcome {user.username}")
        return resp

    resp = make_response(redirect(url_for("login")))

    resp.status_code = 400

    flash("Please Check your email or password")
    return resp


# @app.route("/form")
# def form():
#    videos = Video.query.all()
#
#    return render_template("uploads.html", videos=videos)


# def query():
#    videos = Video.query.all()
#    return render_template("query.html", videos=videos)

# @app.route('/static/assets/video/video.mp4')
# def video():
#    return send_file('static/assets/video/video.mp4', mimetype='video/mp4')
