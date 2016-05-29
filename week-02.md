##export/require?
사실 1년 전까지만 해도 모듈이 왜 필요한지는 몰랐다. 걍 `<script src...`로 필요한 스크립트 파일들을 무한으로 불러와서 각각의 전역변수에 있는 것들을 실행시키면 그만이었다. 모듈 같은 라이브러리를 만들 때에도 걍 아무도 안 쓸 것 같은 전역변수 아무거나 하나 잡아서 잘 집어넣으면 잘 작동되었다.

그러다가 `react.js`를 접하니까 컴포넌트들을 `export`하고, 그것을 또 사용하는 곳에서 `import`해보니 막상 신기하기도하고 유용하기도 해서 많이 쓰고는 있다. `require`를 써보지도 않고 바로 `import`를 써보니 이게 비슷하면서도 약간 다른? 다소 헷갈리는 부분은 있다.

##모듈 생성
어쨌든 무언가 하나 만들어본다. 간단하게 파라미터를 두개 받아서 그것을 더하고 반환하는, 그리고 계산시간을 측정하는 모듈이다.
```Javascript
// sum.js
exports.sum = function(a, b){
	if (a===undefined){
		return console.log('a is invalid');
	}
	if (b===undefined){
		return console.log('a is invalid');
	}
	console.time('s');
	var total = a + b;
	console.log("total", total);
	console.timeEnd('s');
}
```
```
> node
> var test = require('./sum.js');
> test.sum(1,10);
total 11
s: 1.734ms
undefined
```
모듈을 불러와서 test에 쳐박고, test.sum()을 통해서 해당 모듈의 메써드를 실행한다. 하핫. 
대충 생각해보기로는 각 .js가 일종의 독립된 namespace 역할을 하는 것 같다.

## Event Emitter
이거 다소 헷갈린다. 특정 작업에 대해서 이벤트를 바인딩(on)하고 트리거(emit)하는 것 같은데, 이게 어떤 측면에서 유용하게 쓰일런지는 아직 감이 잡히지 않는다.
```javascript
// emitexam.js
var test = new process.EventEmitter();
test.on('aaa', (b, c)=> {
	console.log('sun', b, c);
});
test.emit('aaa', 'baaa', 2234);
```
작동된다. 근데 어따 써먹지? 채팅같은거를 구현한다면 분명히 connection 발생, 메시지 수신, 전송완료 등에 갖다붙여서 작동들을 만들 수는 있을 것 같은데, 프론트야 그렇게 구현하는게 맞다지만 백엔드는 일종의 restful한 endpoint를 만들어서 그쪽으로 보내주고 response를 줘도되지 않는 생각은 든다. 이것들은 추후에 유용함을 체감해야만 알 것 같다.

## process
process 변수에 대한 정확한 역할은 모르겠다. 일단 생각하기로 하나의 유저 connection이 만들어지고 닫힐 때까지 전체적인 프로세스를 관리하는 객체인 듯한 느낌이 든다(자료찾기 귀찮아...) 일단 이놈에도 뭔가 이벤트를 넣을 수 있다.
```javascript
process.on('exit', () => {
	console.log('프로세스 끝났어');
});
```
REFL 모드에서 실행하면, 아무일도 일어나지 않다가 REFL모드가 종료될 때 `프로세스 끝났어`라는 메시지가 출력된다. 실제 나의 프로젝트에 쓸 때 각 모듈마다 DB연결하고 `exit`시 연결을 종료하도록 할 때 이놈을 유용하게 썼다. 개발시에 exception 에러를 만나면 정상적으로 저 이벤트가 트리거되지 않기에 그때는 `caughtException`에도 DB연결을 종료하는 놈을 달아둬서 해결하였다.
