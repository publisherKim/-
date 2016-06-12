이전 : https://github.com/zidell/node-study/blob/master/week-03.md

#저번시간 복습
내장모듈 불러오고 서버 띄우는거 했음. ~~2주만에 봐서 기억이 잘 안 난다~~

#이번주 내용
npm 과 ejs템플릿 엔진 사용방법을 배워본다.

## 작업을 위한 기초 진행
아래의 명령을 통해서 현재의 폴더에 `packages.json`을 실행한다.
```
$ npm init
```
나중에 `package.json`에서도 수정해줘도 되므로 그냥 다 엔터키를 눌러서 넘어간다.


##ejs설치
링크 : https://www.npmjs.com/package/ejs

설치 명령은 아래와 같이 진행한다.
```
$ npm install ejs --save
```
뒤에 `--save` 옵션을 준 것은 현재의 하위 폴더 `node_modules`에 자동으로 설치되고, `packages.json`에도 추가된다.
>추후에 클라이언트에서는 angular나 react등을 쓰게 되면 ejs같은 템플릿 엔진은 별로 쓸 일이 없을 것 같다는 생각. 하지만 서버렌더링에서도 좋을 듯.


-----
여기서부터는 다시 정우님 강의
-----

#jade
- 들여쓰기 방법을 통해서 태그를 열고닫고(DOM구조)를 자동생성해준다.
- express 제작자가 만듦

링크 : https://github.com/pugjs/pug

```
$ npm install pug --save
```

참고한 링크 : http://webapplog.com/jade/
그리고 기존의 `server.js`파일을 불러와서 아래와 같이 실행한다. 예제가 그지같아서 잘 안 되었다. ~~예제에서 locals와 merge는 갑자기 왜 튀어나오는지~~
```javascript
// server.js
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var pug = require('pug');

var server = http.createServer((req, res) => {

	var html = pug.renderFile('./example.pug', {
		title : 'Hello World',
		bodyTxt : '이것은 텍스트입니다.'
	});
	res.writeHead(200, {
		'Content-type' : 'text/html'
	});
	res.end(html);
});

server.listen(port, hostname, () => {
	console.log(`server running http://${hostname}:${port}`);
})
```
```
// example.pug
html
	head
		title= title
	body
		div= bodytxt
		div 이건 바로 입력한 텍스트
```
> 익숙해지면 정말 편할 것 같다는 생각. 하지만 간단한 거 말고 복잡한 DOM구조에서는 쓸 일이 있을지 의문. ~~react나 angular만 향해 달린다~~

## nodemon
수정사항이 발생할 때마다 매번 노드서버 껐다켰다하기 짜증나니까 설치.
```
$ npm install nodemon -g
$ nodemon server.js
```

## esj와 pug의 차이점
> 아직 잘 이해가 안 됨ㅎ pug(jade)는 서버측에서 템플릿에 값까지 모두 치환해줘서 보내주는 것은 이해함. 근데 ejs는 서버측에서 최종 string을 템플릿 코드 그 자체를 넣어서 보내준다는 것인지, 서버측에선 관련 템플릿과 값을 보내주고 클라이언트에서 작업이 되는 것인가?음.. ~~아몰랑~~
