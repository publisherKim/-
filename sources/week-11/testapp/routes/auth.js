var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});
router.post('/login', function(req, res, next) {
	const mysql = require('mysql');
	const client = mysql.createConnection({
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : '',
		database : 'nodestudy'
	});
	client.connect();

	var result = client.query('SELECT * FROM users WHERE email=? and password=?', [req.body.email, req.body.password], (error, rows, fields) => {
		if(rows.length>1){
			res.send('login success');
		}else{
			res.send('login failed');
		}
	});
	client.end();
});

module.exports = router;
