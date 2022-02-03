# Throttling & Debounce

## 1. debounce vs throttle?
debounce와 throttle은 이벤트를 반복적으로 실행할 때, 콜백 함수의 불필요한 실행을 줄여주는 역할을 한다. 불필요한 서버 리퀘스트를 막을 수도 있고, 불필요한 통신을 줄임과 동시에 필요 없는 렌더링 또한 막을 수 있어 컴포넌트의 성능 개선에도 도움을 준다.
특히 외부 API를 사용할 경우 일일 할당량에 제한이 있는 경우가 있는데, 과도한 서버 요청을 막아줄 수 있다는 면에서 필수적으로 사용해야 할 기능이라고 생각한다.

1) debounce

```js
_.debounce(func, [wait=0], [options={}])
```

![debounce](https://media.vlpt.us/images/edie_ko/post/282c25e5-d84d-41dc-93f9-7ea642299503/image.png)
[출처](https://css-tricks.com/debouncing-throttling-explained-examples/)

debounce는 이벤트가 끝난 뒤에 설정해둔 시간(wait)이 지나야 콜백(func)이 실행 된다. 아래 사진을 보면 여러 이벤트들이 하나로 그룹지어지는데 이게 바로 debounce다.

1) throttle
```js
_.throttle(func, [wait=0], [options={}])
```
![throttle](https://lh3.googleusercontent.com/29ROOEzOsA-lyQZYlF_aEIKr2PH_JoZ8bawD0dPUuCYU4OQKLcJ5k07ot6zvdNDY9QRbZWkXh67jM18yvQRbWRYogsyrXwYluGowAwXpeRFt8kTQ5FtL6SWSv2Qy2QDOol3aQV72)

throttle은 콜백 함수(func)를 일정 주기(wait) 내에 한 번만 호출한다. 특히 scroll, mousemove 이벤트와 같이 짧은 시간에 굉장히 많이 실행되는 이벤트에 사용한다.

debounce는 이벤트가 끝날 때까지 기다렸다가 시작된다는 점, throttle은 이벤트가 시작되면 일정 주기로 계속 실행한다는 점이 다르다.
따라서 확실한 성능 개선을 위해서는 debounce를 사용하여 이벤트를 한 번만 실행되도록 하는 것이 효과적일 것이다.
하지만 유저가 즉각적인 결과를 요하는 기능에 있어서는 throttle을 사용하면 된다.