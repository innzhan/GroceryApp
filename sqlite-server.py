# import sqlite3
# from flask import Flask, jsonify, request, abort
# from argparse import ArgumentParser


# DB = 'android/app/src/main/assets/db.sqlite'


# def get_userrow_as_dict(row):
#     row_dict = {
#         'userId': row[0],
#         'username': row[1],
#         'password': row[2],
#     }

#     return row_dict

# app = Flask(__name__)
# #
# # get all
# #
# @app.route('/api/user', methods=['GET'])
# def index():
#     db = sqlite3.connect(DB)
#     cursor = db.cursor()
#     cursor.execute('SELECT * FROM user')
#     rows = cursor.fetchall()

#     db.close()

#     rows_as_dict = []
#     for row in rows:
#         row_as_dict = get_userrow_as_dict(row)
#         rows_as_dict.append(row_as_dict)

#     return jsonify(rows_as_dict), 200

# @app.route('/api/user', methods=['POST'])
# def store():
#     if not request.json:
#         abort(404)

#     new_user = (
#         request.json['username'],
#         request.json['password'],
#     )

#     db = sqlite3.connect(DB)
#     cursor = db.cursor()

#     cursor.execute('''
#         INSERT INTO user(username,password)
#         VALUES(?,?)
#     ''', new_user)

#     user_id = cursor.lastrowid

#     db.commit()

#     response = {
#         'userId': user_id,
#         'affected': db.total_changes,
#     }

#     db.close()

#     return jsonify(response), 201

# if __name__ == '__main__':
#     parser = ArgumentParser()
#     parser.add_argument('-p', '--port', default=6000, type=int, help='port to listen on')
#     args = parser.parse_args()
#     port = args.port

#     app.run(host='0.0.0.0', port=port)

import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'android/app/src/main/assets/db.sqlite'

def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'name': row[1],
        'price': row[2],
        'image': row[3],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/grocery', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM groceryItems ORDER BY name')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/grocery/<int:item>',methods=['GET'])
def show (item):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT*FROM groceryItems WHERE id=?'(str(item),))
    row=cursor.fetchone()
    db.close()

    if row:
        row_as_dict=get_row_as_dict(row)
        return jsonify(row_as_dict),200
    else:
        return jsonify(None),200




def get_userrow_as_dict(row):
    row_dict = {
        'userId': row[0],
        'username': row[1],
        'password': row[2],
    }
    return row_dict


app = Flask(__name__)


@app.route('/api/user', methods=['GET'])
def index():
    try:
        db = sqlite3.connect(DB)
        cursor = db.cursor()
        cursor.execute('SELECT * FROM user')
        rows = cursor.fetchall()

        rows_as_dict = [get_userrow_as_dict(row) for row in rows]

        db.close()

        return jsonify(rows_as_dict), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/user', methods=['POST'])
def store():
    try:
        if not request.json:
            abort(400)  # Bad request

        new_user = (
            request.json['username'],
            request.json['password'],
        )

        db = sqlite3.connect(DB)
        cursor = db.cursor()

        cursor.execute('''
            INSERT INTO user(username, password)
            VALUES (?, ?)
        ''', new_user)

        user_id = cursor.lastrowid

        db.commit()

        response = {
            'userId': user_id,
            'affected': db.total_changes,
        }

        db.close()

        return jsonify(response), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<int:user_id>', methods=['PUT'])
def update_password(user_id):
    try:
        if not request.json:
            abort(400)  # Bad request

        new_password = request.json['password']

        db = sqlite3.connect(DB)
        cursor = db.cursor()

        cursor.execute('''
            UPDATE user
            SET password = ?
            WHERE userId = ?
        ''', (new_password, user_id))

        db.commit()

        response = {
            'userId': user_id,
            'affected': db.total_changes,
        }

        db.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=6000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)






