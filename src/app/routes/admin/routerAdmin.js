const express = require('express');
const dbConnection = require('../../../config/dbConnection');

const router = express.Router();

const conn = dbConnection();


router.get('/',(req,res) => {
    res.send('Hola admin');
});

router.post('/',(req,res) => {
   var email = req.body.email;
   var pass = req.body.pass;
    


   var sql = 'SELECT * FROM admin WHERE username = ?';
   
   conn.query(sql,[email], (error,result,filed) =>{
       if(error){
           res.send({
               'code' : 400,
               'failed' : 'error ocurred'
           });
       }else{
           if(result.length > 0){
                if(result[0].pass == pass){
                    res.send('Hola admin');
                }else{
                    res.render('./admin/login',{'mensaje' : 'La contraseña no coincide con el correo'});
                }
           }else{
            res.render('./admin/login',{'mensaje' : 'Correo no encotrado'});    
           }
       }

       
   });



    
});


module.exports = router;