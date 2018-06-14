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
                'faild' : 'error ocurred Base de datos paginacion'
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

router.get('/hoteles/Agregar/Nuevo',(req,res) => {
    res.render('./admin/root/AddHotel');
});

router.post('/hoteles/Agregar/Nuevo',(req,res) => {
    var nombreCadena = req.body.nombreCadena;
    var nombreHotel = req.body.nombreHotel;
    var calle = req.body.calle;
    var numero = req.body.numero;
    var estado = req.body.estado;
    var ciudad = req.body.ciudad;
    var estrellas = parseInt(req.body.estrellas);

    
    if (!req.files) return res.status(400).send('No files were uploaded.');

    var file = req.files.uploadImage;
    var img_name=file.name;

    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
        file.mv('/home/salvador/Natsutrip/src/app/public/imgUpload/'+file.name,(err) => {
            if(err) return res.status(500).send(err); 

            var sql = 'INSERT INTO hotel(idHotel, nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas, imagen_name) VALUES (NULL, ?, ?, ?, ?, ?, ?, ? ,?)';

            conn.query(sql,[nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas, '/public/imgUpload/'+file.name],(err,result,field) => {
                if(err) return res.status(500).send(err);
                console.log('add ' + result.affectedRows + ' rows');
                res.redirect('/root/hoteles/1');

            });
        });
    }else{
        res.render('./admin/root/AddHotel',{'mensaje':'No puede subir el archivo con este formato'});

    }
});



router.get('/hoteles/Editar/:idHotel/:nombreCadena/:nombreHotel/:calle/:numero/:estado/:ciudad/:estrellas/:imagen_name',(req,res) => {
    
    var idSplit = req.params.idHotel.split(':');
    var idHotel = parseInt(idSplit[1]);

    var nombreCadSplit = req.params.nombreCadena.split(':');
    var nombreCadena = nombreCadSplit[1];

    var nombreHotelSplit = req.params.nombreHotel.split(':');
    var nombreHotel = nombreHotelSplit[1];

    var calleSplit = req.params.calle.split(':');
    var calle = calleSplit[1];

    var numeroSplit = req.params.numero.split(':');
    var numero = parseInt(numeroSplit[1]);

    var estadoSplit = req.params.estado.split(':');
    var estado = estadoSplit[1];

    var ciudadSplit = req.params.ciudad.split(':');
    var ciudad = ciudadSplit[1];

    var estrellasSplit = req.params.estrellas.split(':');
    var estrellas = parseInt(estrellasSplit[1]);

    var imagen_nameSplit = req.params.imagen_name.split(':');
    var imagen_name = imagen_nameSplit[1];

    res.render('./admin/root/AddHotel',{
        idHotel,
        nombreCadena,
        nombreHotel,
        calle,
        numero,
        estado,
        ciudad,
        estrellas,
        imagen_name : '/public/imgUpload/'+ imagen_name
    });

});

router.get('/hoteles/Eliminar/:idHotel',(req,res) => {
    var idSplit = req.params.idHotel.split(':');
    var idHotel = parseInt(idSplit[1]);
    console.log(idHotel);
    var sql = 'DELETE FROM hotel WHERE idHotel = ? ;';

    conn.query(sql,[idHotel],(err,result,field) => {
        if(err){
            res.send({
                'code' : 400,
                'faild' : 'error ocurred Eliminar'
            });
        }else{
            console.log('deleted ' + result.affectedRows + ' rows');
            
            res.redirect('/root/hoteles/1');
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