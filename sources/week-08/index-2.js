var express = require('express');
var app = express();
var pug = require('pug');

const ip = '127.0.0.1';
const port = '3000';

app.locals.pretty = true;

app.use(express.static('public'));

app.get('/', function(req, res){
	var html = pug.renderFile('./example.pug', {
		title : 'Hello World',
		bodytxt : '바디텍스트!!!.'
	});
	res.send(html);
})
app.listen(port, function(){
	console.log('Example app listening on port '+port);
});