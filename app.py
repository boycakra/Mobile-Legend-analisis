from app import app, db

if __name__ == "__main__":
    with app.app_context():
        # Import and initialize your database
        db.create_all()
    app.run(debug=True)
