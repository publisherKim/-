이전 : https://github.com/zidell/node-study/blob/master/week-06.md

DB 커넥션을 계속 한다. 지난주 이후로 기존의 노드서버(미티어)를 확인해보니 커넥션이 70여개가 붙어있었다(25개 정도는 미티어에서 기본으로 붙어 있는 거).
기존 PHP(Codeigniter)측에서는 아무리 많은 동시 요청을 처리해도 3~4개의 커넥션만 있어서 이거는 원래 관리하지 않아도 않아도 알아서 되나보다 했었는데ㅋㅋ

#Transaction
트랜젝션은 하나의 단위 업무에 대하여(이를테면 회원가입 등) 여러개의 쿼리가 수반되는 경우에 모든 쿼리가 완료되지 않으면 일부 성공한 쿼리도 없던것으로 처리하는.. 즉, 모든 작업의 무결성을 보장하기 위해서 필요하다.

- `connection.beginTransaction` : 시작
- `connection.rollback` : 실패했을 경우 롤백
- `connection.commit` : 성공한 경우 완료
