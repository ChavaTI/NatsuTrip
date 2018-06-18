module.exports = (req,res,next) => {

    if(!req.session.idUsuario && req.method == 'GET'){
        res.redirect('/login');
        console.log('redireccion');
    }else{
        next();
    }

}