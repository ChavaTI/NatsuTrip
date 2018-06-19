const express = require('express');
const dbConnection = require('../../../config/dbConnection');

const router = express.Router();

const conn = dbConnection();

router.post('/',(req,res)=>{
    var correo = req.body.email;
    var pass = req.body.pass;

    var sql = 'SELECT * FROM usuario WHERE correo = ? ;';
    conn.query(sql,[correo],(err,result,field)=>{
        if(err) return res.status(500).send(err);

        if(result.length > 0){
            if(result[0].pass == pass){
                // Crear Sesion
                req.session.idUsuario = result[0].idUsuario;
                req.session.aPaterno = result[0].aPaterno;
                req.session.aMaterno = result[0].aMaterno;
                req.session.fNacimiento = result[0].fNacimiento;
                req.session.telefono = result[0].telefono;
                req.session.correo = result[0].correo;
                req.session.pass = result[0].pass;
                req.session.sexo = result[0].sexo;
                req.session.calle = result[0].calle;
                req.session.numero = result[0].numero;
                req.session.estado = result[0].estado;
                req.session.ciudad = result[0].ciudad;
                req.session.cp = result[0].cp;
                req.session.noTargetaDebito = result[0].noTargetaDebito;
                req.session.noTargetaCredito = result[0].noTargetaCredito;
                req.session.CURP = result[0].CURP;
                req.session.imagen_name = result[0].imagen_name;
                res.redirect('/user');
            }else{
                // Contraseña no admitida
                res.render('./users/login',{
                    mensaje : 'La contraseña no coincide con el correo'
                });
            }
        }else{
            res.render('./users/login',{
                mensaje : 'No existe este correo registrado'
            });
        }
    });
});


router.get('/',(req,res)=>{
    res.render('./users/principal');
});



router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});
module.exports = router;