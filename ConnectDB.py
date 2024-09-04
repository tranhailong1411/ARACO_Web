from flask import Flask, jsonify, request

import mysql.connector
import random
import hashlib
import secrets
app = Flask(__name__)

# Kết nối đến cơ sở dữ liệu
conn = mysql.connector.connect(
    host='10.7.114.38',
    database='hoidanIT',
    user='LONG1',
    password='1234'
)
cursor = conn.cursor()

api_keys = {}
@app.route('/api/v1/positions/create_api_key', methods=['POST'])
def create_api_key():
    new_api_key = hashlib.sha256(secrets.token_bytes(32)).hexdigest()
    api_keys[new_api_key] = True
    return jsonify({'api_key': new_api_key})
@app.route('/api/v1/positions/get_data', methods=['GET'])
def get_data():
    if 'X-API-Key' not in request.headers or request.headers['X-API-Key'] not in api_keys:
        return jsonify({'error': 'Invalid API key'}), 401
    try:
        # Thực thi truy vấn SQL để lấy dữ liệu từ bảng "positons"
        cursor.execute("SELECT * FROM positions")
        positions = cursor.fetchall()
        # Chuyển đổi dữ liệu thành danh sách các dictionary
        result = []
        for position in positions:
            result.append({
                'id': position[0],
                'name': position[1],
                'koutei_id': position[2],
                'delay_time': position[3],
                'delay_count': position[4],
                'created_at': position[5],
                'updated_at': position[6]
            })
        # Trả về dữ liệu dưới dạng JSON
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/v1/positions/Create', methods=['POST'])
def create_position():
    if 'X-API-Key' not in request.headers or request.headers['X-API-Key'] not in api_keys:
        return jsonify({'error': 'Invalid API key'}), 401    
    data = request.get_json()
    if data is None:
        return jsonify({'message': 'No JSON data received'}), 400

    name = data.get('name')
    koutei_id = data.get('koutei_id')
    delay_time = data.get('delay_time')
    delay_count = data.get('delay_count')

    # Thực thi truy vấn SQL để tạo một vị trí mới
    cursor.execute("INSERT INTO positions (name, koutei_id, delay_time, delay_count) VALUES (%s, %s, %s, %s)",
                   (name, koutei_id, delay_time, delay_count))
    conn.commit()

    return jsonify({'message': 'Position created successfully'})
@app.route('/api/v1/positions/get_data/<int:id>', methods=['GET'])
def get_position(id):
    if 'X-API-Key' not in request.headers or request.headers['X-API-Key'] not in api_keys:
        return jsonify({'error': 'Invalid API key'}), 401
    try:
        cursor.execute("SELECT * FROM positions WHERE id = %s", (id,))
        position = cursor.fetchone()
        if position:
            return jsonify({
                'id': position[0],
                'name': position[1],
                'koutei_id': position[2],
                'delay_time': position[3],
                'delay_count': position[4],
                'created_at': position[5],
                'updated_at': position[6]
            })
        else:
            return jsonify({'error': 'Position not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/positions/update/<int:id>', methods=['PUT'])
def update_position(id):
    if 'X-API-Key' not in request.headers or request.headers['X-API-Key'] not in api_keys:
        return jsonify({'error': 'Invalid API key'}), 401    
    data = request.get_json()
    if data is None:
        return jsonify({'message': 'No JSON data received'}), 400

    name = data.get('name')
    koutei_id = data.get('koutei_id')
    delay_time = data.get('delay_time')
    delay_count = data.get('delay_count')

    try:
        cursor.execute("UPDATE positions SET name = %s, koutei_id = %s, delay_time = %s, delay_count = %s WHERE id = %s",
                       (name, koutei_id, delay_time, delay_count, id))
        conn.commit()
        return jsonify({'message': 'Position updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/positions/delete/<int:id>', methods=['DELETE'])
def delete_position(id):
    if 'X-API-Key' not in request.headers or request.headers['X-API-Key'] not in api_keys:
        return jsonify({'error': 'Invalid API key'}), 401    
    try:
        cursor.execute("DELETE FROM positions WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Position deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)