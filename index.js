// import dependecies
const express = require('express');
const app = express();
const dotenv = require('dotenv');

// import routes
const usersDataRouter = require('./routes/users_data_router');

// configure dotenv
dotenv.config();

// define port
const port = process.env.PORT || 3000;

// use express.json() to parse requests
app.use(express.json());

// use routes
app.use('/users', usersDataRouter);

// listen on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});