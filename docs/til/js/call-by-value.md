# Call by value, Call by reference 차이

함수를 호출하면서 매개변수에 값을 전달하는 방식을 값에 의한 호출(call by value), 참조에 의한 호출(call by reference)로 구별해서 부른다. 

이 동작 방식은 값에 의한 전달, 참조에 의한 전달과 동일하다. 

## 값에 의한 전달

원시 타입의 값, 즉 원시 값은 immutable value(변경 불가능한 값)다. 원시 값을 변수에 할당하면 변수(확보된 메모리 공간)에는 실제 값이 저장된다. 즉, 원시 값을 갖는 변수를 다른 변수에 할당하면 원본의 **원시 값**이 복사되어 전달된다. 이것을 값에 의한 전달(pass by value)이라고 한다.

```js
let name = 'edie';
// copy에 name의 값이 복사되어 할당
const copy = name;

name = 'meng';

// name과 copy의 값은 다른 메모리 공간에 저장된 별개의 값.
// 따라서 name을 바꾸더라도 copy 값에는 영향을 주지 않는다.
console.log(name, copy); // 'meng' 'edie'
```

이를 토대로 아래의 문제를 풀어보자.
```js
function sum(num1, num2) {
  const result = num1 + num2;
  
  num1 = 0;
  num2 = 0;
  
  return result;
}

const num1 = 1;
const num2 = 2;

const result = sum(num1, num2);
console.log(num1, num2, result); // ?
```

답은 1, 2, 3이다. 


## 참조에 의한 전달

객체(참조) 타입의 값, 즉 객체는 mutable value(변경 가능한 값)다. 객체를 변수에 할당하면 변수(확보된 메모리 공간)에는 참조 값이 저장된다. 즉, 객체를 가리키는 변수를 다른 변수에 할당하면 원본의 **참조 값**이 복사되어 전달된다. 이것을 참조에 의한 전달(pass by reference)이라고 한다.

```js
const person = {
  name: 'edie'
};

// 참조 값을 복사(얕은 복사)해서 copy와 person은 동일한 참조 값을 갖는다.
const copy = person;

copy.name = 'meng';
person.address = 'seoul';

// 두 개의 식별자가 하나의 객체를 공유하기 때문에 어느 한쪽에서 객체를 변경하면 다른 쪽도 영향을 받는다.
console.log(person, copy);
// { name: 'meng', address: 'seoul' } { name: 'meng', address: 'seoul' }
```

다음 문제를 풀어보자.

```js
function sum(obj) {
  const result = obj.num1 + obj.num2;
  
  obj.num1 = 0;
  obj.num2 = 0;
  
  return result;
}

const obj = {
  num1: 1,
  num2: 2
}

const result = sum(obj);

console.log(obj.num1, obj.num2, result); // ?
```

답은 0, 0, 3이다.

## 자바스크립트는 항상 call by value

자바스크립트에는 '참조에 의한 전달'은 없고, '값에 의한 전달'만 존재한다. 
C와 C++과 같은 다른 언어와는 달리 **포인터**가 존재하지 않기 때문이다.

```js
function change(obj) {
  obj = 10;
  console.log(obj);
}

let obj = {x: 1, y: 2};
change(obj);

 // JS에서는 {a: 5, b: 8}가 출력이 되지만,
 // C와 C++ 에서는 10이 출력된다.
console.log(obj);
```

따라서 자바스크립트에는 완전한 의미의 call by reference가 존재하지 않는다. 그래서 call by sharing이라는 용어로 불리기도 한다. 하지만 이 용어도 ECMAScript에서 정의된 공식 용어는 아니기 때문에 정확한 용어는 아니다.