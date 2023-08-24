// import modules
const pool = require('../dao/smartview_dao');
const bcrypt = require('bcrypt');

// export the module
module.exports = {
    // create new camera
    create: (data, callback) => {
        // create the query
        pool.query(`INSERT INTO camera_list SET ?`, [data], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // get all cameras
    getAllCameras: (callback) => {
        // sql query
        pool.query(`SELECT * FROM camera_list`, (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // get camera by id
    getCameraById: (id, callback) => {
        // sql query
        pool.query(`SELECT * FROM camera_list WHERE camera_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results[0]);
            }
        });
    },
    // get camera by user id
    getCameraByUserId: (id, callback) => {
        // sql query
        pool.query(`SELECT * FROM camera_list WHERE user_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                console.log(results);
                return callback(null, results);
            }
        });
    },
    // update camera by id
    updateCameraById: (id, data, callback) => {
        // sql query
        pool.query(`UPDATE camera_list SET ? WHERE camera_id = ?`, [data, id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    },
    // delete camera by id
    deleteCameraById: (id, callback) => {
        // sql query
        pool.query(`DELETE FROM camera_list WHERE camera_id = ?`, [id], (error, results, fields) => {
            if (error) {
                // error handling
                return callback(error);
            } else {
                // return the results
                return callback(null, results);
            }
        });
    }
}