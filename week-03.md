이전 : https://github.com/zidell/node-study/blob/master/week-02.md

##지난주 복습
- 노드의 장점 : 비동기(코드작성상 장단점-Meteor상에서 Meteor.wrapAsync로 극복, 보통은 경우에는 async/wait(ES7) 혹은 promise/then으로 하는 것으로 알고 있음, ~~걍 런타임에서 알아서 해주면 안되나~~)
- 노드의 단점 : 싱글쓰레드(클러스터링 등을 통해서 극복 가능), IaaS를 이용하는경우에는 인프라단에서 로드 밸런싱을 자동으로 해줌(~~걍 런타임에서 자동으로 해주면 안되나~~)

##export/require
단일 모듈을 하나쯤은 이제 쉽다.
```javascript
// ES6
export.aaa = () => {
  return 'result aaa';
}
```

## 모듈 불러와서 활용
```javascript
examModule = require('./module002.js');
rts.exam003 = examModule.func001(); // 이와 같은 경우에 오류가 발생됨, 단순하게 함수자체를 rts.exam003에 대입할 때에는 변수처럼 하여야함. 왜냐면 맨 뒤에 ()를 붙이면 함수 자체가 가지 않고 실행된 그 결과를 대입하기 때문인 듯
rts.exam004 = examModule.func002; // func002는 변수이기 때문에 그냥 뭐..
```

##모듈안에 이벤트 넣고 불러오기
활용목적이 다소 의아하지만 어쨌든 아래와 같이 해서 동작하는 것을 만들었다. 실제 프로젝트에서는 EventEmitter를 직접 작성할 일은 별로 없을 것 같고, 외부 모듈 만드는 외국의 똑똑한 놈들이 많이 사용하고 나는 그것을 이용하는 일만 많을 것 같다.
```javascript
// event2.js
var m = new process.EventEmitter();
m.on('a', () => {
	for(var i=0;i<3;i++){
		console.log(i);
	}
});
m.on('b', () => {
	console.log('나는 b다');
});
exports.m = m;
```
```
$ node
> var test = require('./event2.js');
> test.m.emit('a');
0
1
2
true
```

## 변수의 호이스팅
호이스팅이라는 것은 많이 들어봤는데 먼가 기초적인 개념이었다. ~~여태까지 이것도 모르고 상용 서비스를 만들었다~~. 쉽게 생각해서 변수나 함수들이 작성되는 줄(실행되는 시점)에서 할당되는 것이 아니라 자바스크립트 엔진이 다 끌어모아서 먼저 값을 선언해주는 개념인 것 같다. 변수 우선이냐 함수 우선이냐는 걍 겹치는 이름 안쓰면 문제될 일은 없을 것 같고, 변수는 미리 끌어올려져서 선언되거나 말거나 어차피 값이 부여되기 전까지는 undefined나 크게 신경쓸 필요는 없을 것 같다. 어차피 ES6로 작성하다보면 var보다는 let이나 const를 더 쓰게 될 테이니 자연스럽게 어느정도 해결되지 않을까..
* http://chanlee.github.io/2013/12/10/javascript-variable-scope-and-hoisting/
* http://mohwaproject.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85

## process.on(....
지난시간에 했었는데, 관련하여 정우님께 질문을 했다. 문서에 있는 것으로보아 `exit`나 `connection`, `caughtException` 등으로 사전정의되어 있는 몇 가지 이벤트가 있는 것들은 자동으로 해당 상황에서 트리거되는 느낌이다. 보다 자세한 것은 더 공부를 해봐야할 것 같다. ~~아마 안 할 것 같다~~

## 서버실행하기
오늘은 간단한 서버를 실행해보았다. 항상 node.js의 예제로 시작하는 것들인데, 어차피 `express.js`나 `meteor.js` 와 같은 프레임웍을 사용하는 나같은 사람은 개념만 이해하는 정도로 알아두면 좋을 것 같다.
```javascript
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer((req, res) => {
	res.end('Hello World');
});

server.listen(port, hostname, () => {
	console.log(`server running http://${hostname}:${port}`); // ES6에서 추가된 문법, 간단한 스트링 템플릿. 줄바꿈도 할 수 있어서 굉장히 유용하다.
})
```

##이미지 출력하기
서버가 실행되었을 때 로컬에 있는 이미지를 불러들여서 출력해준다. 바이너리 파일을 이렇게 왔다갔다 하는 방법은 비효율적이지만 인증 기능이 들어간다면 꼭 사용을 해야겠지? 
```javascript
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var fs = require('fs');

var server = http.createServer((req, res) => {
	var data = fs.readFileSync('./test.png'); // 역시 내가 좋아하는 비동기식 함수 호출법
	res.writeHead(200, {'Content-type':'image/png'}); // Content-Type인지 content-type인지 contentType인지 계속 헷갈림;; 복붙이 짱이다.
	res.end(data);
});

server.listen(port, hostname, () => {
	console.log(`server running http://${hostname}:${port}`);
})
```
