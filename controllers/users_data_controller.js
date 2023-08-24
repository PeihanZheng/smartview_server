// import modules
const { create, getAllUsers, getUserById, getUserByEmailAddress, updateUserById, deleteUserById, verifyUserPassword } = require('../services/users_data_service');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// export modules
module.exports = {
    // create user
    createUser: (req, res) => {
        // get the body
        const body = req.body;

        // hash the password
        bcrypt.hash(body.password, 10, (error, hash) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                res.status(500).json({
                    success: 0,
                    message: 'An error occurred while hashing the password.'
                });
            } else {
                // replace the password with the hash
                body.password = hash;
            }
        });

        // create the user
        create(body, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while creating the user.'
                });
            } else {
                // return the results
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        })
    }, 
    // get all users
    getAllUsers: (req, res) => {
        // get all users
        getAllUsers((error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while retrieving the users.'
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
    // get user by id
    getUserById: (req, res) => {
        // get the id
        const id = req.params.id;

        // get the user
        getUserById(id, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while retrieving the user.'
                });
            } else if (!results) {
                // return the results
                return res.status(400).json({
                    success: 0,
                    message: 'User does not exist.'
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
    // get user by email address
    getUserByEmailAddress: (req, res) => {
        // get the email address
        const email = req.params.email;

        // get the user
        getUserByEmailAddress(email, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while retrieving the user.'
                });
            } else if (!results) {
                // if user does not exist
                return res.status(400).json({
                    success: 0,
                    message: 'User does not exist.'
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
    // update user by id
    updateUserById: (req, res) => {
        // get the body
        const body = req.body;

        // hash the password
        bcrypt.hash(body.password, 10, (error, hash) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                res.status(500).json({
                    success: 0,
                    message: 'An error occurred while hashing the password.'
                });
            } else {
                // replace the password with the hash
                body.password = hash;
            }
        });

        // update the user
        updateUserById(body, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while updating the user.'
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
    // delete user by id
    deleteUserById: (req, res) => {
        // get the id
        const id = req.params.id;

        // delete the user
        deleteUserById(id, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while deleting the user.'
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
    // update user password
    updateUserPassword: async (req, res) => {
        // get the id
        const id = req.params.id;

        // get the body
        const { email_address, password, new_password } = req.body;

        // check if request body is empty
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            // error handling
            console.error(error);
            return res.status(400).json({
                success: 0,
                message: 'Request body cannot be empty.'
            });
        }

        // verify if the user exists
        getUserByEmailAddress(email_address, (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while retrieving the user.'
                });
            } else {
                // check if results is not null
                if (!results) {
                    return res.status(400).json({
                        success: 0,
                        message: 'User does not exist.'
                    });
                } else {
                    // verify the password
                    verifyUserPassword(email_address, password, (error, results) => {
                        // check for errors
                        if (error) {
                            // error handling
                            console.error(error);
                            return res.status(500).json({
                                success: 0,
                                message: 'An error occurred while verifying the password.'
                            });
                        } else {
                            // check if results is not null
                            if (!results) {
                                return res.status(400).json({
                                    success: 0,
                                    message: 'Invalid password.'
                                });
                            } else {
                                // hash the new password
                                bcrypt.hash(new_password, 10, (error, hash) => {
                                    // check for errors
                                    if (error) {
                                        // error handling
                                        console.error(error);
                                        return res.status(500).json({
                                            success: 0,
                                            message: 'An error occurred while hashing the password.'
                                        });
                                    } else {
                                        // update the user
                                        updateUserById(id, { password: hash }, async (error, results) => {
                                            // check for errors
                                            if (error) {
                                                // error handling
                                                console.error(error);
                                                return res.status(500).json({
                                                    success: 0,
                                                    message: 'An error occurred while updating the user.'
                                                });
                                            } else {
                                                // return the results
                                                return res.status(200).json({
                                                    success: 1,
                                                    data: results
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    // login user
    loginUser: async (req, res) => {
        // get the body
        const { email_address, password } = req.body;

        // check if request body is empty
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            // error handling
            console.error(error);
            return res.status(400).json({
                success: 0,
                message: 'Request body cannot be empty.'
            });
        }

        // get user by email
        getUserByEmailAddress(email_address, async (error, results) => {
            // check for errors
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'An error occurred while retrieving the user.'
                });
            } else {
                // check if results is not null
                if (!results) {
                    // return the results
                    return res.status(400).json({
                        success: 0,
                        message: 'User does not exist.'
                    });
                } else {
                    // verify the password
                    verifyUserPassword(email_address, password, async (error, results) => {
                        // check for errors
                        if (error) {
                            // error handling
                            console.error(error);
                            return res.status(500).json({
                                success: 0,
                                message: 'An error occurred while verifying the password.'
                            });
                        } else {
                            // check if results is not null
                            if (!results) {
                                return res.status(400).json({
                                    success: 0,
                                    message: 'Password is incorrect.'
                                });
                            } else {
                                // sign the token
                                const token = sign({ user_id: results.user_id }, process.env.JWT_KEY, { expiresIn: '1h' });

                                // return the results
                                return res.status(200).json({
                                    success: 1,
                                    message: 'Login successful.',
                                    token: token
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}