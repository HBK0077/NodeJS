const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "5424"
});

module.exports = pool.promise()