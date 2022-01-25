# 자바스크립트의 가비지 컬렉팅

거의 모든 프로그래밍 언어의 메모라 라이프 사이클은 '할당-사용-헤제' 순으로 이뤄진다.
이때 자바스크립트는 고차원 언어이기 때문에 할당과 해제가 암묵적으로 이뤄진다.

가비지 컬렉팅 전략으로 2가지를 꼽을 수 있는데,

1. 참조 카운팅
2. 마크 앤 스위프 알고리즘이다.

## 참조 카운팅
`참조 카운팅` 방식은 변수를 선언하고 값이 할당되면 메모리 슬롯에 참조 카운트를 +1씩 증가시킨다.
다른 변수가 같은 값을 참조하면 카운트는 2가 되는 식이다. 그리고 다른 값을 할당하게 되면 -1이 된다.
이렇게 결과적으로 참조 카운트가 0이 되는 값을 가비지 컬렉팅하는 방식이다.
하지만 **순환 참조**(객체끼리 참조가 맞물리는 현상)가 있을 경우에 GC가 되지 않는 문제가 있다.

```js
var bar = {
  name: 'bar',
};
var bar = 'foo';

function func() {
  var bar = {};
  var foo = {};
  bar.name = foo;
  foo.name = bar;

  return true;
}
func();
```

## 마크 앤 스위프
따라서 대부분의 최신 브라우저에서는 `마크 앤 스위프 알고리즘`을 사용한다.
이 알고리즘은 자바스크립트의 최상위 객체인 Root라는 객체(window 혹은 global)에서 접근할 수 없는 변수를 GC하는 방식이다.
먼저 컨텍스트 안에서 변수가 사용될 것으로 정의된 모든 변수에 마크를 남기고, Root에서 시작해서 컨텍스트 내에 있는 변수와 참조되고 있는 변수의 마크를 지운다.
결과적으로 마크가 지워지지 않은 변수를 가비지 컬렉팅하는 방식이다.
하지만 이 알고리즘도 다음과 같은 상황에서는 GC가 되지 않는다.

```js
function f() {
  const o = {};
  const o2 = {};
  o.a = o2;
  o2.a = o;

  return function() {
    console.log(o);
    console.log(o2);
  };
}

const a = f();
a(); // f() 함수가 함수를 반환하면서 반환된 함수가 o, o2에 접근할 수 있기 때문
```

```js
function f() {
  const o = {};
  const o2 = {};
  o.a = o2;
  o2.a = o;

  return function() {
    console.log('yes');
  };
}

const a = f();
a(); // 콜백이 o, o2를 참조하진 않지만 스코프 체이닝으로 여전히 접근 가능한 상태이기 때문
```

⚠️ 따라서 GC가 되지 않는 상황을 고려해 메모리 누수를 방지해야 한다.

## 메모리 누수 방지하기
### 1. 의도치 않은 전역 변수 생성 막기
   전역 변수로 생성된 변수는 사용되지 않더라도 GC되지 않고 불필요한 메모리로 남게될 뿐만 아니라 예기치 못한 오류를 야기할 수 있다.
   자바스크립트는 미리 선언되지 않고 사용하는 변수를 전역 변수로 처리하므로 let, const를 활용하여 변수를 선언한다.

```js
function() {
	foo = "positiveko";
}
// 아래와 동일

function() {
	window.foo = "positiveko";
}

function () {
	this.bar = "potential accidental global";
}
foo(); // 다른 함수 내에 있지 않은 foo를 호출하면 this는 글로벌 객체(window)를 가리킴
console.log(window.bar); // "potential accidental global"
```

### 2. 잊혀진 타이머 혹은 콜백 함수 처리

```js
function timeHandler() {
	const serverData = loadData();
	setInterval(function() {
	    const renderer = document.getElementById('renderer');
	    if(renderer) {
	        renderer.innerHTML = JSON.stringify(serverData);
	    }
	}, 5000);
}

timeHandler();
```
위의 함수를 실행했을 때, 5초 마다 함수는 renderer에 serverData를 넣게 된다. 하지만 이 엘리먼트가 제거되거나 다른 것으로 대체되더라도 setInterval 함수는 계속 활성화되어 CPU를 낭비하게 된다.
다행히 최신 브라우저에서는 이러한 경우 마크 스위프 알고리즘으로 GC를 해주고는 있지만, 그래도 타이머 함수가 끝났을 때에는 명시적으로 제거하는 것이 좋다.

### 3. 클로저 확인
클로저는 처음 선언되었을 때의 렉시컬 스코프를 그대로 유지하는 함수다. 따라서 렉시컬 스코프 밖에서도 해당 범위에 접근할 수 있다.
따라서 변수를 은닉화하려는 용도로 만들어진 클로저가 아닌 이상, 클로저 사용은 주의해서 해야 한다.

### 4. DOM에서 벗어난 요소 참조
자식 노드를 참조하는 부모 엘리먼트를 DOM 조작으로 제거한 경우에도, 부모 엘리먼트를 삭제했다고 해서 자식 노드에 대한 참조가 GC되지 않고 메모리 누수가 발생한다.

```js
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};

function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}

function removeImage() {
    document.body.removeChild(document.getElementById('image'));
    // button 엘리먼트는 GC 대상에 포함되지 않음
}
```
따라서 DOM 엘리먼트에 접근해서 해당 엘리먼트를 참조 데이터에 저장하는 경우에, 사용이 끝났다면 참조를 해제해 주어야 한다.


