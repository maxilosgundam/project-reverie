const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//login user
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log('user is ', user);

        if(user === null){
          console.log('Email not registered. Please sign up.');
          return res.status(400).json({ message: 'Email not registered. Please sign up.' });
          
        }
        if (user && !(await user.comparePassword(password))) {
          console.log('Please enter the correct password.');
          return res.status(400).json({ message: 'Please enter the correct password.' });
        }
        

        const token = generateToken(user.id);
        res.json({ token, account: { id: user.id, username: user.username, email: user.email } });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      };
}

//signup user
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
          return res.status(400).json({ message: 'Email is not valid' });
        }

        if (username.length < 3) {
          return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
          if (existingUser.email === email) {
            return res.status(400).json({ message: 'Email is already registered' });
          } if(existingUser.username === username) {
            return res.status(400).json({ message: 'Username is already taken' });
          } 
          
          
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user.id);
        res.json({ token, account: { id: user.id, username: user.username, email: user.email } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}


//authenticate user, possibly outdated
const authenticateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

module.exports = {signupUser, signinUser, authenticateUser}
