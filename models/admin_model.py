from database.db import get_db_connection

def add_student(data):
    conn = get_db_connection()

    conn.execute(
        '''
        INSERT INTO students (
            id,
            enrollment_no,
            name,
            password,
            email,
            class_name,
            mobile,
            maths,
            physics,
            chemistry,
            english,
            computer_science,
            attendance_maths,
            attendance_physics,
            attendance_chemistry,
            attendance_english,
            attendance_cs)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            data['id'],
            data['enrollment_no'],
            data['name'],
            data['password'],
            data['email'],
            data['class_name'],
            data['mobile'],
            data['maths'],
            data['physics'],
            data['chemistry'],
            data['english'],
            data['computer_science'],
            data['attendance_maths'],
            data['attendance_physics'],
            data['attendance_chemistry'],
            data['attendance_english'],
            data['attendance_cs']
        )
    )

    conn.commit()

    conn.close()

def delete_student(id):

    conn = get_db_connection()

    conn.execute(
        'DELETE FROM students WHERE id = ?',
        (id,)
    )

    conn.commit()

    conn.close()

def update_student(id, data):

    conn = get_db_connection()

    conn.execute(
        '''
        UPDATE students
        SET name = ?,
        maths = ?,
        physics = ?,
        chemistry = ?,
        english = ?,
        computer_science = ?, 
        attendance_maths = ?,
        attendance_physics = ?,
        attendance_chemistry = ?,
        attendance_english = ?,
        attendance_cs = ?
        WHERE id = ?
        ''',
        (
            data['name'],
            data['maths'],
            data['physics'],
            data['chemistry'],
            data['english'],
            data['computer_science'],
            data['attendance_maths'],
            data['attendance_physics'],
            data['attendance_chemistry'],
            data['attendance_english'],
            data['attendance_cs'],
            id
        )
    )

    conn.commit()

    conn.close()

def get_all_students():

    conn = get_db_connection()

    students = conn.execute(
        'SELECT * FROM students'
    ).fetchall()

    conn.close()

    return [dict(student) for student in students]

def get_top_performers():

    conn = get_db_connection()

    students = conn.execute(
        '''
        SELECT * FROM students
        '''
    ).fetchall()

    conn.close()

    top_students = []

    for student in students:

        student = dict(student)

        average_marks = (

            student['maths'] +
            student['physics'] +
            student['chemistry'] +
            student['english'] +
            student['computer_science']

        ) / 5

        top_students.append({

            "name": student['name'],

            "average_marks": average_marks
        })

    top_students = sorted(
        top_students,
        key=lambda x: x['average_marks'],
        reverse=True
    )

    return top_students[:5]

def get_class_average():

    conn = get_db_connection()

    students = conn.execute(
        '''
        SELECT * FROM students
        '''
    ).fetchall()

    conn.close()

    if not students:
        return None

    total_students = len(students)

    maths_total = 0
    physics_total = 0
    chemistry_total = 0
    english_total = 0
    cs_total = 0

    for student in students:

        student = dict(student)

        maths_total += student['maths']
        physics_total += student['physics']
        chemistry_total += student['chemistry']
        english_total += student['english']
        cs_total += student['computer_science']

    maths_average = maths_total / total_students
    physics_average = physics_total / total_students
    chemistry_average = chemistry_total / total_students
    english_average = english_total / total_students
    cs_average = cs_total / total_students

    overall_class_average = (

        maths_average +
        physics_average +
        chemistry_average +
        english_average +
        cs_average

    ) / 5

    return {

        "maths_average": maths_average,
        "physics_average": physics_average,
        "chemistry_average": chemistry_average,
        "english_average": english_average,
        "computer_science_average": cs_average,

        "overall_class_average": overall_class_average
    }
