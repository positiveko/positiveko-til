# Async/await

## why async/await?

async/await을 사용하게 되면 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기 처리처럼 프로미스를 사용할 수 있기 때문이다. 즉, 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

## async 함수

async 함수는 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

## await 함수

프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.

## 에러 핸들링

```js
const fetch = require('node-fetch');

const foo = async () => {
  try {
    const wrongUrl = '';
    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

foo();
// 혹은 foo() 함수에서 후속처리 메서드로 catch를 달아서 에러 핸들링을 할 수도 있다.
```
