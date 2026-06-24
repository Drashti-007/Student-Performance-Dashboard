import sqlite3

def get_db_connection():

    conn = sqlite3.connect('database.db')

    conn.row_factory = sqlite3.Row

    return conn

def create_table():

    conn = get_db_connection()

    conn.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            enrollment_no TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT,
            class_name TEXT,
            mobile TEXT,
            maths INTEGER,
            physics INTEGER,
            chemistry INTEGER,
            english INTEGER,
            computer_science INTEGER,
            attendance_maths INTEGER,
            attendance_physics INTEGER,
            attendance_chemistry INTEGER,
            attendance_english INTEGER,
            attendance_cs INTEGER

        )
     ''')
    
    conn.commit()

    conn.close()
    
def create_admin_table():

    conn = get_db_connection()

    conn.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL     
        )
    ''')

    conn.commit()

    conn.close()