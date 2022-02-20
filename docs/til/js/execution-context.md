# 실행 컨텍스트란 무엇인가요?

# 1. 실행 컨텍스트란

> 📌 실행 컨텍스트(execution context)는 실행할 코드에 제공할 환경 정보들을
> 모아놓은 객체로, 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는
> 개념이다.
> <br />- 정재남, 코어자바스크립트

실행 컨텍스트는 자바스크립트 코드가 실행되는 환경이다. 모든 JavaScript 코드는 실행 컨텍스트 내부에서 실행된다고 생각하면 된다.<br />
즉 함수가 실행되면 함수 실행에 해당하는 `실행 컨텍스트`가 생성되고, 자바스크립트 엔진에 있는 콜 스택에 차곡차곡 쌓인다.<br />
그리고 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드를 실행하면서(LIFO), 전체 코드의 환경과 순서를 보장하게 된다.
실행 컨텍스트는 식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 매커니즘으로, 실행 컨텍스트는 곧 자바스크립트의 핵심 원리다.

# 2. 실행 컨텍스트는 언제 생성될까?

자바스크립트 엔진이 스크립트를 처음 마주할 때 전역 컨텍스트를 생성하고, 콜 스택에 `push` 한다.
엔진이 스크립트를 쭉 읽어내려가면서 함수 호출을 발견할 때마다, 함수의 실행 컨텍스트를 스택에 `push` 한다.
중요한 점은 함수 실행 컨텍스트는 함수가 **실행**될 때! 만들어진다는 점이다.<br />
함수를 선언할 때가 아니라 실행할 때다.

실행 컨텍스트를 만들 수 있는 방법으로는 1) 전역공간, 2) 함수, 3) eval() 함수가 있다.
이 중에서 eval 함수는 문자열로 된 자바스크립트 코드를 전달하면 그게 그대로 실행되는 함수인데, 속도나 보안이 좋지 않아 현재는 거의 쓰지 않는다. ~~없다고 생각하자~~

> `"eval is evil" - Douglas Crockford`

따라서 자동으로 생성되는 전역공간과 eval을 제외하면, **실행 컨텍스트가 생성되는 시점은 곧 함수를 실행하는 시점이다.**

# 3. 실행 컨텍스트의 종류

앞서 실행 컨텍스트를 만들 수 있는 방법으로 전역공간, 함수, eval()이 있다고 했다.
따라서 실행 컨텍스트도 3가지로 나뉜다.

- 전역 실행 컨텍스트: 전역 영역에 존재하는 코드.
  모든 스크립트 코드는 전역 실행 컨텍스트 안에서 실행된다.
  프로그램에 단 한 개만 존재하며 실행 컨텍스트의 기본이다. 함수 밖에 있는 코드는 전역 실행 컨텍스트에 있다.
  브라우저의 경우에는 `window`객체, Node.js의 경우엔 `global`객체가 곧 전역 실행 컨텍스트가 된다.

- 함수 실행 컨텍스트: 함수 내에 존재하는 코드.
  함수가 실행될 때마다 만들어지는 실행 컨텍스트이다.
  각 함수는 고유의 실행 컨텍스트를 가지며, 함수가 실행되거나 call 될 때에만 생성된다.

- eval() 실행 컨텍스트: eval 함수로 실행되는 코드.
  이제 쓰지 않는 eval() 함수에 의해 생성되는 실행 컨텍스트이다.

# 4. 실행 컨텍스트의 구조

실행 컨텍스트는 어떻게 이루어져 있을까?
실행 컨텍스트는 `LexicalEnvironment` 컴포넌트와 `variableEnvironment` 컴포넌트로 구성된다.
아래의 그림을 참고하자.

![](https://images.velog.io/images/edie_ko/post/8a602077-2ef6-40f3-87ef-11bd54a53ec5/execution-context.jpg)

함수가 호출되면 전역 공간에 있던 코드의 제어권이 함수의 내부로 이동하면서 함수 코드를 평가하기 시작한다. 함수 코드 평가는 아래 순서대로 진행된다.

> 1.  함수 실행 컨텍스트 생성

2. 함수 LexicalEnvironment 생성
   2-1) 함수 environmentRecord 생성
   2-2) ThisBinding
   2-3) outerEnvironmentReference 결정

더 자세하게 각각의 요소들을 알아보자.

- `variableEnvironment`: 현재 컨텍스트 내의 **식별자들에 대한 정보 + 외부 환경 정보**를 담는다.
  선언 시점의 `LexicalEnvironment`의 **스냅샵**으로 변경 사항은 반영되지 않는다.
  실행 컨텍스트를 생성할 때 `variableEnvironment`에 정보를 먼저 담은 다음,
  이를 복사해서 `LexicalEnvironment`를 만든다.
  - `environment record` (snapshot)
  - `outer environment reference` (snapshot)
- `LexicalEnvironment(어휘적 환경)`: 처음에는 `variableEnvironment`와 같지만 변경 사항이
  실시간으로 반영된다.
  - `environmentRecord(환경 레코드)`: 함수 안의 코드가 실행되기 전에 현재 컨텍스트와 관련된 코드의 식별자 정보가 저장된다. (매개변수의 이름, 함수 선언, 변수명 등)
    즉 코드가 실행되기 전에 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명 등을 모두 알고 있게 된다. (호이스팅)
  - `outerEnvironmentReference(외부 렉시컬 환경에 대한 참조)`: 상위 스코프를 가리킨다. 즉 현재 `environment record`보다 바깥에 있는 `environment record`를 참고한다는 뜻이며 해당 실행 컨텍스트를 생성한 함수의 바깥 환경을 가리킨다.
    따라서 자바스크립트 엔진이 현재 렉시컬 환경에서 변수를 찾을 수 없다면 외부 환경에서 찾는다는 것을 뜻한다.
    만약 상위 스코프에서도 해당 식별자를 찾을 수 없다면 참조 에러(uncaught reference error)를 발생시킨다.
- `ThisBinding`: `this` 식별자가 바라봐야 할 대상 객체. 실행 컨텍스트가 활성될 때 this가 지정되지 않은 경우 this에는 전역 객체가 저장된다.

> 🏆 **LexicalEnvironment 렉시컬 환경 (어휘적 환경)** <br />
> 렉시컬 환경은 식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트이다. **실행 컨텍스트 스택이 코드의 실행 순서를 관리**한다면 **렉시컬 환경은 스코프와 식별자를 관리**한다. 렉시컬 환경은 키와 값을 갖는 객체 형태의 스코프를 생성해서, 식별자를 키로 등록하고 식별자에 바인딩된 값을 관리한다.

# 5. 실행 컨텍스트의 생성과 작동 과정

이번에는 아래의 코드를 보며 실행 컨텍스트의 생성과 식별자 검색 과정을 알아보자.

```js
const str = '안녕';

function outer() {
  function inner() {
    const greeting = '하이';
    console.log(greeting);
    console.log(str);
  }
  inner();
}
outer();

console.log(str);
```

> 1. 시작: 전역 컨텍스트가 생성된다. 전역 컨텍스트의 `environmentRecord`에 `{ str, outer }` 식별자를 저장한다. 전역 컨텍스트는 가장 최상위 컨텍스트이므로 `outerEnvironmentReference`는 `null`이다. (this: 전역객체)

2. 1, 3번째 줄: 전역 스코프에 있는 변수 `str`에 '안녕'을, `outer`에 함수를 할당한다.
3. 10번째 줄: `outer` 함수를 호출한다. 전역 컨텍스트의 코드는 10번째 줄에서 잠시 중단되고, `outer` 실행 컨텍스트가 활성화되어 3번째 줄로 이동한다.
4. 3번째 줄: `outer` 실행 컨텍스트의 `environmentRecord`에 `{ inner }` 식별자를 저장한다.
   `outerEnvironmentReference`에는 `outer` 함수가 선언될 당시의 `LexicalEnvironment`가 담긴다(`===전역 컨텍스트의 LexicalEnvironment`).
   이를 `{ GLOBAL, { a, outer }}`라고 표기하자. 첫 번째는 실행 컨텍스트의 이름, 두 번째는 `environmentRecord` 객체다. (this: 전역객체)
5. 4번째 줄: `outer` 스코프에 있는 변수 `inner`에 함수를 할당한다.
6. 8번째 줄: `inner` 함수를 호출한다. 여기서 `outer` 실행 컨텍스트의 코드는 임시 중단되고, `inner` 실행 컨텍스트가 활성화되어 4번째 줄로 이동한다.
7. 5번째 줄: `inner` 실행 컨텍스트의 `environmentRecord`에 `{ greeting }` 식별자를 저장한다.
   `outerEnvironmentReference`엔 `inner` 함수가 선언될 당시의 `LexicalEnvironment`가 담긴다. `inner`함수는 `outer`함수에서 선언되었으므로
   `outer` 함수의 `LexicalEnvironment`, 즉 `{ outer, { inner }}`를 참조복사한다. (this: 전역객체)
8. 6번째 줄: `environmentRecord`에 있는 `greeting`을 찾아서 실행한다.
9. 7번째 줄: 식별자 `str`에 접근하려고 한다. 이때 자바스크립트 엔진은 활성화된 실행 컨텍스트의 `LexicalEnvironment`에 접근한다.
   첫 요소의 `environmentRecord`에서 `str`이 있는지 찾아보고, 없으면 `outerEnvironmentReference`에 있는 `environmentRecord`로 넘어가는 식으로 계속해서 검색한다.
   여기서는 전역 `LexicalEnvironment`에 `str`이 있으므로 '안녕'을 출력한다.
10. 8번째 줄: `inner` 함수 실행이 종료된다. `inner` 실행 컨텍스트가 콜 스택에서 제거되고, `outer` 실행 컨텍스트가 다시 활성화되면서 9번째 줄로 이동한다.
11. 10번째 줄: `outer` 함수 실행이 종료된다. `outer` 실행 컨텍스트가 콜 스택에서 제거되고, 전역 컨텍스트가 다시 활성화 된다.
12. 13번째 줄: 전역 컨텍스트의 `environmentRecord`에서 `str`을 검색해서 실행한다.
13. 완료: 모든 코드의 실행이 종료되어 전역 컨텍스트가 콜 스택에서 제거되고 종료된다.

## 참고 자료

- https://262.ecma-international.org/10.0/#sec-lexical-environments
- https://betterprogramming.pub/javascript-internals-execution-context-bdeee6986b3b
- 코어자바스크립트, 정재남
- 모던 자바스크립트 Deep Dive, 이웅모
