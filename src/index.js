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
require('./app/routes/users/loginUser.js')(app);
app.use('/user',require('./app/routes/users/sessionUser.js'));
app.use('/user',require('./app/routes/users/routerUser.js'));



app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
} );
