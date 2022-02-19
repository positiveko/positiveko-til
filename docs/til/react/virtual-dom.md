# Virtual DOM 가상돔

> UI의 가상적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 실제 DOM과 동기화
> Virtual DOM 가상돔은 HTML DOM의 추상화 버전이다. 실제 DOM object와 같은 속성들을 가지고 있지만, 실제 DOM이 갖고 있는 api는 갖고 있지 않다.

## Virtual DOM의 동작 원리

![vdom](https://miro.medium.com/max/700/1*8OCCATi8_5HmWI1QpjrRNA.png)
가상돔은 UI 가상 표현을 자바스크립트 메모리 상에 두고 재조정 과정을 통해 실제 DOM과 동기화한다. 재조정은 3가지 과정으로 이뤄지는데,

1. UI가 변경되면(JSX.Element 렌더링) 전체 UI를 가상돔으로 렌더링한다.
2. 현재 가상돔과 이전 가상돔을 비교해 차이를 계산한다. (diffing algorithm)
3. 변경된 부분을 실제 DOM에 반영한다.

다르게 말해본다면,

1. UI가 변경되면 React.createElement()를 통해  JSX.element를 렌더링한다.
2. 이때 모든 각각의 Virtual DOM object가 업데이트 된다.
3. Virtual DOM이 업데이트되면 react는 Virtual DOM을 이전의 Virtual DOM Snapshot과 비교하여 정확히 어떤 Virtual DOM이 바뀌었는지 검사한다. (diffing 알고리즘)
4. 이러한 변경이나 업데이트가 마무리된 이후에 딱 한 번 실제 DOM에 결과를 업데이트 한다.

> Diffing algorithm
> 
> element의 속성 값만 변한 경우에는 속성 값만 업데이트하고, element의 태그 또는 컴포넌트가 변경된 경우에는 해당 노드를 포함한 하위 모든 노드를 unmount 후 새로운 Virtual DOM으로 대체한다.

## Virtual DOM이 없다면?

가상돔을 쓰지 않는다면, 자바스크립트의 DOM api를 사용해서 직접 DOM을 변경하는 식으로 UI를 변경해야 한다.

브라우저의 렌더링 과정은 1) DOM tree 생성 2) render tree 생성 3) 레이아웃 (reflow) 4) 페인트 (repaint)과정을 통해 렌더링되는데,
DOM에 작은 변화가 생길 때마다 render tree가 재생성 되어야 한다. 즉, 아주 작은 DOM의 변화로 인해 다시 2) 렌더 트리를 생성하고, 3) 레이아웃하고, 4) 페인트하는 과정을 진행해야 한다는 것이다.

가상돔의 주요한 특징으로는,

- 자바스크립트 객체로 표현되며 메모리 상에서 동작하기 때문에 빠르다.
- render() 메소드로 변화를 재랜더링 한다.
- 디핑 알고리즘을 통해 UI의 변화를 가상돔에 적용한 뒤 필요한 UI의 업데이트만 전체 real DOM에 적용한다.
- HTML 태그처럼 생겼지만 JavaScript의 확장 문법인 JSX를 통해 컴포넌트를 만들면 바빌이 `React.createElement()` 호출로 컴파일한다. 이 함수는 `React element 객체`를 리턴하는데, 이 객체는 **가볍고 light, 상태를 가지지 않으며 stateless, 불변성을 유지한다 immutable.** 이 불변성 덕분에 가상돔을 비교하고 업데이트하는 것이 가능해진다. 마지막으로 이 react element는 reactDOM의 `render()`에 의해 실제 DOM 요소가 된다.
- 가상돔이 한번 바뀔 때마다 DOM이 업데이트 되는 것이 아니라, 30개가 변경되었을 때 1번 업데이트 하는 방식으로 연산 비용을 최소화하기 때문에 UI 변경이 잦은 애플리케이션의 성능을 높일 수 있다.
- 모든 ReactDOM object는 그에 대응하는 Virtual DOM object가 있다. 그리고 그 Virtual object는 DOM object를 대신한다.

리액트는 이 가상돔을 통해 실제 DOM의 작업량을 줄이고 렌더링 속도를 향상시켰다.
하지만 diffing 알고리즘을 사용해서 이전과 현재의 가상돔을 비교하는 과정에서 단순히 작은 하나의 노드에만 변경이 있을지라도 전체 가상돔에 대한 연산이 실행되기 때문에 오버헤드가 생기는 점은 단점이라고 할 수 있다. (cf. incremental DOM은 이러한 계산 고정의 오버헤드를 크게 줄이고 애플리케이션의 메모리 사용량도 개선하는 가상돔의 대안으로 제안되고 있다.)

[Incremental DOM과 Virtual DOM 비교](https://ui.toast.com/weekly-pick/ko_20210819)
