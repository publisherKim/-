const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'ps',
	database : 'nodestudy'
});

pool.getConnection(function(err, connection) {
	var result = connection.query('SELECT * FROM user', (error, rows, fields) => {
		console.log("error", error);
		console.log("rows", rows);
	});
	connection.end();
});