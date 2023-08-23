// import modules 
const router = require('express').Router();
const { createUser, getAllUsers, getUserByEmailAddress, getUserById, updateUserById, updateUserPassword, deleteUserById, loginUser } = require('../controllers/users_data_controller');

// create routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmailAddress);
router.put('/:id', updateUserById);
router.put('/password/:id', updateUserPassword);
router.delete('/:id', deleteUserById);
router.post('/login', loginUser);

// export module
module.exports = router;