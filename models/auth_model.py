from database.db import get_db_connection

def admin_login(username, password):

    conn = get_db_connection()

    admin = conn.execute(
        '''
        SELECT * FROM admins
        WHERE username = ? AND password = ?
        ''',
        (username, password)
    ).fetchone()

    conn.close()

    return admin

def student_login(enrollment_no, password):

    conn = get_db_connection()

    student = conn.execute(
        '''
        SELECT * FROM students
        WHERE enrollment_no = ? AND password = ?
        ''',
        (enrollment_no, password)
    ).fetchone()

    conn.close()

    return student