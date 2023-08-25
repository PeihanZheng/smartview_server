// import controller and router
const { createAlert, getAllAlerts, getAlertById, updateAlertById, deleteAlertById } = require('../controllers/alerts_list_controller');
const router = require('express').Router();

// create routes
router.post('/', createAlert);
router.get('/', getAllAlerts);
router.get('/:id', getAlertById);
router.put('/:id', updateAlertById);
router.delete('/:id', deleteAlertById);

// export module
module.exports = router;