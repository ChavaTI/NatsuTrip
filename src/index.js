const app = require('./config/server.js');




app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
} );
