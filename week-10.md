이전 : https://github.com/zidell/node-study/blob/master/week-08.md (09는 생략)


#미들웨어와 모듈의 차이?
미들웨어는 라이브러리다. 모듈은 함수라 보면 된다.

#미들웨어를 써보자
## 일단 간단한 라우팅..
express의 라우팅은 두번째 파라미터로 req, res, next를 받도록 하면 된다(아마도 변경가능)
```javascript
app.get('/user/:id', function(req, res, next){ // URI 설정시 `:변수명`으로 설정하면 콜백에서 req.params[`변수명`]으로 사용 가능
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

##미들웨어 해보기
미들웨어를 하나 만들어 보자. 단순한 함수처럼 만들어 놓고 use(미들웨어)를 하면 된다.
```javascript
var express = require('express');
var app = express();

var myLogger = function(req, res, next){ // myLogger라는 미들웨어를 정의
	console.log(`log : ${req.path}`); // 콘솔에 경로 찍음
	next(); // 다음으로 턴.. 이거 없으면 대기상태로 빠진다.
};
app.use(myLogger); // 방금 생성한 함수를 미들웨어로 쓴다고 말해준다.

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

##특정 라우트에만 미들웨어 적용하기
위에 있는 것은 전역적인 적용이고, 공식문서에 따르면 두번째 파라미터로 라우트이름을 지정한 배열을 전달하면, 해당 라우트에서만 활용한다.
```javascript
var express = require('express');
var app = express();

var myLogger = function(req, res, next){
	console.log(`log : ${req.path}`);
	next();
};

app.get('/', function(req, res){
	res.send('Hello World');
});
app.get('/user/:id', [myLogger], function(req, res, next){ // /user/:id에 대해서만 myLogger를 실행하도록 지정한다. 
	res.send(`user id is ${req.params.id}`);
})
app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});

```
