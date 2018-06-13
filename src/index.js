const app = require('./config/server.js');


//Principal
require('./app/routes/principal.js')(app);


//Admin
require('./app/routes/admin/loginAdmin.js')(app);
app.use('/admin',require('./app/routes/admin/sessionAdmin.js'))
app.use('/admin',require('./app/routes/admin/routerAdmin.js'));


//Root

app.use('/root',require('./app/routes/admin/sessionAdmin.js'))
app.use('/root',require('./app/routes/admin/routerRoot.js'));


//Users




app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
} );
