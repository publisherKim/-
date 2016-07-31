const mysql = require('mysql');
const client = mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : '',
	database : 'nodestudy'
});
client.connect();

var query;
query = client.query('UPDATE user SET gender=? WHERE name=?', [
    'female',
    '홍구테스트'
], (error, rows) => {
    console.log("error", error);
    console.log("rows", rows);
});
console.log(query.sql);

client.end();