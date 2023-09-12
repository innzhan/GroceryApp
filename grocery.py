import sqlite3

db = sqlite3.connect('db.sqlite')

db.execute('''CREATE TABLE IF NOT EXISTS grocery1(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    price real NOT NULL,
    quantity INTEGER
)''')


cursor = db.cursor()

cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("milk","1.0",0)''')
cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("cookie","1.0",0)''')
cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("apple","1.0",0)''')
cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("bread","1.0",0)''')
cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("oil","1.0",0)''')
cursor.execute('''INSERT INTO grocery1(name,price,quantity) VALUES("sugar","1.0",0)''')

db.execute('DROP TABLE IF EXISTS user')

db.execute('''CREATE TABLE user(
    userId integer PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL,
    password text NOT NULL
)''')


cursor = db.cursor()

cursor.execute('''
    INSERT INTO user(username,password)
    VALUES('test','test')
''')



db.execute("""
    CREATE TABLE IF NOT EXISTS groceryItems(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price DOUBLE NOT NULL,
        image BLOB
    )""")

#do add more if you want to, chg the pictures as well
items_to_add = [
    (1,'Cookie',2.99,'.../picture/milk.png'),
    (2, 'Milk',  1.99, '../picture/milk.png'), 
    (3, 'Apple', 1.99, '../picture/milk.png'),
]

for item in items_to_add:
    cursor.execute("""
        INSERT INTO groceryItems(id,name,price,image)
        VALUES (?,?,?,?)""",item)
db.commit()
db.close()
