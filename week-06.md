이전 : https://github.com/zidell/node-study/blob/master/week-05.md

DB에 관한 복습
- `db.end`, `db.destroy` : DB 접속 종료

이번 시간에는 connection pool을 만들어서 작업을 진행해본다.

* DB 데이터 이용시 한글이 깨진다면, connection 만들 때 `charset : 'utf-8'`을 활성화해준다.

#connectionPool
연결 생성시  `createConnection` 대신에 `createPool`을 이용하고, `getConnection`을 통해서 접속? 접속과 종료에 따른 오버헤드를 방지하기 위하여, 어느정도 연결 상태를 가지고 있는 것? 기본적으로 `connection`은 동일한 사용자라도 매번 생성되고 없어지니까, `connectionPool`을 이용하여 동일 접속자에 한해서 지속적으로 연결을 관리하는 것 같음.

※ 쓰레드 : 한 프로세스의 생명주기 같은 거
※ 라운드로빈(?) : 싱글쓰레드 구조상 작업을 순차적으로 하지 않고, 짧은 이터레이션으로 각각의 작업들을 순차적으로 반복 진행하여 짧은 작업은 짧은작업대로 먼저 진행되도록 하는 것. 이렇게 함으로써 메모리에 다 들고 있지 않고 짧은 작업들은 완료하여 가볍게 할 수 있다.

참고링크 : http://opens.kr/83

```javascript
const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'ps',
	database : 'nodestudy'
});

pool.getConnection(function(err, connection) {
	var result = connection.query('SELECT * FROM user', (error, rows, fields) => {
		console.log("error", error);
		console.log("rows", rows);
	});
	connection.end();
});
```

근데 pool은 여기에서 종료가 필요 없는것인가? 노드처럼 이벤트 기반에서 하는거 보니까 다소 헷갈림. 공부를 좀 해야겠음.
