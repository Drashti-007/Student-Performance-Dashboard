from database.db import get_db_connection

def get_student_dashboard(enrollment_no):

    conn = get_db_connection()

    student = conn.execute(
        '''
        SELECT * FROM students
        WHERE enrollment_no = ?
        ''',
        (enrollment_no,)
    ).fetchone()

    conn.close()

    if not student:
        return None
    
    student = dict(student)

    average_score = (
        student['maths'] +
        student['physics'] +
        student['chemistry'] +
        student['english'] +
        student['computer_science']
    ) / 5

    overall_attendance = (
        student['attendance_maths'] +
        student['attendance_physics'] +
        student['attendance_chemistry'] +
        student['attendance_english'] +
        student['attendance_cs']
    ) / 5

    dashboard_data = {
        "name": student['name'],
        "email": student['email'],

        "marks": {
            "maths": student['maths'],
            "physics": student['physics'],
            "chemistry": student['chemistry'],
            "english": student['english'],
            "computer_science": student['computer_science']
        },

        "attendance": {
            "maths": student['attendance_maths'],
            "physics": student['attendance_physics'],
            "chemistry": student['attendance_chemistry'],
            "english": student['attendance_english'],
            "computer_science": student['attendance_cs']
        },

        "average_score": average_score,

        "overall_attendance": overall_attendance
    }

    return dashboard_data

def get_student_attendance(enrollment_no):

    conn = get_db_connection()

    student = conn.execute(
        '''
        SELECT * FROM students
        WHERE enrollment_no = ?
        ''',
        (enrollment_no,)
    ).fetchone()

    conn.close()

    if not student:
        return None
    
    student = dict(student)

    overall_attendance = (
        student['attendance_maths']+
        student['attendance_physics']+
        student['attendance_chemistry']+
        student['attendance_english']+
        student['attendance_cs']
    ) / 5

    attendance_data = {

        "name": student['name'],
        
        "attendance": {
            "maths": student['attendance_maths'],
            "physics": student['attendance_physics'],
            "chemistry": student['attendance_chemistry'],
            "english": student['attendance_english'],
            "computer_science": student['attendance_cs']
        },

        "overall_attendance": overall_attendance
    }

    return attendance_data

def get_student_profile(enrollment_no):

    conn = get_db_connection()

    student = conn.execute(
        '''
        SELECT * FROM students
        WHERE enrollment_no = ?
        ''',
        (enrollment_no,)
    ).fetchone()

    conn.close()

    if not student:
        return None

    student = dict(student)

    profile_data = {
        "name": student['name'],
        "enrollment_no": student['enrollment_no'],
        "email": student['email'],
        "class_name": student['class_name'],
        "mobile": student['mobile']
    }

    return profile_data

def get_student_performance(enrollment_no):

    conn = get_db_connection()

    student = conn.execute(
        '''
        SELECT * FROM students
        WHERE enrollment_no = ?
        ''',
        (enrollment_no,)
    ).fetchone()

    conn.close()

    if not student:
        return None
    
    student = dict(student)

    average_marks = (
        student['maths'] +
        student['physics'] +
        student['chemistry'] +
        student['english'] +
        student['computer_science']
    ) / 5

    status = "Pass"

    if (
        student['maths'] < 37 or
        student['physics'] < 37 or
        student['chemistry'] < 37 or
        student['english'] < 37 or
        student['computer_science'] < 37
    ):
        status = "Fail"

    performance_data = {
        "name": student['name'],

        "marks": {
            "maths": student['maths'],
            "physics": student['physics'],
            "chemistry": student['chemistry'],
            "english": student['english'],
            "computer_science": student['computer_science']
        },

        "average_marks": average_marks,

        "status": status
    }

    return performance_data

def get_student_report(enrollment_no):
    performance_data = get_student_performance(enrollment_no)
    attendance_data = get_student_attendance(enrollment_no)
    profile_data = get_student_profile(enrollment_no)

    if not performance_data or not attendance_data or not profile_data:
        return None
    
    performance_data.pop("name", None)
    attendance_data.pop("name", None)
    profile_name = profile_data.pop("name", None)

    report = {
        "name": profile_name,
        "performance": performance_data,
        "attendance": attendance_data,
        "profile": profile_data
    }

    return report