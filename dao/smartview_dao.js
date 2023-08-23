// import dependencies
const { createPool } = require('mysql');
const dotenv = require('dotenv');

// configure dotenv
dotenv.config();

// create pool
const pool = createPool({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    connectionLimit: 10,
    ssl: false
});

// connect to database
pool.getConnection((error, connection) => {
    // check for errors
    if (error) {
        // log the error
        console.error(error);

        // check for error codes
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        } else if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    } else {
        console.log(`Successfully connected to database: ${process.env.MYSQL_DATABASE}`);
    }

    // release the connection
    if (connection) {
        connection.release();
    }

    // return the connection
    return;
});

// export the pool
module.exports = pool;