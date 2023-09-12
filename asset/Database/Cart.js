let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase({ name: 'db.sqlite' }, this.openCallback, this.errorCallback);
export default class Database{
    
    initDB(){
        db.transaction(tx =>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS cart2(GroceryID INTEGER PRIMARY KEY AUTOINCREMENT, GroceryName TEXT NOT NULL, GroceryPrice double NOT NULL, GroceryQuantity INTEGER)',
                [],
                (tx,result) => {
                    console.log("Table create successfully");
                },
                    (tx,error) =>{
                        console.log(error.message);
                    }
            );
        });
    }

    addCart(GroceryID,GroceryName,GroceryPrice,GroceryQuantity){

        db.transaction(tx=> {
            tx.executeSql(
                'INSERT INTO cart2(GroceryID,GroceryName,GroceryPrice,GroceryQuantity) VALUES(?,?,?,?)',
                [GroceryID,GroceryName,GroceryPrice,GroceryQuantity] ,
                (tx,result)=> {
                    console.log("Insert success");
                },
                    (tx,error) =>{
                        console.log(error.message);
                    }
            );
        });
    }

    viewCart() {
        return new Promise((resolve) => {
            let rows = [];
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * from cart2' ,
                    [] ,
                    (tx,result)=> {
                        console.log(result.rows.length +"rows");
                        rows = result.rows._array;
                        resolve(rows);
                    },
                        (tx,error) =>{
                            console.log(error.message);
                        }
                );
            });
        })
    }

    addQuantity(GroceryID){
        return new Promise((resolve)=>{
            db.transaction(tx =>{
                tx.executeSql(
                    'UPDATE cart2 set GroceryQuantity=GroceryQuantity+1 where GroceryID=?',
                    [GroceryID],
                    (tx,result) => {
                        resolve('success');
                    },
                    (tx,error) => {
                        console.log(error.message);
                    }
                )
            });
        })
    }

    minusQuantity(GroceryID){
        return new Promise((resolve)=>{
            db.transaction(tx =>{
                tx.executeSql(
                    'UPDATE cart2 set GroceryQuantity=GroceryQuantity-1 where GroceryID=?',
                    [GroceryID],
                    (tx,result) => {
                        resolve('success');
                    },
                    (tx,error) => {
                        console.log(error.message);
                    }
                )
            });
        })
    }

    emptyCart(){
        return new Promise((resolve)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    'delete from cart2',[],
                    (tx,result) =>{
                        resolve('success');
                    },
                    (tx,error) =>{
                        console.log(error.message);
                    }
                )
            });
        })
    }
}