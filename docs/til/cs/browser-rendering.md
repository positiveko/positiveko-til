# 브라우저 렌더링 과정

> DOM tree 생성: 렌더링 엔진이 HTML을 파싱하여 DOM 노드로 이루어진 트리 생성
>
> Render tree 생성: css 파일과 inline 스타일을 파싱, DOM + CSSOM을 결합해 렌더 트리를 생성
>
> Layout (reflow): 각 노드들의 스크린에서의 좌표에 따라 위치 결정
>
> Paint (repaint): 실제 화면에 그리기


브라우저의 렌더링 엔진은 클라이언트가 서버로부터 요청한 HTML부터 순차적으로 파싱하며 DOM을 생성해 나갑니다. 
이때 렌더링 엔진은 DOM을 생성해 나가다가 CSS를 로드하는 링크 태그나 스타일 태그를 만나면 CSSOM을 생성하게 됩니다.
이후 CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 때문에 DOM 생성을 재개합니다. 
DOM과 CSSOM 생성이 끝나면 이 둘을 합쳐서 렌더 트리를 구성합니다.
이때 렌더 트리는 렌더링을 위한 트리구조이기 때문에 렌더링에 포함되지 않는 노드들 (meta, script, css)은 제외하고 구성이 됩니다.
CSS와 마찬가지로 Script 태그를 만나면 DOM 생성을 일시 중단합니다.
브라우저는 자바스크립트 코드를 실행하기 위해 렌더링 엔진에서 자바스크립트 엔진으로 제어권을 넘깁니다. 이후 자바스크립트 파싱과 실행이 종료되면, 렌더링 엔진으로부터 다시 제어권을 넘겨 HTML 파싱이 중단된 지점부터 DOM을 생성합니다.
만약 자바스크립트 코드에 의해 DOM이나 CSSOM이 이용되는 경우 DOM과 CSSOM을 다시 렌더 트리로 결합하고, 이를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저 화면에 렌더링하게 됩니다.

브라우저는 동기적으로 위에서 아래로 내려가면서 CSS, JS를 파싱하고 실행합니다. 이 말은 결국 스트립트 태그 위치에 따라 HTML 파싱이 중단되어 DOM 생성이 지연될 수 있다는 것을 의미합니다.

따라서 CSS 태그를 상단에 위치시키는 이유는 CSSOM이 구성되어야 브라우저가 렌더링을 하기 때문이고, Script를 하단에 위치시키는 이유는 HTML 파서가 script 태글르 만나면 파싱을 멈추고 스크립트를 읽기 때문에 웹페이지의 로딩이 그만큼 늦어지기 때문이다.





![IMG_0287](https://user-images.githubusercontent.com/69200669/143768199-56fc523c-d712-4443-89ec-c684f920dad8.jpg)
![IMG_0288](https://user-images.githubusercontent.com/69200669/143768197-b705ce7e-a378-48f9-a627-35a1dd064eb5.jpg)
![IMG_0289](https://user-images.githubusercontent.com/69200669/143768195-062d5966-1799-4ac0-a59e-bf8097733a04.jpg)
![IMG_0290](https://user-images.githubusercontent.com/69200669/143768192-a2ea788f-f816-47d3-9350-d1ca324ed032.jpg)
![IMG_0291](https://user-images.githubusercontent.com/69200669/143768190-f68205b0-b629-4aa7-bbec-2d8985d464d5.jpg)
![IMG_0292](https://user-images.githubusercontent.com/69200669/143768188-6bd71511-9088-45aa-ae2a-7f7a035a6add.jpg)
