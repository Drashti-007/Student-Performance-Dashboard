from flask import Blueprint, jsonify, request

from models.admin_model import(
    get_all_students,
    add_student,
    delete_student,
    update_student,
    get_top_performers,
    get_class_average,
    get_admin_analytics
)

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/students', methods=['GET'])
def get_students():

    students = get_all_students()

    return jsonify(students)

@admin_bp.route('/students', methods=['POST'])
def create_student():

    data = request.get_json()

    add_student(data)

    return jsonify({
        "message": "Student added successfully"
    })

@admin_bp.route('/students/<int:id>', methods=['DELETE'])
def remove_student(id):

    delete_student(id)

    return jsonify({
        "message": f"Student with ID {id} deleted successfully"
    })

@admin_bp.route('/students/<int:id>', methods=['PUT'])
def edit_student(id):

    data =request.get_json()

    update_student(id, data)

    return jsonify({
        "message": f"Student with ID {id} updated successfully"
    })

@admin_bp.route(
    '/admin/top-performers',
    methods=['GET']
)
def top_performers():

    top_students = get_top_performers()

    return jsonify(top_students)

@admin_bp.route(
    '/admin/class-average',
    methods=['GET']
)
def class_average():

    average_data = get_class_average()

    if not average_data:

        return jsonify({
            "message": "No students found"
        }), 404

    return jsonify(average_data)
@admin_bp.route(
    "/admin/analytics",
    methods=["GET"]
)
def admin_analytics():

    analytics = get_admin_analytics()

    return jsonify(analytics)