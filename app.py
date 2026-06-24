from flask import Flask
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
    return "Student Performance Dashboard Backend Running"

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