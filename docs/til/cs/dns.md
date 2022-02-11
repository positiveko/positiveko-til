# DNS 

> Domain Name System의 약자로 도메인 주소를 IP 주소와 연결해주는 시스템이다. 할당된 도메인 영역에 대한 정보를 갖고 있는 서버로, 주로 도메인을 IP 주소로 변환하는 역할을 한다.

DNS의 주요 목적은 사람들이 쉽게 사이트 주소를 찾을 수 있도록 IP 주소와 도메인 주소를 연결해주는 것이다. 모든 사이트의 IP 주소를 외우는 것보다 도메인 주소로 접속하는 것이 더 간단하다.

## DNS 기록을 찾기 전 캐시 확인

DNS 기록을 찾기 위해서 브라우저는 4개의 캐시를 확인하게 되는데,

1) 브라우저 캐시
   DNS 쿼리는 먼저 브라우저 캐시를 확인한다. 브라우저는 이전에 방문한 웹사이트의 DNS 기록을 일정 기간 동안 저장한다.
2) OS 캐시 
   브라우저는 컴퓨터 OS 캐시를 확인한다. 브라우저 캐시에 원하는 DNS 코드가 없다면, 브라우저가 내 컴퓨터 OS에 시스템 호출을 통해 DNS 기록을 가져온다. 
3) 라우터 캐시
   브라우저는 라우터 캐시를 확인한다. 만약 컴퓨터에도 원하는 DNS 레코드가 없다면, 브라우저는 라우터에서 DNS 기록을 저장한 캐시를 확인한다.
4) ISP 캐시
   ISP 캐시를 확인한다. 만약 위의 모든 단계에서 DNS 기록을 찾지 못한다면, 브라우저는 ISP에서 DNS 기록을 찾는다. ISP(Internet Service Provider)는 DNS 서버를 갖고 있는데, 해당 서버에서 DNS 기록 캐시를 검색할 수 있다.

이 과정을 거쳐도 캐시가 없다면, ISP의 DNS 서버가 DNS 쿼리로 해당 URL을 호스팅하는 서버의 IP 주소를 찾는다.
DNS 쿼리는 웹사이트에 대한 IP 주소를 찾기 위해 여러 DNS 서버를 검색한다. 이 과정에서 필요한 IP 주소를 찾을 수 없다는 응답을 받으면서 DNS 서버를 옮겨가며 검색을 반복적으로 지속하는데, 이러한 유형의 검색을 **재귀적 질의**라고 한다.

## DNS 동작 과정

아래는 www.naver.com의 IP 주소를 찾는 과정을 이미지화한 것이다.

![dns](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJFEIQ%2FbtqzdzhQZ5I%2FE4a51bkPCaNfkiJV50yrak%2Fimg.png)
[출처](https://peemangit.tistory.com/52)

1) 루트 DNS
   루트 DNS 서버는 최상위 도메인이 .com인 것을 확인 후에 '.com'이 등록된 네임 서버의 IP Address를 전달한다. 즉 com 도메인을 관리하는 DNS 서버에 문의해보라고 로컬 DNS 서버에게 .com DNS 서버의 IP 주소를 알려주는 것이다.
2) com DNS
   로컬 DNS 서버는 이제 com DNS 서버에게 해당 url을 문의한다. com DNS 서버에도 해당 url이 없으므로 "naver.com"을 관리하는 DNS 서버에게 문의하도록 로컬 DNS 서버에게 naver.com DNS 서버의 IP 주소를 알려준다.
3) naver.com DNS
   로컬 DNS 서버는 이제 naver.com DNS 서버에게 해당 url을 문의한다. 'www.naver.com'에 대한 IP 주소를 받는다.

이러한 과정을 재귀적 질의, recursive query라고 하는 것이다.


