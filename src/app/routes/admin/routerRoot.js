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
    var habCapacidad = parseInt(req.body.habCapacidad);
    var habCosto = parseFloat(req.body.habCosto);
    var habTipo = req.body.habTipo;

    console.log(req.body.idHabitacion);


    
    if (!req.files) return res.status(400).send('No files were uploaded.');

    var file = req.files.uploadImage;
    var img_name=file.name;

    var file2 = req.files.habUploadImage;
    var habImg_name = file2.name;
    //Agregar o Editar Hotel
    if((file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif") && (file2.mimetype == 'image/jpeg' || file2.mimetype == 'image/png' || file2.mimetype == 'image/gif')){
        file.mv('/home/salvador/Natsutrip/src/app/public/imgUpload/'+file.name,(err) => {
            if(err) return res.status(500).send(err); 

            
            if(req.body.bandera == 'Editar'){
                var sql = 'UPDATE hotel SET nombreCadena = ? ,nombreHotel = ?, calle = ? , numero = ? , estado= ? , ciudad = ? , estrellas = ? , imagen_name = ?  WHERE idHotel = ?;';
                
                conn.query(sql,[nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas, '/public/imgUpload/'+file.name, req.body.idHotel],(err,result,field) => {
                    if(err) return res.status(500).send(err);

                    console.log('update ' + result.affectedRows + ' rows table hotel');
                    // Editar Habitación
                    file2.mv('/home/salvador/Natsutrip/src/app/public/imgUpload/'+file2.name,(err2)=>{
                        if(err2) return res.status(500).send(err2);
                        
                        var sql2 = 'UPDATE habitacion  SET capacidad = ?, costo = ?, tipo = ? , imagen_name = ?  WHERE idHabitacion = ?;';
                        conn.query(sql2,[habCapacidad,habCosto,habTipo,'/public/imgUpload/'+file2.name,req.body.idHabitacion],(e,r,f)=>{
                            if(e) return res.status(500).send(e);
                            console.log('update '+r.affectedRows+ ' rows table habitacion');
                            res.redirect('/root/hoteles/1'); // Esto es lo que retorna
                        });
                    });
                    

                });

            }else{
                var sql = 'INSERT INTO hotel(idHotel, nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas, imagen_name) VALUES (NULL, ?, ?, ?, ?, ?, ?, ? ,?)';

                conn.query(sql,[nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas, '/public/imgUpload/'+file.name],(err,result,field) => {
                if(err) return res.status(500).send(err);
                console.log('add ' + result.affectedRows + ' rows table hotel');
                // Agregar Habitacion
                
                var sqlSelect = 'SELECT * FROM hotel WHERE nombreCadena = ? AND nombreHotel = ? AND calle = ? AND numero = ? AND estado = ? AND ciudad = ? AND estrellas = ? ;';

                conn.query(sqlSelect,[nombreCadena, nombreHotel, calle, numero, estado, ciudad, estrellas],(err3,result3,field3)=>{
                    if(err3) return res.status(500).send(err3);

                    console.log('ID habitacion de select '+ result3[0].idHotel);

                    console.log(result3[0].nombreCadena);

                    file2.mv('/home/salvador/Natsutrip/src/app/public/imgUpload/'+file2.name,(err2)=>{
                        if(err2) return res.status(500).send(err2);
                        
                        var sql2 = 'INSERT INTO habitacion(idHabitacion,capacidad,costo,tipo,idHotel,imagen_name) VALUES (NULL,?,?,?,?,?);';
                        conn.query(sql2,[habCapacidad,habCosto,habTipo,result3[0].idHotel,'/public/imgUpload/'+file2.name],(e,r,f)=>{
                            if(e) return res.status(500).send(e);
                            console.log('update '+r.affectedRows+ ' rows table habitacion');
                            res.redirect('/root/hoteles/1'); // Esto es lo que retorna agregar        
                        });
                    });


                });

                

                
                
            });
            }

            
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
    var imagen_nameHotel = imagen_nameSplit[1];

    var sql = 'SELECT * FROM habitacion WHERE idHotel = ?;';

    conn.query(sql,[idHotel],(err,result,field) => {

        if(err){
            return res.send('No se encontro la habitacion del hotel');
        }
        var idHabitacion = result[0].idHabitacion;
        var capacidad = result[0].capacidad;
        var costo = result[0].costo;
        var tipo = result[0].tipo;
        var imagen_nameHab = result[0].imagen_name;
    
        res.render('./admin/root/AddHotel',{
            idHotel,
            nombreCadena,
            nombreHotel,
            calle,
            numero,
            estado,
            ciudad,
            estrellas,
            imagen_nameHotel : '/public/imgUpload/'+ imagen_nameHotel,
            bandera : 'Editar',
            idHabitacion,
            capacidad,
            costo,
            tipo,
            imagen_nameHab : imagen_nameHab
        });
    });


});

router.get('/hoteles/Eliminar/:idHotel',(req,res) => {
    var idSplit = req.params.idHotel.split(':');
    var idHotel = parseInt(idSplit[1]);
    console.log(idHotel);


    var sqlSelect = 'SELECT * FROM habitacion WHERE idHotel = ?';

    conn.query(sqlSelect,[idHotel],(sErr,sResult,sField) => {
        if(sErr) res.status(500).send(sErr);
        // Borrar habitacion
        var sqlDeleteHab = 'DELETE FROM habitacion WHERE idHabitacion = ? ;';

        conn.query(sqlDeleteHab,[sResult[0].idHabitacion],(dhabErr,dhabResult,dhField)=>{
            if(dhabErr) res.status(500).send(dhabErr);
            console.log('deleted ' + dhabResult.affectedRows + ' rows Habitacion');

            //Borrar hotel

            var sql = 'DELETE FROM hotel WHERE idHotel = ? ;';
            conn.query(sql,[idHotel],(err,result,field) => {
                if(err){
                    res.send({
                        'code' : 400,
                        'faild' : 'error ocurred Eliminar',
                        err
                    });
                }else{
                    console.log('deleted ' + result.affectedRows + ' rows');
                    
                    res.redirect('/root/hoteles/1');
                }
            });

            

        });

    });



});


//-----------------------------------------------------------------------------------------------

//------------------------------AEROLINEAS--------------------------------------------------------
router.get('/aerolineas',(req,res) => {
    res.render('./admin/root/AdminAerolineas')
});

//--------------------------------------------------------------------------------------------------

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