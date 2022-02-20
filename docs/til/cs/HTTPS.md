# HTTPS

## HTTPS?

> HyperText Transfer Protocol Secure
>
> HTTP에 **SSL (보안 소켓 계층)** 사용해서 HTTP를 보완하는 수단
>
> SSL은 서버와 브라우저 사이에 **안전하게 암호화된 연결**을 만들 수 있게 도와주고, 서버와 브라우저가 민감한 정보를 주고받을 때 **해당 정보가 도난당하는 것을 막아줌**

![https](https://i.imgur.com/tq9mmGg.png)
![https](https://i.imgur.com/4GHgl0T.png)

[출처](https://wayhome25.github.io/cs/2018/03/11/ssl-https/)

<u>전송되는 데이터가 암호화되지 않는 HTTP의 단점을 보완</u>해서 안전하게 암호화된 연결을 만들 수 있게 도와줌.

HTTP 자체를 암호화하는 것이 아니라 body를 암호화 (header는 암호화되지 않음). HTTPS는 HTTP의 하부에 SSL과 같은 보안계층을 제공하면서 동작.

## HTTPS를 사용하는 이유

### 1. 보안성

HTTP에서는 해커가 전송 중간에서 응답을 가로챌 수 있으나, HTTPS에서는 암호화된 데이터를 전송하기 때문에 외부의 공격자가 알기 어려움.

### 2. SEO 최적화

구글은 HTTPS 웹 사이트에 가산점을 줌. 이는 결국 사용자들 또한 안전하다고 생각하는 사이트를 더 많이 방문하기 때문.

또한 가속화된 모바일 페이지 (AMP, Accelerated Mobile Pages)를 만들고 싶을 때에도 HTTPS를 사용해야 함. AMP란 모바일 기기에서 더 빠르게 콘텐츠를 로딩하기 위해 구글이 만든 것.

## SSL/TLS?

SSL의 업그레이드 버전이 TLS. 둘을 거의 구분하지 않고 언급한다.
Secure Sockets Layer. 웹 서버와 웹 브라우저간의 보안을 위해 만든 프로토콜
공개키/개인키 대칭키 기반으로 사용함

- 통신 내용이 노출, 변경되는 것을 방지
- 클라이언트가 접속하려는 서버가 신뢰 할 수 있는 서버인지 확인가능
- SSL 통신에 사용할 공개키를 클라이언트에게 제공한다.

![ssl](https://i.imgur.com/YIfy1wK.png)
