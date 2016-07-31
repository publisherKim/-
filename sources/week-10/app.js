var express = require('express');
var app = express();

var myLogger = function(req, res, next){
	console.log(`log : ${req.path}`);
	next();
};
app.get('/', function(req, res){
	res.send('Hello World');
});
app.get('/user/:id', [myLogger], function(req, res, next){
	res.send(`user id is ${req.params.id}`);
})
app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});
