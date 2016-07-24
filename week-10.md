이전 : https://github.com/zidell/node-study/blob/master/week-08.md (09는 생략)


#미들웨어와 모듈의 차이?
미들웨어는 라이브러리다. 모듈은 함수라 보면 된다.

#미들웨어를 써보자
## 일단 간단한 라우팅..
express의 라우팅은 두번째 파라미터로 콜백함수를 지정하고 파라미터로는 `req`, `res`, `next`를 받도록 하면 된다(아마도 변경가능)
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
app.use(myLogger); // 방금 생성한 함수를 미들웨어로 쓴다고 말해준다. 전역적으로 설정된다.

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

#CRUD 만들기
개인적으로 마크업과 멀어지는 jade(pug)은 선호하지 않으므로, 마크업이 보존된 상태로 작업할 수 있는 핸들바를 깔아본다.
참고 : https://github.com/ericf/express-handlebars
※ 위 문서에 따라 기본적인 `views` 폴더와 `views/home.handlebars`와 `views/layouts/main.handlebars`를 생성해야한다.
```
$ npm install express-handlebars
```
##form 만들기
위에 나온 메뉴얼대로 기본적인 views 폴더에 관한 설정을 마쳤다고 가정하고,
```html
<!-- views/form.handlebars -->
<form action="/form_receiver" method="post">
	<input type="text" name="name" placeholder="name" />
	<br/>
	<textarea name="message" placeholder="message"></textarea>
	<br/>
	<button type="submit">Submit</button>
</form>
```
이제 전송을 해보고, 받는 방법을 해보자.
```javascript
app.post('/form_receiver', function(req, res){
	console.log("req.body", req.body);
})
```
이렇게 하면 req.body에 아무거도 찍히지 않는다. 그래서 bodyParser 미들웨어를 설치하여 post로 들어온 폼 변수들에 접근할 수 있도록 한다.
참고 : https://github.com/expressjs/body-parser
```
$ npm install body-parser
```
```javascript
// crud.js (full source)
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser'); // 이번에 설치한 bodyParser를 불러들이고
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // POST로 들어오면 url_encode가 되나부다(불확실)

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('form');
});
app.post('/form_receiver', [urlencodedParser], function(req, res){ // 받는 쪽 라우트에서 들어온 정보를 파싱할 수 있는 미들웨어를 연결해준다. 미들웨어가 하나인 경우에는 배열로 전달하지 않아도 되는 듯하지만 통일성을 위해..
	console.log("req.body", req.body);
})

app.listen(3000);
```
이렇게 하는 경우에 `req.body`에서 `req.body.name`과 `req.body.mesnsage`를 받을 수 있게 된다.
```javascript	
req.body { 
	name: 'Test Name', 
	message: 'Test Message' 
}
```
