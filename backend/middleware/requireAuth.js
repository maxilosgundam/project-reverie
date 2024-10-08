const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const {authorization} = req.headers;
  console.log('authorization is ', authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'No token, authorization token required.' });
  }
  const token = authorization.split(' ')[1];
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({_id}).select('_id');
    console.log('req user is ', req.user);
    next();
  } catch (error) {
    console.log('error is ', error);
    res.status(401).json({ message: 'Request is not authorized.' });
  }
};

module.exports = requireAuth