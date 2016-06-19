이전 : https://github.com/zidell/node-study/blob/master/week-04.md

#DB를 사용해보자!

데이터를 저장하는 방법
- 쿠키 : 클라이언트에 저장
- 세션 : 서버에 저장
- DB : DB서버에 저장

#Mysql
##준비작업
링크 : http://www.sequelpro.com/ 맥용 Mysql 접속 프로그램. 심플하고 좋음.

먼저 주어진 mysql 접속정보를 토대로, mysql client를 이용하여 접속을 한다. 테이블 주소는 아래와 같이 생성했다.
```mysql
CREATE TABLE `user` (
  `user_no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `gender` enum('male','female') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'male',
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
INSERT INTO `user` (`user_no`, `name`, `gender`) VALUES (1, 'test', 'male');

```

##node에서 접속
왠지 노드는 nosql과 궁합이 잘 맞을 것 같은 편견이 있었는데, 노드쪽도 mysql과 매칭이 잘 되나부다(실제 프로젝트에서도 잘 쓰고는 있었지만)..

```
$ npm init
$ npm i mysql --save
```

##쿼리 날려보기
자 실행해보자..

```javascript
// mysql.js
const mysql = require('mysql');
const client = mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : '****',
	database : 'nodestudy'
});
client.connect();

var result = client.query('SELECT * FROM user', (error, rows) => { // 비동기 개짱남!ㅎㅎ
	console.log("error", error);
	console.log("rows", rows);
});
client.end();
```
위 코드는 사용자 요청 없이 실행하는 즉시 콘솔이 바로 찍힌다.

```
$ node mysql.js
error null
rows [ RowDataPacket { user_no: 1, name: 'test', gender: 'male' } ]
```

##추가 쿼리를 해보자
```javascript
// mysql-insert.js
var query;
query = client.query('INSERT INTO USER SET ?', {
	name : '홍구테스트',
	gender : 'male'
}, (error, rows) => {
	console.log("error", error);
	console.log("rows", rows); // INSERT할 때에는 쿼리에 대한 결과상태 객체를 반환한다. rows.insertId 라든가...
});
```
