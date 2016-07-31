var io = require('fs');
var text = io.readFileSync('test.txt', 'utf-8');
console.log("text", text);