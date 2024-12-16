
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // Replace with your host
    port: '3306',
    user: 'rwu', // Replace with your database user
    password: 'K,)vuPDWK(C8Po#uvt', // Replace with your database password
    database: 'mobile_anwendungen', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;