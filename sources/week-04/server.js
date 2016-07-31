var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var pug = require('pug');

var server = http.createServer((req, res) => {

	var html = pug.renderFile('./example.pug', {
		title : 'Hello World',
		bodytxt : '바디텍스트!!!.'
	});
	res.writeHead(200, {
		'Content-type' : 'text/html'
	});
	res.end(html);
});

server.listen(port, hostname, () => {
	console.log(`server running http://${hostname}:${port}`);
})