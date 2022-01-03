# 이벤트 타입

## 마우스 이벤트

| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| click  | 클릭  |
| dbclick  |  더블 클릭 |
| mousedown  | 버튼 눌렀을 때  |
| mouseup  | 누르고 있던 버튼을 놓았을 때  |
| mousemove  | 커서를 움직일 때  |
| mouseout  |  HTML 요소 밖으로 이동했을 때 (버블링 O) |
| mouseover  | HTML 요소 안으로 이동했을 때 (버블링 O)  |
| mouseenter  |  HTML 요소 안으로 이동했을 때 (버블링 X)|
| mouseleave  |  HTML 요소 밖으로 이동했을 때 (버블링 X) |

## 키보드 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
|  keydown | 모든 키를 눌렀을 때  |
|  keyup |  누르고 있던 키를 놓았을 때 |

## 포커스 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| focus  | HTML 요소가 포커스를 받았을 때 (버블링 X)   |
| blur  | HTML 요소가 포커스를 잃었을 때 (버블링 X)   |
|  focusin |  HTML 요소가 포커스를 받았을 때 (버블링 O)  |
|  focusout |   HTML 요소가 포커스를 잃었을 때 (버블링 O) |

## 폼 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| submit  | form 안의 submit 버튼을 클릭 |

## 값 변경 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| input  | input, select, textarea 요소의 값이 입력되었을 때(사용자가 입력되고 있을 때) |
| change | input, select, textarea 요소의 값이 변경되었을 때(input과는 달리 HTML 요소가 포커스를 잃었을 때, 입력이 종료되어 값이 변경되었을 때)  |
| readystatechange  | HTML 문서의 로드와 파싱 상태를 나타내는 document.readyState 프로퍼티 값이 변경될 때('loading', 'interactive', 'complete')  |

## DOM 뮤테이션 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| DOMContentLoaded  | HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료되었을 때 |

## 뷰 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| resize  | 브라우저 윈도우의 크기를 리사이즈할 때 연속적으로 발생(window 객체 한정) |
| scroll  | 웹페이지(document) 또는 HTML 요소를 스크롤할 때 연속적으로 발생 |

## 리소스 이벤트
| 이벤트 타입  |  이벤트 발생 시점 |
|---|---|
| load  | DOMContentLoaded 이벤트가 발생한 후, 모든 리소스(이미지, 폰트 등)의 로딩이 완료되었을 때 (주로 window 객체에서 발생)  |
| unload  |  리소스가 언로드 될 때 (새로운 웹페이지를 요청한 경우) |
| abort  | 리소스 로딩이 중단되었을 때  |
| error  | 리소스 로딩이 실패했을 때  |
