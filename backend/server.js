require('dotenv').config();

const portNumber = process.env.PORT;
const mongoDBData = process.env.MONGODB_URI;

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const worldRoutes = require('./routes/world');

//express app
const app = express();

//cors
app.use(cors());

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/world', worldRoutes);


//connect to db
mongoose.connect(mongoDBData)
    .then(() => {
        //listen for requests
    app.listen(portNumber, () => {
    console.log('Connected to db. \nListening on port ', portNumber, '!');
})
        // console.log('connected to db')
    })
    .catch((error) => {
        console.log(error)
    })
