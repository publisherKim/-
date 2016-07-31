이전 : https://github.com/zidell/node-study/blob/master/week-10.md

#express-generator
익스프레스를 쓸 때 권장할만한 기초적인 MVC가 들어가있는 거..
참고 : http://expressjs.com/en/starter/generator.html
```
$ npm install express-generator -g
```

#시작하기
간단하게 명령만 실행하면 기초적으로 필요한 것들이 설치된다. 설치 이후 `packages.json`에 정의된 모듈들이 설치되도록 `npm i`도 실행을 해준다. (윈도우의 경우에는 `set DEBUG=myapp:* & npm start`로 실행)
```
$ express testapp
$ npm i
$ DEBUG=myapp:* npm start
```

![localhost:3000으로 접속하면 잘 뜬다](imgs/express.png)

#몇 가지 안내(주석참고)
```javascript
// full app.js source
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index'); // 라우트파일 읽어오기
var users = require('./routes/users'); // 라우트파일 읽어오기

var app = express();

// view engine setup
// app.set은 앱에서 필요한 설정을 하는 것, 아래에 나오는 app.use는 미들웨어
app.set('views', path.join(__dirname, 'views')); // view 폴더럴 설정, 
app.set('view engine', 'jade'); // 엔진설정. 갠적으로 핸들바를 선호하지만 귀찮으니까 기본설정에 따라보자.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 이건 미들웨어를 설정해주는 것.
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app; // 모듈로 내보냄
```

#routes/index.js
```javascript
// routes/index.js source
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```