이전 : https://github.com/zidell/node-study/blob/master/week-07.md

이번시간에는 익스프레스(드디어 익스프레스)에 대해서 알아본다. 그런데 주말에 살짝 예습을 해보았더니 기존에 내가 썼던 프레임웍과는 다소 다른 느낌이다.
익스프레스를 기반으로 하더라도 결국은 손이 많이 가는.. 그런 놈인 듯 싶다.

#Express
설치는 간단하게 할 수 있다.
```
$ npm install express --save
```
근데 설치하고 나니까 MVC관련된 파일들도 없고 라우팅도 없고 걍 익스프레스만(?) 설치되어서 당황

#노가다 코드 작성
```javascript
var express = require('express');
var app = express();

const ip = '127.0.0.1';
const port = '3000';

app.locals.pretty = true;

app.use(express.static('public'));

app.get('/', function(req, res){
	res.send('Hello NodeJS');
})
app.get('/jw', function(req, res){

});
app.listen(port, function(){
	console.log(`Example app listening on port ${port}`);
});
```