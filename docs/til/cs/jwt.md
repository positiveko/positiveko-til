# JWT

## What is JSON Web Token?

JSON Web Token (JWT)란 JSON 포맷을 활용하여 컴팩트하고 self-contained한 방식으로 당사자 간의 정보를 안전하게 전송하는 개방형 표준이다.

즉, JWT는 JSON 객체를 암호화하는 표준이며, 인증을 처리하는 데에 사용 된다.

## When should you use JWT?

### Authorization

가장 흔하게 JWT가 사용되는 방식은 사용자가 로그인 했을 때 서버에서 JWT가 포함된 리스폰스를 보내고 그 후부터는 사용자가 HTTP 요청을 할 때 받아 놓은 JWT를 같이 보내서 서비스와 리소스에 액세스할 수 있도록 하는 것이다.

### Information Exchange

JWT는 당사자 간에 정보를 안전하게 전송할 수 있도록 해준다. JWT는 public/private key pairs를 사용해서 서명할 수 있기 때문에 보낸 사람이 누구인지 확인할 수 있기 때문이다. 또한 header와 payload로 서명을 확인하면서 콘텐츠가 변조되지 않았는지도 확인할 수 있다.

## What is the JSON Web Token structure?

![JWT](https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-5.png)

JWT는 dot(.)으로 구분된 3가지 파트로 구성된다.

- Header
- Payload
- Signature다.

```
header.payload.signature
```

### Header

헤더에는 일반적으로 토큰 유형(eg. JWT)과 HMAC, SHA256과 같은 서명 알고리즘으로 구성된다.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

여기서 alg는 Signature를 해싱하기 위한 알고리즘을 지정하는 것이다.
타입과 해싱 알고리즘을 지정한 JSON은 Base64Url로 인코딩되어 JWT의 첫 번째 부분을 형성한다.

### Payload

토큰의 페이로드에는 토큰에서 사용할 정보들의 조각인 Claim이 담긴다.
클레임은 3가지로 나뉘며 다수의 정보를 넣을 수 있다.

- Registered claims
  registered claim은 토큰 정보를 표현하는 등록된 데이터들로, 선택적으로 작성할 수 있다.
  [여기](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)에서 다양한 registered claim을 확인할 수 있다.

```
iss: 토큰 발급자 (issuer)
sub: 토큰 제목 (subject)
aud: 토큰 대상자 (audience)
exp: 토큰 만료 시간 (expiration)
nbf: 토큰 활성 날짜 (not before)
iat: 토큰 발급 시간 (issued at)
```

- Public claims
  사용자 정의 클레임으로 공개용 정보다. 충돌 방지를 위해 URI 포맷을 이용한다.

```
{ "https://positiveko-til.vercel.app/": true }
```

- Private claims
  비공개 클레임은 사용자가 정의하는 클레임으로 서버와 클라이언트 사이에 임의로 지정한 정보를 저장한다.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

### Signature

서명은 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드다. 서명은 위에서 만든 헤더와 페이로드 값을 각각 Base64Url로 인코딩하고, 인코딩한 값을 비밀 키를 이용해서 헤더에서 정한 알고리즘으로 해싱하여 이 값을 다시 Base64Url로 인코딩함으로써 생성된다.

## Advantages of JWT

### Stateless, Scalable, and Decoupled

쿠키보다 토큰을 사용하는 가장 큰 이유는 토큰 인증이 **stateless**하기 때문이다. 백엔드는 토큰에 대한 기록을 보관할 필요가 없다. 각 토큰은 self-contained하기 때문에 유효성을 확인하는 데 필요한 모든 데이터가 들어있고 claim을 통해서 사용자 정보를 전달한다.

단지 서버의 작업은 로그인 요청에서 서명된 토큰을 발행하고, request의 토큰이 유효한지 확인만 하면 된다.

### Cross Domain and CORS

쿠키는 domain과 sub-domain에서는 잘 작동하지만 서로 다른 도메인에서는 문제가 발생한다. 하지만 CORS가 활성화된 토큰 기반 접근 방식은 어떠한 도메인에서 요청이 오더라도 상관이 없다.

### Store Data in the JWT

쿠키 기반에서는 단순히 sessionID를 쿠키에 저장하기만 한다. 하지만 JWT에서는 유효한 JSON이라면 어떤 종류의 메타데이터든 넣을 수 있다. JWT에서는 registered, public, private 등 다양한 유형의 클레임을 지정할 수 있기 때문이다.

실제로 JWT에는 모든 유형의 데이터를 포함할 수 있다는 것을 의미한다. 케이스에 따라 사용자 id나 토큰 만료와 같은 최소한의 클레임을 수행할 수도 있지만, 토큰을 발행한 사용자나 범위, 사용자 권한과 같은 추가 클레임을 포함할 수 있다.

### Performance

쿠키 기반 인증을 사용할 때 벡엔드는 기존 SQL 데이터베이스든 NoSQL 대안이든 조회를 수행해야 한다. 또한 토큰을 디코딩하는 것에 비해 더 많은 작업을 수행해야 한다.

예를 들어서 관리자만 볼 수 있는 데이터에 액세스 요청이 들어왔다고 하자. 그러면 쿠키 기반 접근법에서는 일단 요청이 이뤄졌을 때 세션이 유효한지 확인하기 위해 데이터베이스에 한 번 확인하고, 사용자 데이터를 가져와서 해당 사용자가 관리자 역할을 하는지 한 번 더 확인하고, 마지막으로 데이터를 가져오기 위해 세 번째 호출을 해야 한다.
하지만 JWT에서는 JWT에 사용자 역할을 저장할 수 있으므로 요청 한 번에 JWT 토큰을 확인하고 데이터베이스에서 바로 데이터를 가져올 수 있다.

### Mobile Ready

브라우저와 iOS 및 antroid와 같은 네이티브 모바일 플랫폼 모두를 지원할 수 있다. 쿠키로는 네이티브 모바일 플랫폼에 사용하기에 제한 사항이 있을 수 있는데 토큰은 iOS와 안드로이드 모두에서 구현하기가 훨씬 더 쉽다.

## Disadvantages of JWT

### Self-contained JWT size

토큰 인증의 가장 큰 단점은 JWT 토큰의 사이즈가 세션 쿠키의 사이즈보다 상대적으로 크다는 점이다. self-contained해서 토큰 자체에 정보를 담고 있기 때문에 그 큰 사이즈가 문제될 수 있다.
토큰에 클레임을 많이 추가할수록 서버에 대한 각 요청에 JWT가 포함되기 때문에 네트워크에 부하를 줄 수 있다.

### Payload

페이로드는 암호하가 아닌 Base64Url로 인코딩 된 것이다. 따라서 중간에 페이로드를 탈취해서 디코딩하면 데이터를 그대로 볼 수 있기 때문에 페이로드에 민감한 정보를 넣어서는 안된다.

### Stateless

JWT는 한 번 만들어지면 제어가 불가능하다. 따라서 토큰을 서버에서 임의로 삭제할 수 없으므로 토큰 만료 시간을 꼭 설정해야 한다.

## Results

기존의 서버(세션)기반 인증 시스템에는 여러 문제점이 있었다.

- 세션: 사용자가 인증을 하게 되면 세션 정보를 서버 메모리에 저장하게 된다. 로그인 중인 사용자가 늘어나면 서버의 RAM에 부하가 걸린다. 이를 피하기 위해서 데이터 베이스에도 저장할 수 있지만 역시 데이터 베이스에도 무리를 줄 수 있다. 또한 더 많은 트래픽을 처리하기 위해 서버를 확장하는 설계 또한 매우 어렵다.
- CORS: 쿠키는 단일 도메인 및 서브 도메인에서만 작동하도록 설계되어 있는데, 여러 도메인에서 관리하는 것이 번거롭다.

따라서 이러한 서버기반 인증 시스템의 한계를 보완하기 위해 토큰 기반 인증 시스템을 사용하게 되었다.

stateless하게 서버와 무관하게 사용자 인증을 처리할 수 있게 되었으며 CORS에서도 문제가 없었다. 하지만 토큰에서도 보안성에 대한 문제는 여전하다. 따라서 민감한 정보는 토큰에 담지 않고 매번 전송되는 JWT의 사이즈를 최소한으로 유지하여 서버에 무리가 되지 않도록 하는 것이 중요하다.

---

#### References

- [jwt.io](https://jwt.io/introduction)
- [Cookies vs. Tokens: The Definitive Guide](https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide)
