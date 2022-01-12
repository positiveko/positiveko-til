# Iterable 이터러블

## 이터러블?

ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments, TypedArray 등이 있다.

이터러블은 Well-known Symboldls Symbol.iterator를 키로 갖는 메서드를 가지며, Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있다.

만약 빌트인 이터러블이 아니라 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다.
즉, ECMAScript 사양에 규정되어 있는 대로 Well-known Symbol인 Symbol.iterator를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 된다.

> Well-known Symbol? <br/> 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-known Symbol이라고 한다. 이 Well-known Symbol은 자바스크립트 엔진의 내부 알고리즘에 사용된다.