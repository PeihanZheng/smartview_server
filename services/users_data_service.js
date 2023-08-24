// import dependencies
const pool = require('../dao/smartview_dao');
const bcrypt = require('bcrypt');

// export the module
module.exports = {
    create: (data, callback) => {
        // hash the password
        bcrypt.hash(data.password, 10, (error, hash) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // replace the password with the hash
                data.password = hash;
            }
        });

        // create the query
        pool.query(`INSERT INTO users_data SET ?`, [data], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // get all users
    getAllUsers: (callback) => {
        // sql query
        pool.query(`SELECT * FROM users_data`, (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // get user by id
    getUserById: (id, callback) => {
        // sql query
        pool.query(`SELECT * FROM users_data WHERE user_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results[0]);
            }
        });
    },
    // get user by email address
    getUserByEmailAddress: (email, callback) => {
        // sql query
        pool.query(`SELECT * FROM users_data WHERE email_address = ?`, [email], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results[0]);
            }
        });
    },
    // update user by id
    updateUserById: (data, callback) => {
        // create the query
        pool.query(`UPDATE users_data SET ? WHERE user_id = ?`, [data, data.user_id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // delete user by id
    deleteUserById: (id, callback) => {
        // create the query
        pool.query(`DELETE FROM users_data WHERE user_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // verify user password
    verifyUserPassword: (email, password, callback) => {
        // get the user by email address
        pool.query(`SELECT * FROM users_data WHERE email_address = ?`, [email], (error, results, fields) => {
            // check for errors
            if (error) {
                // error handling
                return callback(error);
            }
        
            // check for results
            if (results.length < 1) {
                // return the results
                return callback(null, false);
            }

            // compare the passwords
            const user = results[0];
            console.log(user);
            bcrypt.compare(password, user.password, (error, passwordMatch) => {
                // check for errors
                if (error) {
                    // error handling
                    console.error(error);
                    return callback(error);
                } else if (!passwordMatch) {
                    // return the results
                    console.log('passwords do not match');
                    return callback(null, false);
                } else {
                    // return the results
                    console.log('passwords match');
                    return callback(null, passwordMatch);
                }
            });
        });
    }
}