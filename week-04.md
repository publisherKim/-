이전 : https://github.com/zidell/node-study/blob/master/week-03.md

#저번시간 복습
내장모듈 불러오고 서버 띄우는거 했음.

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
