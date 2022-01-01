# JavaScript의 prototype

자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어다.
자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 '모든 것'이 객체다. 원시 타입의 값을 제외한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체다.

## 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심이다. 상속은 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아서 그대로 사용할 수 있다는 것.

자바스크립트는 프로토타입을 기반으로 상속을 구현해서 불필요한 중복을 제거한다. 
다음 코드를 보자

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = newCircle(2);

// 여기서 getArea() 메서드를 둘 다 중복적으로 소유하는데,
// getArea()는 하나만 생성해서 모든 인스턴스가 공유하는 것이 더 좋겠지?
// 메모리 낭비~ 퍼포먼스도 안 좋아~
console.log(circle1.getArea === circle2.getArea); // false
console.log(circle1.getArea()); // 3.1415...
console.log(circle2.getArea()); // 12.5663...
```

이때!! 상속을 사용해 보는 거야~

```js
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유할 수 있도록
// 프로토타입에 추가한다.
Circle.prototype.getArea = function() {
  return Math.PI * this.radius ** 2;
}

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받게 됨
// 즉, 똑같은 하나의 getArea 메서드를 공유하는 것!
console.log(circle1.getArea === circle2.getArea); // true
```

정리해보자면, Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받는다.

자신의 상태를 나타내는 radius 프로퍼티만 개별적으로 소유하고 내용이 동일한 메서드는 상속을 통해서 공유하여 사용할 수 있는 거지... (amazing)

## 프로토타입 객체

프로토타입 객체는 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다.

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지는데, 이 내부 슬롯의 값은 프로토타입의 참조다. 여기에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 `[[Prototype]]`에 저장된다.

그런데 `[[Prototype]]` 내부 슬롯에는 직접 접근할 순 없고, `__proto__` 접근자를 통해서 간접적으로 접근할 수 있다. 이 `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 게 아니다. Object.prototype의 프로퍼티다. 

### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
왜 이렇게 접근해야할까?
상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.

```js
const parent = {};
const child = {};

child.__proto__ = parent;
parent.__proto__ = child; // error
```

따라서 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 따라서 `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하지 않도록 한다. `__proto__`를 모든 객체가 사용할 수 있는 것도 아니다. (직접 상속)

따라서 `__proto__` 대신 프로토타입을 참조하고 싶을 경우에는 `Object.getPrototypeOf` 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 `Object.setPrototypeOf` 메서드를 사용한다.

```js
const obj = {};
const parent = { x: 1};

Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

### 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

```js
(function() {}).hasOwnProperty('prototype'); // true
({}).hasOwnProperty('prototype'); // false
```

**prototype 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다. 따라서 <u>생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor</u>인 화살표 함수와 ES6의 Arrow functino으로 정의한 메서드는 prototype 프로퍼티를 생성하지 않는다.**

## 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 같이 생성된다.
생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 같이 생성된다.

```js
// 함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행.
// 따라서 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 됨.
// 이때 프로토타입도 생성된다.
console.log(Person.prototype); // {constructor: f}

function Person(name) {
  this.name = name;
}

const Car = name => {
  this.name = name;
}

console.log(Car.prototype); // undefined
```

### 빌트인 생성자 함수와 프로토타입 생성 시점
그럼 빌트인 생성자 함수들은 어떨까..?
Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되기 때문에 이때 프로토타입 프로퍼티에 바인딩된다.

이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다.
이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

## 프로토타입 체인

자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라서 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다.
프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 매커니즘이다.

이에 반해, 프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다. 따라서 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색한다. 따라서 스코프 체인은 식별자 검색을 위한 매커니즘이라고 할 수 있다.

## 오버라이딩과 프로퍼티 섀도잉

```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  
  Person.prototype.sayHello = function() {
    console.log(`Hi, I'm ${this.name}`);
  };
  
  return Person;
}());

const me = new Person('Edie');

// 인스턴스 메서드
me.sayHello = function() {
  console.log(`${this.name}`);
};

me.sayHello(); // Edie
```

위처럼 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 프로퍼티를 오버라이딩 하는 것이 아니라, 인스턴스 프로퍼티로 추가한ㄷ. 이런 상속 관계에 의해 프로퍼티가 가려지는 현상을 **프로퍼티 셰도잉**이라고 한다.

삭제도 마찬가지다. 하위 객체를 통해 프로토타입의 프로퍼티를 수정하거나 삭제하는 건 불가능하다. 따라서 프로토타입 프로퍼티를 변경하거나 삭제하려면 하위 객체가 아니라 프로토타입에 직접 접근해서 삭제해야 한다.

## 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있다. (오..)
부모 객체인 프로토타입을 동적으로 변경, 즉 객체 간의 상속 관계를 동적으로 변경할 수 있다.
생성자 함수 또는 인스턴스에 의해 교체한다.

### 생성자 함수에 의한 프로토타입의 교체

```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  
  Person.prototype = {
    sayHello() {
      console.log(`Hi, I'm ${this.name}`);
    }
  };
  
  return Person;
}());

const me = new Person('Edie');

console.log(me.constructor === Person) // false
console.log(me.constructor === Object) // true
```

위의 방식처럼 생성자 Person의 프로토타입을 객체 리터럴로 교체할 수 있다.
프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. constructor 프로퍼티는 자바스크립트 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티다. 따라서 me 객체의 성자 함수를 검색하면 Person이 아니라 Object가 나온다.

따라서 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 파괴된 constructor 프로퍼티와 생성자 함수 간의 연결을 되살려 보자. 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가해서 되살린다.

```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 연결하기!
    constructor: Person,
    sayHello() {
      console.log(`Hi, I'm ${this.name}`);
    }
  };
  
  return Person;
}());

const me = new Person('Edie');

console.log(me.constructor === Person) // false
console.log(me.constructor === Object) // true
```

### 인스턴스에 의한 프로토타입 교체

혹은 아래와 같은 방법으로도 교체가 가능하다.
```js
function Person(name) {
  this.name = name;
}
  
const parent = {
  sayHello() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const me = new Person('Edie');
Object.setPrototypeOf(me, parent);

me.sayHello(); // "Hi, I'm Edie"
```


