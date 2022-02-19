# 객체 지향 프로그래밍 Object Oriented Programming


객체지향이란 객체에 필요한 것을 추상화시키고, 독립적인 객체들로 프로그램을 구현하는 프로그램 패러다임이다.
객체 지향에서 상속은 핵심적인 개념이다. 상속은 불필요한 중복을 제거해주는데, 자바스크립트에서 상속을 구현하기 위해서는 프로토타입 프로퍼티를 사용해야 한다.
 
## SOLID
> 컴퓨터 프로그래밍에서 SOLID란 로버트 마틴이 2000년대 초반에 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 마이클 페더스가 두문자어 기억술로 소개한 것이다. 
> 
> 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다. SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반적 전략의 일부다.

### 왜 SOLID 원칙이 필요한가?
코드를 끊임없이 변경하는 것은 개발자의 숙명과도 같다. 요구사항과 환경이 매번 변화하는 만큼 소프트웨어도 지속적으로 성장해야 한다.
코드를 변경하는 것은 결코 쉽지 않은 작업이지만 SOLID 원칙에 기반하여 프로그래밍을 한다면 훨씬 더 좋은 구조를 가지고 롱런할 수 있는 코드가 될 것이다.


## SRP (Single Responsibility Principle) : 단일 책임 원칙
객체는 오직 하나의 책임을 가져야 한다. (객체는 오직 하나의 변경 이유를 가져야 한다.)

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
## LSP (Liskov Substitution Principle) : 리스코프 치환 원칙

## ISP (Interface Segragation Principle) : 인터페이스 분리 원칙
## DIP (Dependency Inversion Principle) : 의존관계 역전 원칙

