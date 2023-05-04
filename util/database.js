//10.1 Connecting mysql data base

const mysql =require('mysql2')

const pool = mysql.createPool({         //10.1 Create pool of connections
    host:'localhost'
    , user: 'root',
    database:'node-complete',
    password:'darsh123'
})       

module.exports=pool.promise()   //10.1 exported database