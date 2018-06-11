const mysql = require('mysql');


module.exports = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'b.Nc4Cjvt',
    database: 'natsutrip'
  });
}
