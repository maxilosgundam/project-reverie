const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {requireAuth} = require('../middleware/requireAuth');


const router = express.Router();

//controller functions
const {signupUser, signinUser, authenticateUser} = require('../controllers/userController');

//login route
router.post('/signin', signinUser);


//signup route
router.post('/signup', signupUser);

// //user authenticate
// router.get('/user', authenticateUser);


module.exports = router