# 자바스크립트의 this는 김춘수의 〈꽃〉이다




# 1. this는 무엇이냐?

어느 날 읽던 책에서는 자바스크립트의 `this`를 김춘수의 <꽃>과 같다고 설명했다.
`this`가 무엇인지는 함수를 호출한 코드에 달려있으며, **함수가 호출될 때** 동적으로 결정되기 때문이다.

실행 컨텍스트 글에서 함수가 호출되면 실행 컨텍스트가 생성되고, LexicalEnvironment가 생성되며, environmentRecord 생성, **ThisBinding**, outerEnvironmentReference 결정된다고 했다. 실행 컨텍스트는 곧 함수를 호출할 때 생성되므로, this는 함수를 호출할 때 결정되는 것이다.

# 2. this 바인딩

> 📌 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this바인딩은 this(식별자 역할)와 this가 가리킬 객체를 바인딩하는 것이다.
> 
> 📌 자바나 C++ 같은 클래스 기반 언어에서 this는 언제나 클래스가 생성하는 인스턴스를 가리킨다. 하지만 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this 바인딩이 동적으로 결정된다. 또한 strict mode 역시 this 바인딩에 영향을 준다.
> 
> 📌 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.
> 
> <br />- 이웅모, 모던 자바스크립트 Deep Dive

다시 반복하자. this는 선언 시점이 아닌 런타임 시점에 바인딩되며, 함수 호출 당시 상황에 따라 콘텍스트가 결정된다.
즉 함수 선언 위치와 상관없이 this 바인딩은 오로지 **어디서 어떻게 함수를 호출하느냐**에 따라 결정된다.

### 함수를 호출하는 방법은 다음과 같이 다양하다.

- 일반 함수 호출 (기본 바인딩)
- 메서드 호출 (암시적 바인딩)
- Function.prototype.apply/call/bind 메서드에 의한 간접 호출 (명시적 바인딩)
- 생성자 함수 호출 (new 바인딩)

그리고 this가 가리키는 것이 무엇인지를 알기위해서는 함수 선언 부분이 아니라 **호출하는 지점(호출부)을** 봐야한다.
호출부란 현재 실행 중인 함수 '직전'의 코드 내부에 있다.

```js
function sayHi() {
  console.log('hi');
  sayHello(); // sayHello() 호출부
}

function sayHello() {
  console.log('hello');
  sayHey(); // sayHi() 호출부
}

function sayHey() {
  console.log('hey');
}
sayHi(); // sayHi() 호출부
```

이제 호출부가 무엇인지 안다. 그럼 이제는 호출부가 함수를 호출하는 방법 4가지 중 어디에 속하는지 확인한다.

```js
const foo = function() {
  console.log(this);
};

// 1. 일반 함수 호출
// this = 전역 객체
foo(); // window

// 2. 메서드 호출
// this = 메서드를 호출한 객체 obj
const obj = { foo };
obj.foo(); // { foo: ƒ foo() }

// 3. call 호출
// this = 명시적으로 this와 바인딩한 대상 객체
foo.call({ a: 'edie' }); // { a: 'edie' }

// 4. 생성자 함수 호출
// this = 생성자 함수가 생성한 인스턴스
new foo(); // foo { __proto__: { constructor: ƒ foo() } }
```

그럼 이제부터는 하나씩 자세하게 살펴보자.

## 1) 일반 함수 호출 (기본 바인딩)

기본적으로 this에는 전역 객체가 바인딩된다.
즉 브라우저 환경에서는 window이고 Node.js 환경에서는 global을 가리킨다.

```js
function foo() {
  console.log(this); // window
  function bar() {
    console.log(this); // window
  }
  bar();
}
foo();
```

그런데 이는 non-strict mode인 경우다. 만약 strict mode인 경우에 일반 함수의 this는 undefined가 바인딩 된다.
this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 이상 일반 함수에서 this는 의미가 없기 때문이다.

```js
function foo() {
  'use strict';

  console.log(this); // undefined
}
foo();
```

### 1-1) 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수 내부의 this는 무엇을 가리킨다!라고 확실하게 말할 수 없다. 콜백 함수의 제어권을 가지는 함수가 콜백 함수의 this를 결정한다.
아래 예제를 보며 확인해보자.

```js
setTimeout(function() {
  console.log(this); // window;
  // 콜백 함수가 일반 함수로 호출되었으므로 전역 객체가 바인딩된다.
}, 300);

[1, 2, 3, 4, 5].forEach((num) => {
  console.log(this, num); // window, num;
});

document.body.querySelector('#id').addEventListener('click', function(e) {
  console.log(this, e); // '#id' 엘리먼트와 클릭 이벤트에 대한 객체
});
```

## 2) 메서드 호출 (암시적 바인딩)

메서드 내부의 this에는 호출한 주체에 대한 정보가 담긴다. 따라서 어떤 함수를 메서드로 호출하는 경우, 호출 주체는 바로 함수명 앞의 객체다. `obj.method()`의 경우 method의 this는 obj를 가리킨다.
해당 함수를 호출하는 구문 앞에 점 혹은 대괄호 표기가 있다면 그건 메서드 호출이다.

```js
const obj = {
  outer: function() {
    console.log(this);
    const inner = function() {
      console.log(this); // 함수 실행이므로 전역객체 window
    };
    inner();
  },
};
obj.outer(); // 메서드 호출이므로 obj
```

## 3) Function.prototype.apply/call/bind 메서드에 의한 간접 호출 (명시적 바인딩)

앞에서 살펴보았듯 다양한 상황에서 암시적으로 바인딩되는 this는 여러 이유로(콜백 함수..)
this의 바인딩을 쉽게 예측할 수 없는 상황이 있었다.
이런 문제를 해결하기 위해 명시적으로 this를 고정하는 방법을 이야기해보자.

### 3-1) call 메서드

> func.call(thisArg[, arg1[, arg2[, ...]]])

call 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령이다.
첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 쓴다.
일반적으로 함수의 this는 전역객체이지만 call을 사용하면서 구체적인 객체를 this로 지정할 수 있다.

```js
function foo() {
  console.log(this.a);
}
const obj = { a: 2 };
// 명시적으로 obj를 바인딩하라고 call 했다. this는 obj가 된다.
foo.call(obj); // 2
foo(obj); // undefined
```

```js
function plus(num) {
  this.count += num;
}
plus.count = 0;

for (i = 0; i < 10; i++) {
  if (i < 5) {
    plus.call(plus, i);
  }
}
console.log(plus.count); // 10
```

_-위의 예제에 오류가 있어 수정하였습니다. (2021.11.12)_

### 3-2) apply 메서드

> func.apply(thisArg, [argsArray])

call()과 기능적으로 유사하다.
차이점은 call()은 함수에 전달될 매개변수를 받는데, apply()는 인수들의 **배열**을 받는다.

```js
function foo(a, b, c) {
  console.log(this, a, b, c);
}
const obj = { a: 2 };

foo.call(obj, 4, 5, 6); // { a: 2 } 4 5 6
// apply는 두 번째 인자로 함수 인수들의 배열을 받는다.
foo.apply(obj, [4, 5, 6]); // { a: 2 } 4 5 6
```

이 call과 apply를 어떤 상황에서 이용할 수 있을까?
유사배열객체에 배열 메서드를 사용하고 싶을 때 이용할 수 있다.

```js
const obj = {
  0: 'hi',
  1: 'hello',
  length: 2,
};

Array.prototype.push.call(obj, 'hey');
// [].push.call(obj, 'hey') 이렇게 써도 동일하다.
console.log(obj);
```

위와 같은 유사배열 뿐만 아니라 arguments 객체, Node 선택자로 생성된 NodeList도 이런 방식으로 배열 처럼 사용할 수 있다.

### 3-3) bind 메서드

> func.bind(thisArg[, arg1[, arg2[, ...]]])

bind 메서드는 apply, call과는 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.
즉 call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출하는데,
bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.

```js
function foo() {
  console.log(this);
}
const obj = { a: 2 };

foo.call(obj); // { a: 2 }
foo.apply(obj); // { a: 2 }
// 똑같이 bind로 바꾸면 함수를 호출하지 않는 걸 알 수 있다.
foo.bind(obj); // ƒ bound foo()
// 명시적으로 실행을 추가해주어야 한다.
foo.bind(obj)(); // { a: 2 }
```

bind는 다음과 같이 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 일치하지 않는 문제를 해결할 수 있다.

```js
const person = {
  name: 'edie',
  foo(callback) {
    setTimeout(callback, 100);
  },
};
person.foo(function() {
  console.log(`hi, i'm ${this.name}`); // "hi, i'm "
  // 일반 함수로 호출된 콜백 함수 내부의 this는 전역객체다. (window.name)
  // 따라서 this.name이 출력되지 않았다.
});
```

아래와 같이 bind로 callback에 this를 명시해줌으로써 해결할 수 있다.

```js
const person = {
  name: 'edie',
  foo(callback) {
    setTimeout(callback.bind(person), 100);
  },
};
person.foo(function() {
  console.log(`hi, i'm ${this.name}`); // "hi, i'm edie"
});
```

## 4) 생성자 함수 호출 (new 바인딩)

```js
function Toy(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const woody = new Toy('PIXAR', 'cowboy', 1995);
const wallE = new Toy('PIXAR', 'robot', 2008);
const remy = Toy('PIXAR', 'rat', 2007);

console.log(woody.make); // 'PIXAR'
console.log(wallE.model); // 'robot'
console.log(remy); // undefined. new 생성자를 사용하지 않았기 때문에 일반함수로 호출되어 this는 전역객체를 가리킨다.
```

어떤 함수를 new 명령어와 함께 호출하면 생성자로서 동작하게 된다.
객체지향 언어에서는 생성자를 클래스, 클래스를 통해 만든 객체를 인스턴스라고 한다. 생성자 함수란 new 연산자로 함께 호출해서 인스턴스를 생성하는 함수를 일컫는다.
따라서 생성자는 인스턴스를 만들기 위한 일종의 **틀**이다. 그리고 생성자 함수로 호출된 경우 this는 새로 만들어진 인스턴스 자신이 된다.

더 자세하게 이 과정을 풀어보자.

```js
function Toy(make, model, year) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
  console.log(this); // Toy { __proto__: { constructor: ƒ Toy() } }

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.make = make;
  this.model = model;
  this.year = year;
  this.getAge = function() {
    return new Date().getFullYear() - this.year + 1;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
}

// 4. 인스턴스 생성. Toy 생성자 함수는 암묵적으로 this를 반환한다.
const woody = new Toy('PIXAR', 'cowboy', 1995);
console.log(woody);
// Toy {
//   make: 'PIXAR',
//   model: 'cowboy',
//   year: 1995,
//   getAge: ƒ (),
//   __proto__: { constructor: ƒ Toy() }
// }
console.log(woody.year); // 'PIXAR'
console.log(woody.getAge()); // 27
```

- 1번에서 new 생성자로 인해 **빈 객체(인스턴스)가 생성**된다. 암묵적으로 생성된 빈 객체는 **this에 바인딩**된다.
  그리고 이 처리는 런타임 이전에 실행된다.
- 2번에서 생성자 함수 내부의 코드가 한 줄씩 실행되며 this에 바인딩되어 있는 **인스턴스를 초기화**한다.
  즉, this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하면서 초기화하거나 고정값을 할당한다.
- 3번에서 생성자 함수 내부 처리가 끝나면 완성된 **인스턴스가 바인딩된 this가 암묵적으로 반환**된다.

생성자 함수 내부에서 값을 직접 반환하는 경우에는 어떻게 될까?
결과는 어떤 값을 반환하느냐에 달려있다.
아래 예제를 확인하자.

먼저 명시적으로 객체를 반환하는 경우다.

```js
function Toy(make, model, year) {
  console.log(this); // Toy { __proto__: { constructor: ƒ Toy() } }

  this.make = make;
  this.model = model;
  this.year = year;
  this.getAge = function() {
    return new Date().getFullYear() - this.year + 1;
  };
  // 아래처럼 명시적으로 객체를 반환하면 암묵적인 this반환이 무시된다.
  return {};
}

const woody = new Toy('PIXAR', 'cowboy', 1995);
console.log(woody); // {}
```

아래는 명시적으로 원시 값을 반환하는 경우다.

```js
function Toy(make, model, year) {
  console.log(this); // Toy { __proto__: { constructor: ƒ Toy() } }

  this.make = make;
  this.model = model;
  this.year = year;
  this.getAge = function() {
    return new Date().getFullYear() - this.year + 1;
  };
  // 명시적으로 원시값을 반환하면 암묵적인 this가 반환된다.
  return '우디';
}

const woody = new Toy('PIXAR', 'cowboy', 1995);
console.log(woody);
// Toy {
//   make: 'PIXAR',
//   model: 'cowboy',
//   year: 1995,
//   getAge: ƒ (),
//   __proto__: { constructor: ƒ Toy() }
// }
```

따라서 생성자 함수 내부에서 명시적으로 this가 아닌 값을 반환하는 경우 생성자 함수의 기본 동작을
훼손할 수 있으므로 return문을 생략해야 한다.

# 3. this 바인딩 예외

## 3-1. 화살표 함수

화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
ES6의 화살표 함수는 일반적인 바인딩 규칙을 무시하고 렉시컬 스코프로 this를 바인딩한다.
즉 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. (=== 'lexical this')
그렇다면 화살표 함수가 중첩된 경우에는 어떻게 될까..?
이럴 경우 inner 화살표 함수는 outer 화살표 함수 바깥의 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

```js
// 1)
const foo = () => console.log(this);
foo(); // window

// 2)
(function() {
  const foo = () => {
    const bar = () => {
      console.log(this);
    };
    bar();
  };
  foo();
}.call({ a: 1 })); // { a: 1 }
```

화살표 함수로 메서드를 정의하는 경우와 프로토타입 객체의 프로퍼티에 화살표를 할당하는 경우에도 동일한 문제가 발생한다.

```js
// 화살표 함수로 메서드를 정의하는 경우
// bad
const person = {
  name: 'edie',
  sayHi: () => console.log(`hi ${this.name}`),
};
person.sayHi(); // 'hi';

// good
const person = {
  name: 'edie',
  sayHi() {
    console.log(`hi ${this.name}`);
  },
};
person.sayHi(); // 'hi edie';

// 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우
// bad
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = () => console.log(`hi ${this.name}`);
const Person = new Person('edie');
person.sayHi(); // hi

// good
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log(`hi ${this.name}`);
};
const Person = new Person('edie');
person.sayHi(); // hi edie
```

_-위의 예제에 오타가 있어 정정하였습니다. (2021.11.12)_

## 3-2. 별도의 인자로 this를 받는 경우 (thisArg)

콜백 함수를 인자로 받는 메서드 중 일부에 경우 추가로 this로 지정할 객체(thisArg)를 인자로 지정할 수 있는 경우가 있다.
이러한 메서드의 thisArg 값을 지정하면 콜백 함수 내부에서 this값을 원하는 대로 변경할 수 있다. 주로 배열 메서드(forEach, map, filter, some, every, find, findIndex, flatMap)가 많으며 Set과 Map의 일부 메서드(forEach)에도 포함된다.

```js
const report = {
  sum: 0,
  count: 0,
  add: function() {
    const args = Array.prototype.slice.call(arguments);
    args.forEach(function(entry) {
      this.sum += entry;
      ++this.count;
      // this를 thisArg로 넣어주었다.
    }, this);
  },
};

report.add(2, 4, 6);
console.log(report.sum, report.count);
```

## 3-3. call, apply, bind에 첫 번째 인자로 null | undefined를 넘기는 경우

call, apply, bind에 첫 번째 인자로 null | undefined를 넘기는 경우 this바인딩이 무시되고 기본 바인딩 규칙이 적용된다.

```js
function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```

# 4. 어떤 thisBinding이 가장 강력할까?

이제까지 this의 다양한 바인딩에 대해 정리해보았다. 그런데 만약 여러 개의 규칙이 중복으로 적용된 경우엔 어떻게 알 수 있을까?
그때는 우선순위가 높은 this binding을 기준으로 확인하면 된다.

- 1등: new의 호출로 새로 생성된 객체
- 2등: call, apply, bind로 주어진 객체
- 3등: 호출의 주체인 콘텍스트 객체로 호출된 경우 그 콘텍스트 객체
- 4등: 기본 바인딩인 경우 'strict mode'인 경우 undefined, 'non-strict mode'에서는 전역 객체

따라서 this 바인딩을 알기 위해서는 **어디서 어떻게 함수를 호출하는지** 찾고,
위의 순서에 따라 this가 무엇을 가리키는지 예측해보자.

# 5. this 문제 풀이

본인이 확실하게 이해한 건지 확인할 수 있는 문제를 추가해보았다.
아래 문제를 보면서 console.log에는 어떻게 나올지 예상해보자.
답은 제일 마지막에 한꺼번에 적겠다.

#### 1번

```js
var name = 'edie';

var user = {
  name: 'meng',
  getName: function() {
    console.log(this.name); // (1)

    var inner = function() {
      console.log(this.name); // (2)
    };
    inner();
  },
};

user.getName();
```

#### 2번

```js
var name = 'edie';

var user = {
  name: 'meng',
  getName: function() {
    console.log(this.name);
  },
  age: 30,
  child: {
    age: 15,
    underTwenty: function() {
      return this.age < 20;
    },
  },
};

user.getName(); // (1)
user.child.underTwenty(); // (2)
user.parentUnderTwenty = user.child.underTwenty;
user.parentUnderTwenty(); // (3)
```

#### 3번

```js
const object = {
  message: 'Hello, World!',
  getMessage() {
    const message = 'Hey, World!';
    return this.message;
  },
};
console.log(object.getMessage());
```

#### 4번

```js
function Person(name) {
  this.name = name;
  this.getName = () => this.name;
}
const person = new Person('Edie');
console.log(person.getName());
const { getName } = person;
console.log(getName());
```

#### 5번

```js
const obj = {
  name: 'edie',
  sayHi() {
    console.log(`hi, ${this.name}`);
  },
};
setTimeout(obj.sayHi, 1000);
```

#### 6번. 아래에 콘솔에 'edie'가 로그되려면 어떻게 코드를 수정해야 할까?

```js
const person = {
  name: 'edie',
};

function sayHi() {
  console.log(this.name); // 'edie'
}
```

#### 7번

```js
const obj = {
  who: 'edie',
  sayHi() {
    return `hi, ${this.who}!`;
  },
  sayBye: () => {
    return `goobye, ${this.who}!`;
  },
};
console.log(obj.sayHi());
1;
console.log(obj.sayBye());
2;
```

#### 8번

```js
var length = 1;
function callback() {
  console.log(this.length);
}

const object = {
  length: 2,
  method1(callback) {
    callback();
  },
  methods2: (callback) => callback(),
};
object.method1(callback); // (1)
object.methods2(callback); // (2)
```

#### 9번

```js
var length = 2;
function callback() {
  console.log(this.length);
}

const obj = {
  length: 3,
  method1() {
    arguments[0]();
  },
  method2(callback) {
    callback();
  },
  method3: (callback) => {
    callback();
  },
  method4() {
    callback();
  },
};
obj.method1(callback, '1', '2', '3', '4'); // (1)
obj.method2(callback, '1', '2', '3', '4'); // (2)
callback.bind(obj)(); // (3)
obj.method3(callback); // (4)
obj.method4(); // (5)
```

#### 정답

```js
1.
(1) 'meng' (2) 'edie'
2.
(1) 'meng (2) true (3) false
3.
'Hello, World!'
4.
(1)'Edie' (2) 'Edie'
5.
'hi, '
6.
(방법 1) person property에 sayHi를 추가해서 person.sayHi() 호출
const person = {
  name: 'edie',
  sayHi
};

function sayHi() {
  console.log(this.name); // 'edie'
};

person.sayHi();

(방법 2) call, apply, bind 활용하여 명시적 바인딩
sayHi.call(person);
sayHi.apply(person);
sayHi.bind(person)();

7.
(1)'hi, edie!'
(2)'goobye, undefined!'
8.
(1) 1 (2) 1
9.
(1) 5 (2) 2 (3) 3 (4) 2 (5) 2
```

<br />
<br />
<br />

## 참고 자료

- 이웅모, <모던 자바스크립트 Deep Dive>
- 정재남, <코어 자바스크립트>
- 카일 심슨, <You don't know JS>
- [7 Interview Questions on "this" keyword in JavaScript. Can You Answer Them?](https://dmitripavlutin.com/javascript-this-interview-questions/)
