// get the service methods
const { create, getAllAlerts, getAlertById, updateAlertById, deleteAlertById } = require('../services/alerts_list_service');

// export module
module.exports = {
    // create new alert
    createAlert: (req, res) => {
        // get the data
        const body = req.body;

        // create the alert
        create(body, (error, results) => {
            if (error) {
                // error handling
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get all alerts
    getAllAlerts: (req, res) => {
        // get all alerts
        getAllAlerts((error, results) => {
            if (error) {
                // error handling
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get alert by id
    getAlertById: (req, res) => {
        // get the id
        const id = req.params.id;

        // get alert by id
        getAlertById(id, (error, results) => {
            if (error) {
                // error handling
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // update alert by id
    updateAlertById: (req, res) => {
        // get the id
        const id = req.params.id;

        // get the data
        const body = req.body;

        // update alert by id
        updateAlertById(id, body, (error, results) => {
            if (error) {
                // error handling
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else if (!results) {
                // error handling
                return res.status(404).json({
                    success: 0,
                    message: 'Alert not found'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    message: 'Alert updated successfully'
                });
            }
        });
    },
    // delete alert by id
    deleteAlertById: (req, res) => {
        // get the id
        const id = req.params.id;

        // delete alert by id
        deleteAlertById(id, (error, results) => {
            if (error) {
                // error handling
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            } else if (!results) {
                // error handling
                return res.status(404).json({
                    success: 0,
                    message: 'Alert not found'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    message: 'Alert deleted successfully'
                });
            }
        });
    }
};