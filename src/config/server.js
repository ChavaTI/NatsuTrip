const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();

// settings
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../app/views'));

// middlewares

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../app/public')));


module.exports = app;
