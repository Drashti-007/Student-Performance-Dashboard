from flask import Blueprint, request, jsonify

from models.auth_model import(
    admin_login,
    student_login
)

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/admin/login', methods=['POST'])
def admin_login_route():

    data = request.get_json()

    admin = admin_login(
        data['username'],
        data['password']
    )

    if admin:

        admin = dict(admin)

        return jsonify({

            "message": "Admin login successful",

            "role": "admin",

            "username": admin['username']
        })
    
    return jsonify({
        "message": "Invalid admin credentials"
    }), 401

@auth_bp.route('/student/login', methods=['POST'])
def student_login_route():

    data = request.get_json()

    student = student_login(
        data['enrollment_no'],
        data['password']
    )

    if student:

        student = dict(student)

        return jsonify({

            "message": "Student login successful",

            "role": "student",

            "name": student['name'],

            "enrollment_no": student['enrollment_no']
        })

    return jsonify({
        "message": "Invalid student credentials"
    }), 401