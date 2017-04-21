//Main starting point of the application.

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); //instance of express
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://utk93:utk123@ds133450.mlab.com:33450/user-data');

//App Setup
//morgan is used for logs (debugging)
app.use(bodyParser.json({type:'*/*'}));
router(app);

//Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on :', port);
