const mysql = require('mysql');
const client = mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'ps',
	database : 'nodestudy'
});
client.connect();

var result = client.query('SELECT * FROM user', (error, rows, fields) => {
	console.log("error", error);
	console.log("rows", rows);
});
client.end();