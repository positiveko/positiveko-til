# 객체 지향 프로그래밍 Object Oriented Programming

> “OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things.”
>
> -Alan Kay, [Dr. Alan Kay on the Meaning of “Object-Oriented Programming”](http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en?utm_source=pocket_mylist)

객체 지향 프로그래밍이라는 용어를 처음으로 제시한 앨런 케이가 생각하는 OOP의 본질은,

1. 메시징
2. 캡슐화
3. 동적 바인딩이다.

즉, 관련있는 데이터와 프로시져를 찾아서 묶고 다른 객체가 내부를 건드리지 못하게 한다. (캡슐화) 다른 객체의 데이터나 프로시져가 필요할 때는 메시지를 요청한다. 메시지를 받는 객체는 스스로 처리 방법을 선택한다. (메시징) 메시지를 받는 객체는 그때 그때 달라질 수 있다. (동적 바인딩)

객체지향이란 객체에 필요한 것을 추상화시키고, 독립적인 객체들로 프로그램을 구현하는 프로그램 패러다임이다.
객체 지향에서 상속은 핵심적인 개념이다. 상속은 불필요한 중복을 제거해주는데, 자바스크립트에서 상속을 구현하기 위해서는 프로토타입 프로퍼티를 사용해야 한다.

## SOLID

> 컴퓨터 프로그래밍에서 SOLID란 로버트 마틴이 2000년대 초반에 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 마이클 페더스가 두문자어 기억술로 소개한 것이다.
>
> 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다. SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반적 전략의 일부다.

### 왜 SOLID 원칙이 필요한가?

코드를 끊임없이 변경하는 것은 개발자의 숙명과도 같다. 요구사항과 환경이 매번 변화하는 만큼 소프트웨어도 지속적으로 성장해야 한다.
코드를 변경하는 것은 결코 쉽지 않은 작업이지만 SOLID 원칙에 기반하여 프로그래밍을 한다면 **더 이해하기 쉽고 변경하기 쉬우며, 훨씬 더 좋은 구조를 가지고 롱런할 수 있는 코드가 될 것**이다.

## SRP (Single Responsibility Principle) : 단일 책임 원칙

> 객체는 오직 하나의 책임을 가져야 한다. (객체는 오직 하나의 변경 이유를 가져야 한다.)

클린코드에서는 1개의 함수는 1개의 역할만 수행해야 한다고 말한다. 그 이유는 함수가 한 가지 이상을 수행할 때 구성, 테스트 및 추론하기가 어렵기 때문이다. 하나의 책임을 맡게 작성한다면 쉽게 래팩터링할 수 있고 코드가 깔끔하게 읽힌다.

```ts
// Bad:

function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

```ts
// Good:

function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

위처럼 filter(), forEach(), map(), sort() 메서드의 매개함수로 쓰이는 것들은 함수로 쪼개어 주는 게 좋다.

[참고](https://github.com/labs42io/clean-code-typescript#functions-should-do-one-thing)

또한 함수를 순수함수로 작성하는 것 또한 중요하다.
순수함수란 부수효과가 없는 함수를 말한다. 함수의 실행에서 결과를 예상할 수 없는 가능성이 없는 경우, 순수함수라고 할 수 있다. 순수함수는 같은 인자를 넣었을 때 항상 같은 리턴 값을 반환하며, 함수 외부의 어떠한 값도 변경하지 않는다.

```js
// http 요청을 보내는 함수: 순수함수 될 수 없음
const getData = () => {
  axios.get('http://data.url')
  .then(...)
  .catch(...)
}

// 입력 내포한 함수: 순수함수 될 수 없음
const typeInput = () => {
  const input = prompt("Message");
  return input;
}

// 파라미터를 직접 변경하는 함수: 순수함수 될 수 없음
// 만약 매개 변수를 복사한 값을 변경해서 리턴한다면 순수함수가 될 수 있다.
const changeParams = (arr, elem) => {
  arr.push(elem);
  return arr;
}

```

[참고](https://maxkim-j.github.io/posts/js-pure-function)

## OCP (Open-Closed Principle) : 개방 폐쇄 원칙

> 모듈은 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.

새로운 기능의 추가가 필요할 때 기존 코드를 변경하지 않고도 확장 가능한 모듈을 만드는 것이다. 또한 내부 매커니즘이 변경이 되어야 할 때에는 외부의 코드 변화가 없어야 한다.

```js
Bad: function getMutipledArray(array, option) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (option === 'doubled') {
      result[i] = array[i] * 2; // 새로운 방식으로 만들기 위해서는 수정이 필요하다.
    }
    if (option === 'tripled') {
      result[i] = array[i] * 3; // 옵션으로 분기는 가능하나
    }
    if (option === 'half') {
      result[i] = array[i] / 2; // 새로운 기능을 추가하려면 함수 내에서 변경이 되어야 한다.
    }
  }
  return result;
}
```

```js
Good: // option을 받는게 아니라 fn을 받아보자.
// 이제 새로운 array를 만든다는 매커니즘은 닫혀있으나 방식에 대해서는 열려있다.
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = fn(array[i], i, array); // 내부 값을 외부로 전달하고 결과를 받아서 사용한다.
  }
  return result;
}
// 얼마든지 새로운 기능을 만들어도 map코드에는 영향이 없다.
const getDoubledArray = (array) => map(array, (x) => x * 2);
const getTripledArray = (array) => map(array, (x) => x * 3);
const getHalfArray = (array) => map(array, (x) => x / 2);
```

## LSP (Liskov Substitution Principle) : 리스코프 치환 원칙

> 어떤 인터페이스를 사용하는 프로그램은 그 인터페이스의 구현체(implementation)에 의해 동작이 오락가락하면 안 된다. 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.

리스코프 치환 원칙은 상속을 받아 만든 하위 타입의 제약 조건들이 상위 타입에서 먼저 선언한 조건들과 충돌이 날 경우 유지보수가 힘들어 진다는 문제점이 있기 때문에 만들어진 것이다.
계층도간의 is-a 관계를 만족한다고 하더라도 (새-펭귄, 직사각형-정사각형) 하위 타입에서 가변성을 가지면서 상위 타입에서 정의한 조건과 일치하지 않는다면 상속을 받지 말아야 한다는 것을 뜻한다. - [참고](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C#l---lsp--%EB%A6%AC%EC%8A%A4%EC%BD%94%ED%94%84-%EC%B9%98%ED%99%98-%EC%9B%90%EC%B9%99)

## ISP (Interface Segragation Principle) : 인터페이스 분리 원칙
> 사용자가 필요하지 않은 것들에 의존하게 되지 않도록, 인터페이스를 작게 유지하라.


## DIP (Dependency Inversion Principle) : 의존관계 역전 원칙
> 추상화하는 방향으로 의존하라. 상위 레벨 모듈이 하위 레벨 세부 사항에 의존해서는 안된다.

객체 지향 프로그래밍에서 의존관계 역전 원칙은 소프트웨어 모듈들을 분리하는 특정 형식을 뜻한다. 이 원칙을 따르면, 상위 계층이 하위 계층에 의존하는 전통적인 의존관계를 반전시킴으로써 상위 계층이 하위 계층의 구현으로부터 독립되게 할 수 있다.

- 따라서 상위 모듈은 하위 모듈에 의존해서는 안된다. 상위 모듈과 하위 모듈 모두 추상화에 의존해야 한다.
- 그리고 추상화는 세부 사항에 의존해서는 안된다. 세부사항이 추상화에 의존해야 한다.

#### references

[창시자 앨런 케이가 말하는, 객체 지향 프로그래밍의 본질](https://velog.io/@eddy_song/alan-kay-OOP)
[Javascript에서도 SOLID 원칙이 통할까?](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C)
