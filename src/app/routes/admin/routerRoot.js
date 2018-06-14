const express = require('express');
const dbConnection = require('../../../config/dbConnection');

const router = express.Router();

const conn = dbConnection();


router.get('/',(req,res) => {
    res.render('./admin/root/principal',{
        'nombre' : req.session.nombre,
        'aPaterno' : req.session.aPaterno,
        'aMaterno' : req.session.aMaterno,
    });
});

router.get('/paquetes',(req,res) => {
    res.render('./admin/root/AdminPaquetes')
});


//------------------------Admiistracion de Hoteles-----------------------
router.get('/hoteles/:page',(req,res) => {
    let perPage = 10;
    let page = req.params.page || 1;

    var offset = (perPage * page) - perPage;
    var sql = 'SELECT * FROM hotel LIMIT 10 OFFSET ?';

    conn.query(sql,[offset],(err,result,fielt) => {
        if(err){
            res.send({
                'code' : 400,
                'faild' : 'error ocurred'
            });
        }else{
            if(result.length > 0){
                //Hay registros
                res.render('./admin/root/AdminHoteles',{
                    result,
                    current : page,
                    pages : Math.ceil(result.length / perPage)
                });
                
            }else{
                //No hay registros
                console.log('No hay registros');
                res.send({
                    code : 404
                })
            }
        }
    });

    
});



//-----------------------------------------------------
router.get('/aerolineas',(req,res) => {
    res.render('./admin/root/AdminAerolineas')
});

router.get('/ventas',(req,res) => {
    res.render('./admin/root/AdminVentas')
});

router.get('/aerolineas',(req,res) => {
    res.render('./admin/root/AdminAerolineas')
});

router.get('/empleados',(req,res) => {
    res.render('./admin/root/AdminEmpleados')
});

router.get('/quit',(req,res) => {
    req.session.destroy();
    res.redirect('/loginAdmin');
});


module.exports = router;