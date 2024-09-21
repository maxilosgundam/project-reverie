const express = require('express');
const jwt = require('jsonwebtoken');
const World = require('../models/worldModel');
const requireAuth = require('../middleware/requireAuth');
const {createWorld} = require('../controllers/worldController');


const router = express.Router();


//authenticate user
router.use(requireAuth);

//create world route
router.post('/createworld', createWorld);

module.exports = router;