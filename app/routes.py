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
    get_jwt,
    jwt_required,
    unset_jwt_cookies,
    set_access_cookies,
    set_refresh_cookies,
)

from app import app, db, jwt
from app.models import TokenBlockList, User
from app.auth import validate_register

@jwt.unauthorized_loader
def unauthorized_loader(callback):
    flash("please login to access this page")
    return redirect(url_for("register_view"))


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    flash("Your session has expired. Please login again.")
    return redirect(url_for("login_view"))


@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data["jti"]

    token = db.session.query(TokenBlockList).filter(TokenBlockList.jti == jti).scalar()

    return token is not None


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return redirect(url_for("login_view"))


@app.route("/")
@jwt_required()
def index():
    return render_template("index.html")


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

    # Validate form data
    if not username or not email or not password or not confirm_password:
        return redirect(url_for("register_view"))
    
    is_valid_and_errors = validate_register(username, email, password, confirm_password)
    if not is_valid_and_errors[0]:
        print(is_valid_and_errors[1])
        return render_template("register.html", errors = is_valid_and_errors[1])

    # Create a new user and add to the database
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Success response

    resp = make_response(redirect(url_for("login_view")))
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

        # Create the response with HTMX redirect and set cookies
        resp = make_response()
        resp.headers["HX-Redirect"] = url_for(
            "index"
        )  # HTMX will handle the redirect on the client side
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)

        return resp

    # Return an error message with HTMX
    flash("Username or password incorrect")
    resp = make_response(redirect(url_for("login_view")))
    resp.headers["HX-Trigger"] = (
        "loginError"  # Trigger HTMX event on the client side if login fails
    )
    return resp


@app.route("/logout", methods=["POST", "GET"])
@jwt_required()
def logout():
    jwt = get_jwt()
    jti = jwt.get("jti")
    if not jti:
        return jsonify(success=False, message="Missing JWT identifier"), 400
    print(f"jti : {jti}")
    token_block_list_object = TokenBlockList(jti=jti)

    token_block_list_object.save()

    resp = make_response(redirect(url_for("login_view")))
    unset_jwt_cookies(resp)  # Clear the JWT cookies

    flash("You have been logged out successfully.")
    return resp
