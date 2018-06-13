
module.exports = app => {

    app.get('/loginAdmin', (req,res) => {
        res.render('./admin/login');
    });

}