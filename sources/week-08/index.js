var express = require('express');
var app = express();

const ip = '127.0.0.1';
const port = '3000';

app.locals.pretty = true;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.send(`
    <html>
        <body>
            <h1>Hello NodeJS</h1>
        </body>
    </html>
    `);
})
app.listen(port, function(){
    console.log(`Example app listening on port ${port}`);
});