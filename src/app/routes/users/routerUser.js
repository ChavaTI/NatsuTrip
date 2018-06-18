const express = require('express');
const dbConnection = require('../../../config/dbConnection');

const router = express.Router();

const conn = dbConnection();

router.post('/',(req,res)=>{
    var email = req.body.email;
    var pass = req.body.pass;

    console.log(email);
    console.log(pass);
});

module.exports = router;