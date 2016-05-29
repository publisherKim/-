#지난주 복습
- 노드의 장점 : 비동기(코드작성상 장단점-Meteor상에서 Meteor.wrapAsync로 극복, Express의 경우에는 async/wait 혹은 promise/then으로 하는 것으로 알고 있음)
- 노드의 단점 : 싱글쓰레드(클러스터링 등을 통해서 극복 가능), IaaS를 이용하는경우에는 인프라단에서 로드 밸런싱을 자동으로 해줌.

#Export/Require(Import)
실제 코드를 작성하다보면 자주 사용하는 것들을 모듈화시킬 일이 많은데, 그때 쓰는 것이다.
```
export aaa = () => {
  return 'result aaa';
}
```

## 함수르

※ 주의사항

