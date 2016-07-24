이전 : https://github.com/zidell/node-study/blob/master/week-08.md (09는 생략)


#미들웨어
라이브러리다. 

#모듈
함수라 보면 된다.

#라우팅에 관한 것
express의 라우팅은 두번째 파라미터로 req, res, next를 받도록 하면 된다(아마도 변경가능)
```javascript
app.get('/user/:id', function(req, res, next){
  console.log('req.params.id', req.params.id);
  next();
});
```

```javascript
// app.js (full source)
var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello World');
});
app.get('/user/:id', function(req, res, next){
	res.send(`user id is ${req.params.id}`);
})
app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});
```

미들웨어를 하나 만들어 보자. 단순한 함수처럼 만들어 놓고 use(미들웨어)를 하면 된다.
```javascript
var express = require('express');
var app = express();

var myLogger = function(req, res, next){
	console.log(`log : ${req.path}`);
};
app.use(myLogger);

app.get('/', function(req, res){
	res.send('Hello World');
});
app.get('/user/:id', function(req, res, next){
	res.send(`user id is ${req.params.id}`);
})
app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});
```
