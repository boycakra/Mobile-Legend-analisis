from flask import render_template, url_for, request, redirect, flash
from app import app, db, bcrypt
from app.models import User, Video
from app.forms import RegistrationFrom, LoginFrom
from flask_login import login_user, current_user, logout_user


@app.route("/")
def index():
    return render_template("index.html")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() == "mp4"


@app.route("/uploads", methods=["GET", "POST"])
def uploads():
    if request.method == "POST":
        title = request.form["title"]
        video_file = request.files["video_file"]

        if video_file:
            video_path = os.path.join("./static/uploads/", video_file.filename)
            video_file.save(video_path)

            new_video = Video(title=title, file_path=video_path)

            db.session.add(new_video)
            db.session.commit()

        return redirect(url_for("form"))

    title = None
    return render_template("uploads.html")


@app.route("/form")
def form():
    videos = Video.query.all()

    return render_template("uploads.html", videos=videos)

@app.route("/register", methods = ['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationFrom()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')

        user = User(username = form.username.data,
                    email = form.email.data,
                    password = hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created you are now be able to login !', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form = form)


@app.route("/login", methods = ['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginFrom()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            return redirect(url_for('index'))
        else:
            flash('Login failed, please check your email or password', 'danger')

    return render_template('login.html', form = form)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route("/list")
def query():
    videos = Video.query.all()
    return render_template("query.html", videos=videos)


# @app.route('/static/assets/video/video.mp4')
# def video():
#    return send_file('static/assets/video/video.mp4', mimetype='video/mp4')
