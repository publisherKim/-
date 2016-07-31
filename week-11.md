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
![](imgs/express.png)