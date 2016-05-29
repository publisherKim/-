#지난주 복습
- 노드의 장점 : 비동기(코드작성상 장단점-Meteor상에서 Meteor.wrapAsync로 극복, Express의 경우에는 async/wait 혹은 promise/then으로 하는 것으로 알고 있음)
- 노드의 단점 : 싱글쓰레드(클러스터링 등을 통해서 극복 가능), IaaS를 이용하는경우에는 인프라단에서 로드 밸런싱을 자동으로 해줌.

#Export/Require(Import)
실제 코드를 작성하다보면 자주 사용하는 것들을 모듈화시킬 일이 많은데, 그때 쓰는 것이다.
```
// ES5
export aa = function(){
  return 'result 'aaa';
}
// ES6
export aaa = () => {
  return 'result aaa';
}
```

## 모듈 불러와서 대입시
```
examModule = require('./module002.js');
rts.exam003 = examModule.func001(); // 이와 같은 경우에 오류가 발생됨, 단순하게 함수자체를 rts.exam003에 대입할 때에는 변수처럼 하여야함. 왜냐면 맨 뒤에 ()를 붙이면 함수 자체가 가지 않고 실행된 그 결과를 대입하기 때문인 듯
rts.exam004 = examModule.func002; // func002는 변수이기 때문에 그냥 뭐..

## 변수의 호이스팅
자료를 조금 더 찾아봐야겠다. 자스의 컴파일과 관련이 있는 듯, 
