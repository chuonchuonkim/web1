from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def create_connection():
    conn = sqlite3.connect('exams.db')
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/exams', methods=['GET', 'POST'])
def exams():
    if request.method == 'GET':
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM exams')
        exams = cursor.fetchall()
        conn.close()
        return jsonify(exams)
    elif request.method == 'POST':
        exam_data = request.json
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO exams (name, date, location, description) VALUES (?, ?, ?, ?)',
                       (exam_data['name'], exam_data['date'], exam_data['location'], exam_data['description']))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Exam added successfully'})

@app.route('/exams/<int:id>', methods=['PUT', 'DELETE'])
def single_exam(id):
    if request.method == 'PUT':
        exam_data = request.json
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE exams SET name=?, date=?, location=?, description=? WHERE id=?',
                       (exam_data['name'], exam_data['date'], exam_data['location'], exam_data['description'], id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Exam updated successfully'})
    elif request.method == 'DELETE':
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM exams WHERE id=?', (id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Exam deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
