from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' #SQLITE DATABASE
db = SQLAlchemy(app)

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/uploads', methods=['GET', 'POST'])
def uploads():
    if request.method == 'POST':
        title = request.form.get('title')

        if title:
            video = Video(title=title)
            db.session.add(video)
            db.session.commit()
            return redirect(url_for('form'))

    # Initialize title variable for GET requests (or handle as needed)
    title = None
    return render_template('uploads.html')
    
@app.route('/form')
def form():
    videos = Video.query.all()

    return render_template("uploads.html", videos = videos)

@app.route('/list')
def query():
    videos = Video.query.all()
    return render_template('query.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug= True)