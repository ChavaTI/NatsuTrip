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
                    // Crear session
                    req.session.idAdmin = result[0].idAdmin; 
                    req.session.nombre = result[0].nombre;
                    req.session.aPaterno = result[0].aPaterno;
                    req.session.aMaterno = result[0].aMaterno;
                    req.session.username = result[0].username;
                    req.session.pass = result[0].pass;
                    req.session.tipo = result[0].tipo;
                    
                    if(req.session.tipo == 1){
                        res.redirect('/admin');
                    }else if(req.session.tipo == 2){
                        res.redirect('/root');
                    }
                    
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