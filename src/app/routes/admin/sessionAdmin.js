module.exports = (req,res,next) => {

    if(!req.session.idAdmin && req.method == 'GET'){
        res.redirect('/loginAdmin');
        console.log('redireccion');
    }else{
        next();
    }

}