var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('form');
});
app.post('/form_receiver', [urlencodedParser], function(req, res){
	console.log("req.body", req.body);
})

app.listen(3000);