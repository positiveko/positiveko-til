# TCP/IP는 프로토콜의 집합

> Transmission Control Protocal, 전송 제어 프로토콜

HTTP를 이해하기 위해선 TCP/IP 프로토콜에 대해 알고 있어야 한다.
인터넷을 포함하여 일반적으로 사용하는 네트워크는 TCP/IP 프로토콜에서 움직이며 HTTP는 그 중 하나다.
HTTP는 애플리케이션 계층 프로토콜이며, 네트워크 통신의 핵심적인 세부사항에 대해서 신경 쓰지 않는다. 대신 대중적이고 신뢰성 있는 인터넷 전송 프로토콜인 TCP/IP에게 맡긴다.

## TCP/IP 정의

> TCP와 IP가 층을 이루는 패킷 교환 네트워크 **프로토콜의 집합**
>
> 인터넷에서 컴퓨터들이 서로 정보를 주고 받는 데 쓰이는 **프로토콜의 집합**

컴퓨터와 네트워크 기기가 서로 소통하기 위해서는 서로 같은 방법으로 통신해야 한다.
이렇게 서로 다른 하드웨어와 운영체제 등을 가지고 서로 통신을 하기 위해서는 규칙이 필요한데, 이러한 규칙을 **프로토콜**이라고 한다.
즉, TCP/IP는 각 네트워크와 하드웨어의 특성을 숨기고, 어떤 종류의 컴퓨터나 네트워크든 서로 신뢰성 있는 의사소통을 하게 해 준다.
일단 TCP 커넥션이 맺어지면 클라이언트와 서버 컴퓨터 간에 교환되는 메시지가 없어지거나 손상되거나 순서가 뒤바뀌어 수신되는 일은 결코 없다.

프로토콜에는 여러가지가 있다. 그 중에서도 인터넷과 관련된 프로토콜을 모은 것을 TCP/IP라고 부른다.

TCP/IP는 프로토콜의 집합이다. 인터넷과 관련되어 IP 프로토콜을 사용한 통신에서 사용되고 있는 프로토콜을 통칭해서 TCP/IP라고 부른다.

TCP는 다음을 제공한다.

- 오류 없는 데이터 전송
- 순서에 맞는 전달 (데이터는 언제나 보낸 순서대로 도착)
- 조각나지 않는 데이터 스트림 (언제나 어떤 크기로든 보낼 수 있다)

<u>즉 TCP는 연결지향형 프로토콜이자, 신뢰할 수 있는 프로토콜이다.</u>
요즘 세상에 우리는 엄청나게 큰 데이터를 주고 받는다. 그래서 한 개의 패킷으로만 이 모든 데이터를 주고받는 것은 힘들다. 그래서 데이터를 잘게 쪼개서 패킷 단위로 통신하게 된다.

그런데 이런 패킷들은 엄청나게 복잡한 인터넷을 통해 목적지로 이동하게 되는데, 이러한 환경에서 **데이터들이 유실되지 않고 올바른 순서대로 도착할 수 있게 해주는 것이 TCP다.**
TCP는 원활한 통신을 위해 전송하는 데이터 흐름을 제어하고, 네트워크의 혼잡 상태를 파악해서 대처하는 기능을 프로토콜 자체에 포함하고 있다.
이런 신뢰할 수 있는 TCP 덕분에 개발자는 패킷이 유실될 상황을 신경쓰지 않고도 온전히 상위 레이어의 동작에만 집중할 수 있게 된다.

## 패킷의 흐름과 혼잡을 컨트롤하는 TCP

TCP는 흐름제어, 오류제어, 혼잡제어를 통해 신뢰성 있는 데이터 전송을 보장할 수 있게 해준다.

### 흐름 제어

송신측과 수신측 사이의 데이터 처리 속도 차이(흐름)을 제어하기 위한 기법으로 데이터 처리 속도를 조절하여 수신자의 버퍼 오버플로우를 방지한다.

### 오류 제어

TCP는 기본적으로 ARQ(Automatic Repeat Request) 재전송 기반 오류 제어를 사용해서 통신 중에 오류가 발생하면 송신 측이 수신 측에게 해당 데이터를 다시 전송하게 한다.

### 혼잡 제어

송신측의 데이터 전달과 네트워크 데이터 처리 속도를 해결하기 위한 기법이다.
한 라우터에게 데이터가 몰려 모든 데이터를 처리할 수 없는 경우, 호스트들은 재전송을 하게 되고 결국 혼잡을 가중시켜 오버플로우나 데이터 손실이 발생한다.
이러한 네트워크의 혼잡을 피하기 위해 송신측에서 보내는 데이터의 전송 속도를 제어하는 것이 혼잡 제어의 개념이다.

## 연결지향형 프로토콜: 
TCP 프로토콜은 데이터를 전송하기 전에 송신측과 수신측이 서로 연결되는 과정이 필요한데, 이러한 작업을 3-way Handshaking이라고 부른다.

## 계층으로 관리하는 TCP/IP

TCP/IP는 계층으로 나뉘어져 있다. 계층화된 이유는 어디선 거 사양이 변경 되었을 때 전체를 바꿀 필요 없이 해당 계층만 바꾸면 되기 때문이다. 각 계층은 연결되어 있는 부분만 결정되어 있어서 각 계층의 내부는 자유롭게 설계할 수 있다.
또 계층화하면 서로의 역할을 독립적으로 담당하기 때문에 설계를 편하게 할 수 있다는 장점이 있다.

| 계층              | 내용                                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 애플리케이션 계층 | 유저에게 제공되는 애플리케이션에서 사용하는 통신의 움직임 결정 (HTTP, DNS, FTP, SSH, Telnet, SMTP)<br> 특정 서비스를 제공하기 위해 애플리케이션끼리 정보를 주고 받을 수 있게 해줌 |
| 트랜스포트 계층   | 애플리케이션 계층에 네트워크로 접속되어 있는 2대의 컴퓨터 사이의 데이터 흐름 제공 (TCP, UDP, RTP, RTCP)<br> 송신된 데이터를 수신 측 애플리케이션에 확실히 전달하게 함             |
| 네트워크 계층     | 네트워크 상에서 패킷(전송 데이터의 최소 단위)의 이동을 다룸(IP, ARP) <br>수신 측까지 데이터를 전달하기 위해 사용                                                                  |
| 링크 계층         | 네트워크에 접속하는 하드웨어적인 면을 다룸 (네트워크를 위한 링크 인터페이스) <br>네트워크에 직접 연결된 기기 간 전송을 할 수 있도록 함                                            |

![TCP/IP Flow](https://docs.oracle.com/cd/E26505_01/html/E27061/figures/ipov.fig88.png)
[출처](https://docs.oracle.com/cd/E26505_01/html/E27061/ipov-29.html)

TCP/IP로 통신을 할 때 계층을 순서대로 거쳐서 통신한다. 송신하는 측은 애플리케이션 계층에서부터 내려가고, 수신하는 측은 애플리케이션 층으로 올라간다.

1. 송신측 클라이언트의 애플리케이션 계층(HTTP)에서 어느 웹페이지를 보고 싶다는 HTTP 리퀘스트 지시
2. 트랜스포트 계층(TCP)에서 애플리케이션 계층에서 받은 데이터(HTTP 메시지)를 통신하기 쉽게 조각내어 IP 주소와 포트 번호를 붙여 네트워크 계층에 전달
3. 네트워크 계층(IP)에서는 수신지 MAC 주소를 추가해서 링크 계층에 전달
4. 수신측 서버는 링크 계층에서 데이터를 받아 들여 순서대로 위의 계층에 전달하여 애플리케이션 계층까지 도달
5. 애플리케이션 계층에 도달하면 클라이언트가 발신했던 HTTP 리퀘스트 내용 수신

HTTP가 메시지를 전송할 경우, 현재 연결된 TCP 커넥션을 통해서 메시지 데이터의 내용을 순서대로 보낸다.
TCP는 세그먼트라는 단위로 데이터 스트림을 잘게 나누고, 세그먼트를 IP 패킷이라고 불리는 봉투에 담아서 인터넷을 통해 데이터를 전달한다.
즉, TCP 세그먼트는 하나의 IP 주소에서 다른 IP 주소로 IP 패킷에 담겨 전달된다.

---

#### reference

[패킷의 흐름과 오류를 제어하는 TCP](https://evan-moon.github.io/2019/11/22/tcp-flow-control-error-control/)

[TCP (흐름제어/혼잡제어/오류제어)
](https://velog.io/@jsj3282/TCP-%ED%9D%90%EB%A6%84%EC%A0%9C%EC%96%B4%ED%98%BC%EC%9E%A1%EC%A0%9C%EC%96%B4-%EC%98%A4%EB%A5%98%EC%A0%9C%EC%96%B4)
