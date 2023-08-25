// import pool
const pool = require('../dao/smartview_dao');

// export the module
module.exports = {
    // create new alert
    create: (data, callback) => {
        // sql query
        pool.query(`INSERT INTO alerts_list SET ?`, [data], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        })
    },
    // get all alerts
    getAllAlerts: (callback) => {
        // sql query
        pool.query(`SELECT * FROM alerts_list`, (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // get alert by id
    getAlertById: (id, callback) => {
        // sql query
        pool.query(`SELECT * FROM alerts_list WHERE alert_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results[0]);
            }
        });
    },
    // update alert by id
    updateAlertById: (id, data, callback) => {
        // sql query
        pool.query(`UPDATE alerts_list SET ? WHERE alert_id = ?`, [data, id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // delete alert by id
    deleteAlertById: (id, callback) => {
        // sql query
        pool.query(`DELETE FROM alerts_list WHERE alert_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    }
};