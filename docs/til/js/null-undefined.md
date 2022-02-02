# null과 undefined 차이

먼저 이 둘은 JavaScript의 원시타입이다.

```js
let age; // age is undefined
let age = null; // age is null
```

## undefined

age라는 변수를 선언하고 정의하지 않는다면 **메모리 주소를 할당하지 않은 상태이므로 undefined가 된다.**

```js
let age;
console.log(age); // undefined
```

따라서 undefined는 개발자가 의도적으로 할당하기 위한 값이 아니라 **자바스크립트 엔진이 변수를 초기화할 때 사용하는 값**이다. 따라서 변수를 참조했을 때 undefined가 출력된다면 참조한 변수가 선언된 이후에 값이 할당되지 않은, 즉 초기화되지 않은 변수라는 것을 알 수 있다.

따라서 자바스크립트 엔진이 변수를 초기화하는 데 사용하는 undefined를 개발자가 의도적으로 변수에 할당하게 된다면 원래의 undefined 취지와 맞지 않기 때문에 사용이 권장되지 않는다.

## null
이럴 때 변수에 값이 없다는 것을 명시하고 싶을 때 쓰는 것이 null이다.

프로그래밍 언어에서 **null은 변수에 값이 없다는 것을 의도적으로 명시할 때 사용**한다. 변수에 null을 할당하는 것은 변수가 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미도 된다. 이전에 할당되어 있던 값에 대한 참조를 명시적으로 제거하는 것이기 때문에, 자바스크립트 엔진은 누구도 참조하지 않는 메모리 공간에 대해 가비지 콜렉션을 수행할 수 있다.

### undefined와 null의 타입
![type](https://pbs.twimg.com/media/FKkbRPSagAAo-iB?format=jpg&name=large)

참고로 둘의 타입을 콘솔에서 살펴보면 undefined은 그 자체로 타입이지만, null은 객체라는 사실을 알 수 있다. 

왜 원시타입인 null의 타입이 object로 나올까? 찾아보면 이는 자바스크립트 초기 버전에서부터 이어져온 버그라고 한다. 따라서 null을 분류할 때에는 typeof를 사용하지 않고 === 연산자를 활용하여 null을 검사해야 한다.
