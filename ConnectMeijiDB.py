from flask import Flask, jsonify, request
import pyodbc
import mysql.connector
import random
app = Flask(__name__)
# Thay đổi các thông tin kết nối cho phù hợp với cơ sở dữ liệu của bạn
server = '10.7.117.160'
database = 'KENSA'
username = 'ARACO'
password = '1234'

# Tạo chuỗi kết nối

connection_string = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"
# connection_string = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"

conn = pyodbc.connect(connection_string)
@app.route('/api/Meiji/get_data', methods=['GET'])
def get_data():
    try:
        # Thực thi truy vấn SQL để lấy dữ liệu từ bảng "positons"
        cursor = conn.cursor()
        cursor.execute("SELECT [ID], [QR_Data], [Dev_ID], [Error_Status], [date1], [flag_Comp] FROM [dbo].[KENSA] ORDER BY [ID] DESC OFFSET 0 ROWS FETCH NEXT 5000 ROWS ONLY")
        kensas = cursor.fetchall()
        # Chuyển đổi dữ liệu thành danh sách các dictionary
        result = []
        for kensa in kensas:
            result.append({
            'id': kensa[0],
            'QR-Data': kensa[1],
            'Dev_ID': kensa[2],
            'Error_Status': kensa[3],
            'Date': kensa[4],
            'Flag_Com': kensa[5],
        })
        # Trả về dữ liệu dưới dạng JSON
        return jsonify(result) 
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# conn.close()
if __name__ == '__main__':
    app.run(host='0.0.0.0',port =5005, debug=True)