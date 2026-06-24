from flask import Blueprint, jsonify, request

from models.student_model import(
    get_student_dashboard,
    get_student_attendance,
    get_student_profile,
    get_student_performance,
    get_student_report
)

student_bp = Blueprint('student_bp', __name__)

@student_bp.route(
    '/student/dashboard/<enrollment_no>', 
    methods=['GET']
)
def student_dashboard(enrollment_no):

    dashboard_data = get_student_dashboard(
        enrollment_no
    )

    if not dashboard_data:

        return jsonify({
            "message": "Student not found"
        }), 404
    
    return jsonify(dashboard_data)

@student_bp.route(
    '/student/attendance/<enrollment_no>',
    methods=['GET']
)
def students_attendance(enrollment_no):

    attendance_data = get_student_attendance(
        enrollment_no
    )

    if not attendance_data:

        return jsonify({
            "message": "Student not found"
        }), 404
    
    return jsonify(attendance_data)

@student_bp.route(
    '/student/profile/<enrollment_no>',
    methods=['GET']
)
def student_profile(enrollment_no):

    profile_data = get_student_profile(
        enrollment_no
    )

    if not profile_data:

        return jsonify({
            "message": "Student not found"
        }), 404
    
    return jsonify(profile_data)

@student_bp.route(
    '/student/performance/<enrollment_no>',
    methods=['GET']
)
def student_performance(enrollment_no):

    performance_data = get_student_performance(
        enrollment_no
    )

    if not performance_data:

        return jsonify({
            "message": "Student not found"
        }), 404
    
    return jsonify(performance_data)

@student_bp.route(
    '/student/report/<enrollment_no>',
    methods=['GET']
)
def student_report(enrollment_no):

    report_data = get_student_report(
        enrollment_no
    )

    if not report_data:

        return jsonify({
            "message": "Student not found"
        }), 404
    
    return jsonify(report_data)