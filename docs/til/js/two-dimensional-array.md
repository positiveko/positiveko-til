# javaScript로 이차원 배열 생성 및 복사하기

이차원 배열 생성

```js
const n = 4;
const m = 3;
const arr = Array.from(Array(n), () => Array(m).fill(null));

//[
//  [ null, null, null ],
//  [ null, null, null ],
//  [ null, null, null ],
//  [ null, null, null ]
//] 
```

이차원 배열 복사할 때에는 어떻게 하면 될까..?

일반적으로 배열을 복사할 때에는 spread 연산자를 이용한다.
`const copy = [...arr]`
하지만 이차원 배열인 경우에는 배열을 이루고 있는 el이 참조값이다.
따라서 위와 같이 복사하고서 inner 값을 바꿀 경우 원래 값과 복사한 값이 서로 연결되어 둘 다 동시에 변한다.
따라서 inner 값까지 스프레드 연산자를 이용해서 복사해준다.

```js
const copy = arr.map(el => [...el]);
// 혹은 const copy = arr.map(el => el.slice());
copy[2][2] = 1;

console.log(arr,'->', copy)

// [
//   [ null, null, null ],
//   [ null, null, null ],
//   [ null, null, null ],
//   [ null, null, null ]
// ] '->' [
//   [ null, null, null ],
//   [ null, null, null ],
//   [ null, null, 1 ],
//   [ null, null, null ]
// ]
```

