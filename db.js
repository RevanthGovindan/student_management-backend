const mysql = require("mysql");

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT,
});

connection.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('Database connection was refused.')
        }
    }

    if (connection) {
        console.log("Connection is there");
        connection.release()
    }

    return
});

export default connection;