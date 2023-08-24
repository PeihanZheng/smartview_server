// import the controller
const { createCamera, getAllCameras, getCameraById, getCameraByUserId, updateCameraById, deleteCameraById } = require('../controllers/camera_list_controller');
const router = require('express').Router();

// create routes
router.post('/', createCamera);
router.get('/', getAllCameras);
router.get('/:id', getCameraById);
router.get('/user/:id', getCameraByUserId);
router.put('/:id', updateCameraById);
router.delete('/:id', deleteCameraById);

// export module
module.exports = router;