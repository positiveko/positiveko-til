# RESTful

RESTful이란 REST의 기본 원칙을 지킨 서비스 디자인을 말한다.

## REST란?

> REpresentational State Transfer 자원(리소스)의 표현에 의한 상태(정보) 전달
> 
> REST란 웹에 존재하는 모든 자원에 고유한 URI를 부여하여 자원에 대한 주소를 지정하는 방법론, 또는 규칙
> 
> 네트워크 리소스를 정의하고 처리하는 방법을 설명하는 일련의 원칙을 기반으로 한 아키텍처 스타일

REST는 로이 필딩이라는 HTTP의 주요 저자가 웹이 HTTP를 제대로 활용하지 못하는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로서 2000년 처음으로 소개되었다. 

즉 REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

```js
/courses/calendar  // 코스 일정에 대한 정보
/courses/reservation // 코스 예약에 대한 정보
/courses/refund // 코스 환불에 대한 정보
```

이처럼 리소스를 URI에 표현해서, 위의 주소를 보면 주고 받을 정보에 대해 어느 정도 예측할 수 있게 된다. 

## REST API의 구성

|구성 요소|내용|표현 방법|
|------|---|---|
|자원|자원|URI (엔드포인트)|
|행위|자원에 대한 행위|HTTP 요청 메서드|
|표현|자원에 대한 행위의 구체적 내용|페이로드|

REST는 자원, 행위, 표현 3가지 요소로 구성되어 REST API만으로 HTTP의 요청 내용을 이해할 수 있게 한다.

즉 REST란
1. HTTP URI를 통해 자원을 명시하고
2. HTTP Method를 통해
3. 해당 자원(URI)에 대한 CRUD를 적용하는 것을 의미한다.

## REST API 설계 원칙
REST에서 가장 중요한 기본적인 원칙은 2가지다.
1) URI는 리소스를 표현하는 데 집중하고,
2) 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 규칙이다.

### 1) URI는 리소스를 표현해야 한다
URI는 리소스를 표현하는 데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. 따라서 이름에 get 같은 행위에 대한 표현이 들어가서는 안 된다.

```
# bad
GET /getSth

# good
GET /sth
```

### 2) 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다. 주로 5가지 요청 메서드 (GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현한다.

|HTTP 요청 메서드|종류|목적|페이로드|
|------|---|---|---|
|GET|index/retrieve|모든/특정 리소스 취득|X|
|POST|create|리소스 생성|O|
|PUT|replace|리소스의 전체 교체|O|
|PATCH|modify|리소스의 일부 수정|O|
|DELETE|delete|모든/특정 리소스 삭제|X|

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다. 

```
# bad
GET /getSth/delete/1

# good
DELETE /sth/1
```

```
GET /tickets - Retrieves a list of tickets
GET /tickets/12 - Retrieves a specific ticket
POST /tickets - Creates a new ticket
PUT /tickets/12 - Updates ticket #12
PATCH /tickets/12 - Partially updates ticket #12
DELETE /tickets/12 - Deletes ticket #12
```

## REST의 특징

### 1) Server-Client(서버-클라이언트 구조)
클라이언트, 서버, 리소스로 구성된 클라이언트-서버 아키텍처가 필요하다.

### 2) Stateless(무상태)
요청이 통과하는 서버에 클라이언트 콘텐츠가 저장되지 않는 stateless 클라이언트-서버 커뮤니케이션이 필요하다. 대신 세션의 상태에 대한 정보가 클라이언트에 저장된다.

### 3) Cacheable(캐시 처리 가능)
일부 클라이언트-서버 간 상호 작용의 필요성을 제거할 캐시 가능 데이터가 필요하다.

### 4) Layered System(계층화)
클라이언트-서버 간의 상호 작용을 계층적으로 조정할 수 있도록 계층화된 시스템 제약이 필요하다.

### 5) Uniform Interface(인터페이스 일관성)
애플리케이션 요구 사항별로 다른 형식이 아닌, 표준화된 형식으로 정보를 전송할 수 있도록 구성 요소 간 통합된 인터페이스가 필요하다. REST를 처음으로 제시한 Roy Fielding은 이를 “REST 아키텍처 스타일을 다른 네트워크 기반 스타일과 차별화하는 핵심적인 기능”이라고 설명한다.


#### References
[Best Practices for Designing a Pragmatic RESTful API](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)