# CORS와 SOP

![CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)
[출처](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

## Same-origin Policy 동일 출처 정책

동일 출처 정책이란 웹 브라우저에서 보안을 위해 `Protocol`, `Host`, `Port`가 동일한 서버로만 요청과 응답을 할 수 있도록 한 정책이다.

![URI](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL/mdn-url-all.png)
[출처](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

따라서 프로토콜, 호스트, 포트 중 하나라도 다르다면 SOP 정책 하에서 상호작용을 허가하지 않는다.

## CORS

> 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다. 웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 실행합니다. <br> -MDN

즉, Same-Origin Policy의 단점을 보완하는 정책인 CORS는 cross-origin 출처가 다른 도메인에서의 AJAX 요청이라도 서버에서 HTTP 헤더를 사용해서 데이터 접근 권한을 허용하는 정책이다.

CORS에 필요한 헤더 목록은 다음과 같다.
- Origin
- Access-Control-Allow-Origin
- Access-Control-Allow-Credentials
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Max-Age
- Access-Control-Request-Method
- Access-Control-Request-Headers

### Pre-flight OPTIONS 요청

하지만 이는 유용하면서도 보안상의 문제점을 가지고 있다. 웹사이트에서 악의적인 목적으로 외부로 정보를 보내거나 하는 등의 요청을 보낼 수 있기 때문이다. 따라서 real.com이라는 웹사이트에서 사용되는 api를 fake.com라는 사이트에서 사용하고 싶다면, real.com에 먼저 자신이 요청을 보내도 되는지 물어본다.

이 과정을 pre-flight라고 부른다. 

fake.com에서 real.com에 요청을 보낼 때 HTTP Header에 메소드 **OPTIONS**로 `{ Origin: fake.com }`으로 요청하는 출처를 명시하고, 서버가 응답을 보낼 때 HTTP Header에 `{ Access-Control-Allow-Origin : fake.com }` 혹은 `{ Access-Control-Allow-Origin : * }`을 적어 CORS를 허용해준다.
그러면 브라우저에서 이 HTTP 헤더를 읽고 요청을 승인한다. 브라우저가 이 pre-flight를 승인하면 비로소 원래의 HTTP 요청을 서버로 보낸다. 

즉, 브라우저는 OPTIONS를 pre-flight하여 서버에서 허용하는 옵션을 미리 확인하고, 허용되지 않은 요청의 경우 405(Method Not Allowed)에러를 발생시키고 실제 요청은 전송하지 않는다.

![alt](https://miro.medium.com/max/1400/1*IVg6IgfAVl4ll59nmeB54g.png)

## 해결 방법

CORS 이슈가 발생했을 때 해결하는 방법은 다음과 같다.

### 출처를 동일하게 일치

교차되는 출처를 동일하게 일치시켜서 Same-origin으로 만들 수 있다면 이 에러는 나지 않는다. 

### 서버에서 HTTP 헤더 추가
헤더에 Access-Control-Allow-Origin을 추가해서 해당 URI 혹은 전체 URI(*)를 허용하도록 명시해준다. 이 응답 헤더로 해당 origin의 요청을 허용할 수 있게 된다.

### Proxy 설정
프록시는 서버와 클라이언트 사이에서 중계 역할을 한다. 기본적으로 클라이언트의 리퀘스트를 서버에 전송하고 서버의 리스폰스를 클라이언트에 전송하는 역할을 한다.

프록시는 주로 보안을 위해 사용하게 되는데, 그 과정에서 데이터를 캐시로 저장해 오리진 서버를 거치지 않고도 클라이언트로 데이터를 보내며 효율적으로 API 연결을 할 수 있습니다. 또한 클라이언트의 origin을 변경해서 서버에 보내주거나 데이터를 바꿀 수도 있으며, 특정 웹사이트에 대한 접근을 막기도 한다.

프론트엔드 단에서 프록시를 백엔드 서버의 프로토콜, 호스트, 포트에 맞게 설정하여 CORS 에러를 피해갈 수 있다. 하지만 프론트엔드 단에서 설정한 프록시 만으로는 production 단계에서는 적용할 수 없기 때문에 주의해야 한다.