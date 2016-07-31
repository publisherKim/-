var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var fs = require('fs');

var server = http.createServer((req, res) => {
	var data = fs.readFileSync('./test.png');
	res.writeHead(200, {'Content-type':'image/png'});
	res.end(data);
});

server.listen(port, hostname, () => {
	console.log(`server running http://${hostname}:${port}`);
})