const app = require('./config/server.js');


//Principal
require('./app/routes/principal.js')(app);


//Admin
require('./app/routes/admin/loginAdmin.js')(app);

app.use('/admin',require('./app/routes/admin/sessionAdmin.js'))
app.use('/admin',require('./app/routes/admin/routerAdmin.js'));


app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
} );
