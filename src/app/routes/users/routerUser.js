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
                req.session.nombre = result[0].nombre;
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

//--------------------------PRINCIPAL-------------------------------
router.get('/',(req,res)=>{
    res.render('./users/principal');
});

//-------------------------------------------------------------------
//---------------------BUSQUEDA PAQUETES--------------------------------------
router.post('/buscar',(req,res)=>{
    var lugar = req.body.buscar;
    if(lugar == 'NULL' || lugar == '' || lugar == ' '){
    
        var sql = 'select p.idPaquete, p.nombre, p.descripcion, h.imagen_name from (hotel h inner join (paquete p inner join aerolinea a on a.idAerolinea=p.idAerolinea) on p.idHotel=h.idHotel);';
        conn.query(sql,(err,result,field)=>{
            if(err) return res.status.send(err);

            res.render('./users/BusquedaPaquete',{
                result
            });
        });
    }else{
        var sql = 'select p.idPaquete, p.nombre, p.descripcion, h.imagen_name from (hotel h inner join (paquete p inner join aerolinea a on a.idAerolinea=p.idAerolinea) on p.idHotel=h.idHotel) where a.destino = ? ;';
        conn.query(sql,[lugar],(err,result,field)=>{
            if(err) return res.status.send(err);

            res.render('./users/BusquedaPaquete',{
                result
            });
        });
        
    }
    
});

router.get('/ConocerPaquete/:idPaquete',(req,res)=>{
    var idPaqueteSplit = req.params.idPaquete.split(':'); 
    var idPaquete = parseInt(idPaqueteSplit[1]);

    sql = 'select p.idPaquete, p.nombre as nombrePaquete, p.descripcion, p.estadia, p.total, h.idHotel, h.nombreCadena, h.nombreHotel, h.ciudad, h.estrellas,h.imagen_name as imagenHotel, hab.idHabitacion ,hab.capacidad,hab.tipo,hab.imagen_name as imagenHabitacion, a.idAerolinea, a.imagen_name as imagenAerolinea from habitacion hab inner join (hotel h inner join (paquete p inner join aerolinea a on a.idAerolinea=p.idAerolinea) on p.idHotel=h.idHotel) on hab.idHotel = h.idHotel where idPaquete= ? ;';
    conn.query(sql,[idPaquete],(err,result,field)=>{
        if(err) return res.status(500).send(err);
        console.log('Llego');
        res.render('./users/MuestraPaquete',{
            result
        });
        
    });
});

router.get('/ComprarPaquete/:idPaquete/:total/:nombrePaquete',(req,res)=>{
    var idPaqueteSplit = req.params.idPaquete.split(':');
    var idPaquete = parseInt(idPaqueteSplit[1]);

    var totalSplit = req.params.total.split(':');
    var total = parseFloat(totalSplit[1]);

    var nombrePaquete = req.params.nombrePaquete.split(':')[1];



    res.render('./users/ConfirmarCompra',{
        idPaquete,
        total,
        nombrePaquete
    });
});

router.post('/ConfirmarCompra/:idPaquete/:total/:nombrePaquete',(req,res)=>{
    var pass = req.body.pass;

    var idPaqueteSplit = req.params.idPaquete.split(':');
    var idPaquete = parseInt(idPaqueteSplit[1]);

    var totalSplit = req.params.total.split(':');
    var total = parseFloat(totalSplit[1]);

    if(req.session.pass == pass){
        
        var sql = 'INSERT INTO ventaPaquete(idVenta,idUsuario,idPaquete,fecha,costoTotal,estatusCompra) VALUES (NULL,?,?,?,?,?);';
        conn.query(sql,[req.session.idUsuario,idPaquete,new Date(),total,'ve'],(err,result,field)=>{
            if(err) res.status(500).send(err);

            console.log('insert '+result.affectedRows+' Rows table ventaPaquete ');

            res.redirect('/user');
        });

    }else{
        

        

        var nombrePaquete = req.params.nombrePaquete.split(':')[1];
        res.render('./users/ConfirmarCompra',{
            idPaquete,
            total,
            nombrePaquete,
            mensaje : 'Contraseña incorrecta'
        });
    }
});
//-------------------------------------------------------------------
//----------------------------USUARIO--------------------------------
router.get('/perfil',(req,res)=>{
    
    res.render('./users/perfil',{
       
        nombre : req.session.nombre,
        aPaterno: req.session.aPaterno,
        aMaterno: req.session.aMaterno,
        fNacimiento : req.session.fNacimiento,
        telefono: req.session.telefono,
        correo : req.session.correo,
        pass: req.session.pass,
        sexo : req.session.sexo,
        calle: req.session.calle,
        numero: req.session.numero,
        estado: req.session.estado,
        ciudad: req.session.ciudad,
        cp: req.session.cp,
        noTargD: req.session.noTargetaDebito,
        noTargC: req.session.noTargetaCredito ,
        CURP: req.session.CURP,
        imagen_name: req.session.imagen_name 
    });
});

router.get('/Editar',(req,res)=>{
   res.render('./users/editarPerfil',{
    nombre : req.session.nombre,
    aPaterno: req.session.aPaterno,
    aMaterno: req.session.aMaterno,
    fNacimiento : req.session.fNacimiento,
    telefono: req.session.telefono,
    correo : req.session.correo,
    pass: req.session.pass,
    sexo : req.session.sexo,
    calle: req.session.calle,
    numero: req.session.numero,
    estado: req.session.estado,
    ciudad: req.session.ciudad,
    cp: req.session.cp,
    noTargD: req.session.noTargetaDebito,
    noTargC: req.session.noTargetaCredito ,
    CURP: req.session.CURP,
    imagen_name: req.session.imagen_name 
   }); 
});

router.post('/EditarPerfil',(req,res)=>{
    var nombre = req.body.nombre;
    var aPaterno = req.body.aPaterno;
    var aMaterno = req.body.aMaterno;
    var fNacimiento = req.body.fNacimiento;
    var telefono = req.body.telefono;
    var correo = req.body.correo;
    var pass = req.body.pass;
    var sexo = req.body.sexo;
    var calle = req.body.calle;
    var numero = req.body.numero;
    var estado = req.body.estado;
    var ciudad = req.body.ciudad;
    var noTargD = req.body.noTargD;
    var noTargC = req.body.noTargC;
    var CURP = req.body.CURP;
    var cp = req.body.cp;

    
    if (!req.files) return res.status(400).send('No files were uploaded.');

    var file = req.files.uploadImage;
    var imagen_name = file.name;
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif"){
        file.mv('/home/salvador/Natsutrip/src/app/public/imgUpload/'+file.name,(err)=>{
            if(err) return res.status(500).send(err);
            var sql = 'UPDATE usuario SET nombre = ?, aPaterno = ?, aMaterno = ?, fNacimiento = ?, telefono = ?, correo = ?, pass = ?, sexo = ?,calle = ?, numero = ?, estado = ?, ciudad = ?, cp = ?, noTargetaDebito = ?, noTargetaCredito = ?, CURP = ?, imagen_name = ? where  idUsuario = ?;';

            conn.query(sql,[nombre,aPaterno,aMaterno,fNacimiento,telefono,correo,pass,sexo,calle,numero,estado,ciudad,cp,noTargD,noTargC,CURP,'/public/imgUpload/'+imagen_name,req.session.idUsuario],(e,r,f)=>{
                if(e) return res.status(500).send(e);
                req.session.nombre = nombre;
                req.session.aPaterno = aPaterno;
                req.session.aMaterno = aMaterno;
                req.session.fNacimiento = fNacimiento;
                req.session.telefono = telefono;
                req.session.correo = correo;
                req.session.pass = pass;
                req.session.sexo = sexo;
                req.session.calle = calle;
                req.session.numero = numero;
                req.session.estado = estado;
                req.session.ciudad = ciudad;
                req.session.cp = cp;
                req.session.noTargetaDebito = noTargD;
                req.session.noTargetaCredito = noTargC;
                req.session.CURP = CURP;
                req.session.imagen_name = '/public/imgUpload/'+file.name;
                console.log('update '+r.affectedRows+' rows table usuarios');
                res.redirect('/user/perfil');
            });

        });
    }else{

    }

    

    
});

router.get('/paquetes',(req,res)=>{
    var sql = 'select p.idPaquete, p.nombre as nombrePaquete, p.descripcion, p.estadia, p.total, h.idHotel, h.nombreCadena, h.nombreHotel, h.ciudad, h.estrellas,h.imagen_name as imagenHotel, hab.idHabitacion ,hab.capacidad,hab.tipo,hab.imagen_name as imagenHabitacion, a.idAerolinea, a.imagen_name as imagenAerolinea from ventaPaquete vp inner join (habitacion hab inner join (hotel h inner join (paquete p inner join aerolinea a on a.idAerolinea=p.idAerolinea) on p.idHotel=h.idHotel) on hab.idHotel = h.idHotel) on p.idPaquete = vp.idPaquete where idUsuario=? ;';
    conn.query(sql,[req.session.idUsuario],(err,result,field)=>{
        if(err) return res.status(404).send(err);
        res.render('./users/paquetes',{
            result
        });
    });
});

router.get('/ConocerPaqueteVendido/:idPaquete',(req,res)=>{
    var idPaqueteSplit = req.params.idPaquete.split(':'); 
    var idPaquete = parseInt(idPaqueteSplit[1]);

    sql = 'select p.idPaquete, p.nombre as nombrePaquete, p.descripcion, p.estadia, p.total, h.idHotel, h.nombreCadena, h.nombreHotel, h.ciudad, h.estrellas,h.imagen_name as imagenHotel, hab.idHabitacion ,hab.capacidad,hab.tipo,hab.imagen_name as imagenHabitacion, a.idAerolinea, a.imagen_name as imagenAerolinea from habitacion hab inner join (hotel h inner join (paquete p inner join aerolinea a on a.idAerolinea=p.idAerolinea) on p.idHotel=h.idHotel) on hab.idHotel = h.idHotel where idPaquete= ? ;';
    conn.query(sql,[idPaquete],(err,result,field)=>{
        if(err) return res.status(500).send(err);
        console.log('Llego');
        res.render('./users/MuestraPaqueteVendido',{
            result
        });
        
    });
});
//---------------------------------------------------------------------
// ------------------------------LOGOUT------------------------------
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});

//---------------------------------------------------------------------
module.exports = router;