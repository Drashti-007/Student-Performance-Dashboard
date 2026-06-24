from flask import Flask, render_template
from flask_cors import CORS
from database.db import create_table, create_admin_table
from database.db import get_db_connection
from routes.student_routes import student_bp
from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

CORS(app)

create_table()
create_admin_table()

app.register_blueprint(student_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route('/student')
def student():
    return render_template('student.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/admin-dashboard')
def admin_dashboard():
    return render_template('adminDashboard.html')

'''temporary route to test the database connection and retrieve all students'''
@app.route('/test-students')
def test_students():

    from models.admin_model import get_all_students

    return get_all_students()

@app.route('/create-admin')
def create_admin():

    conn = get_db_connection()

    conn.execute(
        '''
        INSERT INTO admins (username, password)
        VALUES (?, ?)
        ''',
        ('admin', 'admin123')
    )

    conn.commit()

    conn.close()

    return "Admin user created successfully"

if __name__== '__main__':
    app.run(debug=True)