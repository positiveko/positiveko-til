# Safari 사파리에서 overflow: hidden, border-radius 에러 해결

크롬은 괜찮은데, 사파리에서 `border-radius`를 주고 `overflow: hidden`을 준 경우
border-radius 적용이 되지 않는 에러가 발생한다.
분명 border-radius는 적용이 되는 것으로 보이나, overflow: hidden이 적용되지 않는 것으로 보아 레이어 간의 생성 순서가 사파리에서는 다르게 적용되는 것처럼 보였다.

사파리 렌더링 엔진 Webkit의 버그라고 한다.
[여기](https://stackoverflow.com/questions/49066011/overflow-hidden-with-border-radius-not-working-on-safari)를 참고해서 해결한 방법으로는 border-radius와 overflow: hidden이 적용되는 element에 다음과 같은 프로퍼티를 추가하는 것이다.

1) `will-chage: transform` 
엘리먼트에 어떤 변경을 할 것인지 미리 브라우저에 알려주는 will-change 프로퍼티를 추가한다.
will-change 프로퍼티는 애니메이션 처럼 처리 비용이 큰 작업이 실제로 시작되기 전에 브라우저가 미리 준비할 수 있도록 해주기 때문에 적절하게 최적화할 수 있다. 가끔 애니메이션을 과도하게 넣었을 때(GPU 가속을 이용하더라도) 엘리먼트가 깜빡이는 증상이 일어나는 경우, 혹은 1초 정도의 지연 현상이 일어나는 경우에 will-change 프로퍼티를 사용해주면 비교적 부드럽게 화면을 처리할 수 있다.

결과적으로 이 프로퍼티를 넣는 것만으로도 transform을 추가해주지 않아도 문제는 해결된다.
다만, will-change를 사용하는 경우 오히려 성능 저하가 발생하고 감지할 수 없는 사이드이펙트가
발생할 수 있으므로 2번 방법을 사용하게 되었다.
(1-2개 정도의 사용은 성능 저하를 일으키지 않겠지만... 다른 방법이 있다면 굳이..?)

2) `isolate: isolate`
[MDN](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)을 참고하면 '쌓임 맥락'이라는 개념과 관련된 것이다.
`쌓임 맥락 stacking context`은 z-index에 따라 특정 요소의 렌더링 순서가 영향을 받는 것과 관련이 있다. 쌓임 맥락 자체가 부모에게만 의미가 있으므로(z-index의 기준이 되는 부모) 문제가 되는 요소에 그 맥락을 빠져나오도록 할 때에 쓰는 `isolate: isolate`을 적용해주면 
다른 요소의 쌓임 맥락에 의해 영향을 받아 나타나는 에러를 해결할 수 있다.

3) z-index 설정
마찬가지로 쌓임 맥락을 고려해서, z-index를 최대한으로 높이거나 0으로 주는 등의 방법으로도 해결이 가능하다는 답변이 있었지만 내 경우에는 통하지 않았다.