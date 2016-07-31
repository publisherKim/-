const mysql = require('mysql');
const client = mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'ps',
	database : 'nodestudy'
});
client.connect();

var query;
query = client.query('INSERT INTO USER SET ?', {
	name : "홍구테스트",
	gender : 'male'
}, (error, rows) => {
	console.log("error", error);
	console.log("rows", rows.insertId);
});
console.log(query.sql);

client.end();