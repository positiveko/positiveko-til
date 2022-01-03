# Event capturing과 bubbling

이벤트 흐름 3가지

1. 캡처링
2. 타깃
3. 버블링

<img src='https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg' alt='event' />

[이미지 출처](https://www.w3.org/TR/DOM-Level-3-Events/)

이벤트 객체는 이벤트 타겟에 전송(dispatch)된다. 하지만 전달이 시작되기 이전에 이벤트 객체의 `propagation path`가 먼저 결정되어야 한다.

propagation path란 current event target들의 ordered list인데, document의 수직적인 트리 구조를 반영한다. 이 리스트의 마지막 요소는 event target이고, 바로 앞의 아이템은 해당 타깃의 부모다.

propagation path가 결정되고 나면 이벤트 객체는 3단계의 이벤트 흐름을 거친다. 이 흐름은 stopPropagation일 경우에 중단될 수 있다. 

## 이벤트 캡처링
이벤트가 하위 요소로 전파되는 단계. 
특정 이벤트가 발생했을 때 최상위 요소인 window 객체에서 해당 타깃의 부모까지 까지 찾아 내려간다. 

## 이벤트 타겟팅
이벤트가 실제 타깃 요소에 전달되는 단계. 
이벤트 객체가 이벤트 객체의 타깃에 도달하는 과정이다. 만약 이벤트 타입이 버블링되지 않는 유형이라면 이벤트 객체는 여기서 중지된다.

## 이벤트 버블링
이벤트가 상위 요소로 전파되는 단계. 
이벤트 객체가 타깃의 조상 방향으로 역순으로 전달되는 단계다. 최상위 객체인 window까지 전달된다. 



