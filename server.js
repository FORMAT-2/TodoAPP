const express = require('express');
const mongoose = require('mongoose')
const {errorHandler} = require('./utils/Error/globalErrorHandler');
const {logger} = require('./utils/Logger/logger')
require('dotenv').config()
const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log("connected with mongo");
})
app.use(express.json());
app.use(errorHandler);
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use('/' , require('./api/user/user.route'));
app.use('/' , require('./api/CRUD/crud.route'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});