# 브라우저 렌더링 과정

> DOM tree 생성: 렌더링 엔진이 HTML을 파싱하여 DOM 노드로 이루어진 트리 생성
>
> Render tree 생성: css 파일과 inline 스타일을 파싱, DOM + CSSOM을 결합해 렌더 트리를 생성
>
> Layout (reflow): 각 노드들의 스크린에서의 좌표에 따라 위치 결정
>
> Paint (repaint): 실제 화면에 그리기

![IMG_0287](https://user-images.githubusercontent.com/69200669/143768199-56fc523c-d712-4443-89ec-c684f920dad8.jpg)
![IMG_0288](https://user-images.githubusercontent.com/69200669/143768197-b705ce7e-a378-48f9-a627-35a1dd064eb5.jpg)
![IMG_0289](https://user-images.githubusercontent.com/69200669/143768195-062d5966-1799-4ac0-a59e-bf8097733a04.jpg)
![IMG_0290](https://user-images.githubusercontent.com/69200669/143768192-a2ea788f-f816-47d3-9350-d1ca324ed032.jpg)
![IMG_0291](https://user-images.githubusercontent.com/69200669/143768190-f68205b0-b629-4aa7-bbec-2d8985d464d5.jpg)
![IMG_0292](https://user-images.githubusercontent.com/69200669/143768188-6bd71511-9088-45aa-ae2a-7f7a035a6add.jpg)
