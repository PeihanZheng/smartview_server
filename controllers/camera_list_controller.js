// import the service layer
const { create, getAllCameras, getCameraById, getCameraByUserId, updateCameraById, deleteCameraById } = require('../services/camera_list_service');

// export module
module.exports = {
    // create new camera
    createCamera: (req, res) => {
        // get the data
        const body = req.body;

        // create the camera
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
    // get all cameras
    getAllCameras: (req, res) => {
        // get all cameras
        getAllCameras((error, results) => {
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
    // get camera by id
    getCameraById: (req, res) => {
        // get the id
        const id = req.params.id;

        // get camera by id
        getCameraById(id, (error, results) => {
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
                    message: 'Camera not found'
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
    // get camera by user id
    getCameraByUserId: (req, res) => {
        // get user id
        const user_id = req.params.user_id;

        // get camera by user id
        getCameraByUserId(user_id, (error, results) => {
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
                    message: 'Camera not found'
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
    // update camera by id
    updateCameraById: (req, res) => {
        // get the id
        const id = req.params.id;

        // get the data
        const body = req.body;

        // update camera by id
        updateCameraById(id, body, (error, results) => {
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
                    message: 'Camera not found'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    message: 'Camera updated successfully'
                });
            }
        });
    },
    // delete camera by id
    deleteCameraById: (req, res) => {
        // get the id
        const id = req.params.id;

        // delete camera by id
        deleteCameraById(id, (error, results) => {
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
                    message: 'Camera not found'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    message: 'Camera deleted successfully'
                });
            }
        });
    }
}