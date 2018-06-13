const express = require('express');
//const dbConnection = require('../../../config/dbConnection');

const router = express.Router();

//const conn = dbConnection();


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

router.get('/hoteles',(req,res) => {
    res.render('./admin/root/AdminHoteles')
});

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