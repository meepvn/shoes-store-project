const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'shoes_store',
})


module.exports = pool;