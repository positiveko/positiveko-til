# 모노레포 툴: 모노레포 구축을 위해 어떤 도구를 사용할 것인가?

## 2021 모노레포 툴 순위

![ranking](https://ifh.cc/g/aOP7NJ.jpg)
![ranking](https://ifh.cc/g/WLKWVB.jpg)

[출처](https://2021.stateofjs.com/en-US/libraries/monorepo-tools/)

- 2021년 기준 Lerna와 Yarn Workspaces를 가장 보편적으로 사용하고 있다.
- 만족도는 pnpm, turborepo, nx, npm workspace, yarn workspace 순으로 만족도가 높았다.

## Yarn workspace

[Yarn workspace 공식 문서](https://classic.yarnpkg.com/en/docs/cli/)

- Yarn은 유일하게 Mono-Repo 기능을 지원하고 Yarn Workspace의 목적은 Mono-Repo의 Workflow를 용이하게 하는 것이다.
- Yarn Workspace를 통해 각 패키지는 서로 참조하는 연관 관계를 가질 수 있다.
- NPM은 Version 7부터 worksapce 개념 제공

### Yarn 1.x

Yarn workspaces를 사용해 간단히 모노레포를 구성할 수 있다. yarn link을 사용해 node_modules 디렉터리에 workspace에 대한 심볼릭 링크가 생성된다. 모노레포의 여러 패키지들이 하나의 의존성을 갖도록 할 수 있다.

```md
{
    "private": true,
    "workspaces": ["packages/*"]
}
```
- Yarn은 1.22를 마지막으로 Classic버전의 관리를 중단 했습니다. 2.X 이후부터는 Yarn Modern(berry)이라 부르고 새로운 구조로 패키지를 관리합니다. 압축 파일을 통한 패키지 의존성 관리, pnp를 통한 zero-install이 주된 내용입니다.
- yarn은 1.22 버전 이후로 클래식 버전의 관리를 중단했다. 2.x 버전부터는 yarn berry라고 부르며 새로운 구조로 패키지를 관리한다. 압축 파일을 통해 패키지 의존성을 관리하고, pnp를 통해 zero-install 한다는 큰 특징을 갖는다. 
- 과거 yarn workspace는 lerna와 함께 써야했지만, yarn berry의 경우에는 plugin 시스템, 강화된 workspace 지원으로 lerna같은 추가 라이브러리가 없어도 모노레포 구조를 잘 지원한다. 

## Yarn Berry (2.x, 3.x)

[Yarn Berry 공식 문서](https://yarnpkg.com/cli)

- yarn의 두 번째 버전. 2018년 9월부터 시작해 TypeScript로 개발되어 2020년 1월 25일 정식 버전 출시. 

###  node_modules의 문제점
 - 의존성 탐색 알고리즘의 비효율: 
node.js에서 require() 함수를 실행하면 모듈을 찾을 때까지 상위 node_modules 디렉터리를 순회한다. 이때 느린 디스크 I/O 동작이 경로의 깊이만큼 발생한다.

 - 저장 공간과 설치 시간: 
node_modules 디렉터리는 흔히 매우 큰 공간을 필요로 하고, 그만큼 설치에도 오랜 시간이 걸린다.
- 유령 의존성(phantom dependency): 
의존성 중복 방지를 위해 호이스팅 기법을 이용하는데 이것은 의도치 않은 side effect을 발생시킨다. 아래 그림에서 package-1은 B(1.0)을 설치한 적이 없지만 require('B')가 작동한다. require('B')를 사용하는 경우 B(1.0)을 의존하던 패키지를 제거하면 B를 찾지 못하는 오류가 발생한다.

### Yarn Berry의 해결 방법 PnP

어떤 프로젝트를 구성하는 의존성은 결정적(deterministic)이다. Berry는 node_modules에 패키지 파일을 저장하는 대신 패키지의 압축 파일을 .yarn/cache 폴더에 수평적으로 저장하는 방식으로 위 문제를 해결했다. 이 방식을 Yarn은 Plug’n’Play(PnP)라고 부른다. 압축 파일은 ZipFS를 이용하며 해당 모듈 로드가 필요할 때 메모리에서 압축을 해제하여 접근한다.

### PnP로 얻는 것

- 빠른 의존성 검색: 의존성이 .yarn/cache에 수평적으로 존재하므로 모든 패키지에 대한 접근 시간이 O(1)이 된다. 따라서 require()에 소요되는 시간이 크게 단축된다.
- 빠른 설치: 압축 파일 단위로 설치되기 때문에 의존성을 구성하는 파일의 수가 절대적으로 감소한다. 여기에 zero-install 전략을 사용하면 아예 설치 과정을 생략할 수 있다.
- 유령 의존성 방지: 호이스팅을 사용하지 않기 때문에 의도하지 않은 의존성이 발생하지 않는다.

### zero-install 전략

node_modules에 존재하던 파일들을 zip파일로 압축해서 가지고 있어 용량이나 파일 수가 기존 대비 많이 줄어들었습니다. 각 패키지들간의 의존성은 .pnp.js라는 파일에서 일괄적으로 관리 해서 빠르고 명확하게 의존 관계를 정리한다.

하나의 압축 파일로 의존성을 관리하고 이 파일을 git으로 관리하면 설치 과정을 제거할 수 있는데 이와 같은 전략을 zero-install이라 한다. 이 전략의 장점은 다음과 같다.

다른 브랜치에서 새로운 의존성이 설치되었을 때 설치 과정 없이 바로 사용할 수 있다.

zero-install은 ci에서도 패키지 설치 단축을 위한 cache 공간이 필요 없고(저장소에서 checkout 받은 그대로 사용), 설치도 빠르기 때문에 배포에 필요한 시간을 줄일 수 있다.

(실제 적용했을때 설치에만 들어가는 시간이 70~80초 이상 줄어들기도 한다는 [사례](https://ghost-kr.channel.io/frontend_yarnberry/) )

> "workspace 또한 별개의 기능이 아니라 yarn berry에 내장되어 있기 때문에 러닝 커브가 낮았던 것도 이유 중 하나였습니다. 구체적인 케이스에 대한 레퍼런스를 찾기는 쉽지 않았지만 공식 문서가 어느 정도 잘 정리되어 있었기에 익히기 그리 어렵지 않았고, 간단한 프로토타이핑을 통해 실제 적용도 충분히 가능하겠다는 확신을 얻을 수 있었습니다."

### 단점

yarn berry의 장점을 하나 꼽으면, 패키지의 의도하지 않은 호이스팅을 허용하지 않는 것이라고 할 수 있는데요, 이 특성이 모노레포에서도 그대로 적용됩니다.

다른 방식으로 구축한 모노레포에서는 루트에 공통으로 쓸 패키지를 선언해 설치하고 각 프로젝트에서는 특별히 사용하는 패키지만 의존성에 추가하는 방식을 사용하는데, 이 방식은 node_modules가 패키지를 찾는 방식(= 호이스팅)에 기대고 있는 방식이라 yarn berry workspace로 구현한 모노레포에는 통하지 않습니다. 따라서 각 패키지에서 쓸 모듈은 루트에 패키지를 추가했는가와는 상관없이 무조건 하위 프로젝트의 의존성으로도 추가해 주어야 합니다.

이와는 정 반대로 몇몇 패키지는 각 프로젝트에서 필요한 의존성을 추가했음에도 실제로는 사용하는 모듈을 찾지 못하는 문제가 있는데요, 이때는 오류가 발생하는 경우 모노레포 루트에 찾지 못하는 패키지를 추가하는 방식으로 해결했습니다.

## Lerna
[Lerna 공식 문서](https://github.com/lerna/lerna)

>모노레포 관리할 때 모듈 설치 시 중복을 통합해주는 툴이자, 
>git과 npm 환경에 있는 모노레포의 워크플로우를 최적화하는 툴.


- 2022년 4월 모노레포 툴의 강자였던 Lerna의 지원 종료 소식이 들려왔으나, 다른 모노레포 툴 Nx의 소유자인 Nwrl이 Lerna의 소유권을 넘겨 받으면서 지속적으로 개발되고 있는 상황이다. 인수 후 내놓은 첫 번째 릴리즈가 Turborepo보다 5.3배 빠르다고 하는 상황.

- Lerna를 사용하고 있는 오픈소스로는 Babel, jest, create-react-app, webpack-cli, typescript-eslint, react-router 등이 있다.

- Yarn으로 모노레포를 구성할 수는 있지만 여러 workspace의 버전 관리, 테스트, 빌드, 배포, 게시 등의 작업은 일일이 구성해야 한다. Lerna는 이러한 작업을 최적화한다.


#### 다중 패키지의 종속성 관리 및 모듈의 중복성 제거

lerna를 사용하여 node module을 설치할 경우 자체적으로 패키지들의 모듈을 설치하며, 그 과정에서 종속성을 관리하여 중복된 모듈을 하나로 통합한다.

#### 다중 패키지의 단일 버전 및 독립적 버전 관리

Mono-Repo의 구성을 따르면 여러 개의 Package로 구성된다. 이런 Package는 어떤 상황에서 하나의 버전 정책을 가져갈 수 있지만, 또 어떤 경우에는 서로 독립적인 버전 정책을 가져가야 하는 경우가 있는데 lerna는 이러한 기능을 지원하여 버전 정책을 정할 수 있다.

#### 변경된 패키지를 일괄적으로 GIt Remote Repository에 Push

여러 Package가 수정되었다면 Package 별로 Git Remote Repository에 commit과 push를 할 필요가 없다. lerna를 사용하면 단 한 번의 commit과 push로 Remote Repository에 반영할 수 있다.

#### 변경된 패키지를 일괄적으로 NPM Repository에 Publish

NPM Repository에 node module을 배포하기 위해서 publish 명령을 사용한다. Mono-Repo에서 각 Package를 NPM Repository에 배포하기 위해서 하나하나 publish를 입력할 필요가 없다. 단 한 번의 publish로 변경 사항이 있는 Package만 배포가 될 것이다.

### lerna의 주요 기능
- Fixed Mode
다중 패키지의 버전이 단일 버전 라인에서 작동하며 관리
버전은 프로젝트 Root에서 관리되며 lerna publish를 실행할 경우 새 버전으로 패키지를 게시
하나의 패키지가 수정되더라도 모든 패키지는 새로운 버전을 게시
- Independent Mode
패키지의 유지 관리자가 서로 독립적으로 패키지 버전을 관리
lerna publish 시 변경된 패키지에 대해서만 새 버전을 업데이트
버전은 각 패키지의 package.json에 명시
- Hoisting
다중 패키지에서 사용되는 node module을 최적화하여 중복되는 node module을 최상위 경로로 재구축
공통 종속성을 최상위 수준에서만 설치되며 개별 패키지는 생략

### lerna 명령어

lerna의 핵심 명령어는 bootstrap과 publish이다. bootstrap을 통해서 모든 package에 node module을 설치하며 최적화를 통해 중복된 모듈을 정리해준다. publish는 npm publish와 동일한 기능을 하지만 lerna에서는 모든 pacakge를 대상으로 한 번의 명령어로 배포할 수 있다.

## Turborepo

- Turborepo는 대규모 모노레포 프로젝트 관리에서 오는 피로감과 부수적인 툴링에 대한 부담을 줄이면서, Google이나 Facebook과 같은 큰 기업에서 사용하는 수준의 개발 경험을 주는 데 포커싱한, Vercel에서(2021년 12월에 인수) 개발 및 운영하고 있는 JavaScript/TypeScript를 위한 모노레포 빌드 시스템이다.

- 그리고 기존의 모노레포 프로젝트에 점진적으로 Turborepo를 적용할 수 있으며, 쉽게 Turborepo로 구성된 새 모노레포 프로젝트를 생성할 수 있도록 스캐폴딩 기능을 제공한다. 또한 패키지 매니저로 yarn, npm, pnpm와 함께 잘 동작하므로 프로젝트 상황에 맞게 선택해 사용할 수 있다.

- Turborepo의 주요 미션은 모노레포 환경에서 개발자가 조금 더 쉽고 빠르게 개발할 수 있도록 빌드 도구를 제공하는 것입니다. 고급 빌드 시스템을 구축하는 복잡한 과정을 Turborepo가 대신해 주기 때문에 개발자는 복잡한 설정과 스크립트에 신경 쓰는 대신 개발에 더 집중할 수 있습니다.- Turborepo의 기본 원칙은 한 번 작업을 수행하며 수행한 계산은 이후 다시 수행하지 않는 것입니다. 따라서 두 번째 실행할 때는 이전에 계산한 작업은 건너뛰고 이전에 캐싱해 놓은 로그를 다시 보여줍니다. 

- Incremental builds
작업 진행을 캐싱해 이미 계산된 내용은 건너 뛰는 것을 의미합니다. 빌드는 딱 한 번만 하는 것을 목표로 합니다.
- Content-aware hasing
타임스탬프가 아닌 콘텐츠를 인식하는 방식으로 해싱을 지원합니다. 이를 통해 모든 파일을 다시 빌드하는 것이 아니라 변경된 파일만 빌드합니다.
- Cloud caching
클라우드 빌드 캐시를 팀원 및 CI/CD와 공유합니다. 이를 통해 로컬 환경을 넘어 클라우드 환경에서도 빠른 빌드를 제공합니다.
- Parallel execution
모든 코어를 사용하는 병렬 실행을 목표로 합니다. 지정된 태스크 단위로 의존성을 판단해 최대한 병렬적으로 작업을 진행합니다.
- Task Pipelines
태스크 간의 연결을 정의해서 빌드를 언제 어떻게 실행할지 판단해 최적화합니다.
- Zero Runtime Overhead
런타임 코드와 소스 맵을 다루지 않기 때문에 런타임 단계에서 파악하지 못한 리스크가 불거질 위험이 없습니다.
- Pruned subsets
빌드에 필요한 요소만으로 모노 레포의 하위 집합을 생성해 PaaS 배포 속도를 높입니다.
- JSON configuration
별도의 코드 작업 없이 JSON 설정으로 터보를 사용할 수 있습니다.

```
 turbo.json { "baseBranch": "origin/main", "pipeline": { "build": { ... } } }
```

### Turborepo를 사용해 해결할 수 있는 이슈들
#### 스크립트 의존성 분리

- 린트와 테스트(Cypress, snapshost)와 같은 패키지 빌드를 거쳐야 하는 경우 "deploy:storybook": "yarn lint && yarn uvp-core build && yarn uvp build && yarn storybook build && yarn test && yarn storybook deploy"와 같이 스크립트를 쓰지 않을 수 있다.

- 이와 같은 방식은 스크립트를 작성하고 유지 보수하는 데 어려움이 존재. 만약 사용하는 각 스크립트 내부에 또 다른 의존성이 있을 경우 복잡도가 훨씬 커지는 상황 발생한다. 이에 Turborepo에 의존성 관리를 위임하고 Turborepo가 기본적으로 제공하는 병렬 처리를 이용해 개발 속도를 높일 수 있다.

#### 반복되는 빌드 회피

- 배포 전 최종 테스트 과정에서 오류가 발생하는 경우 다시 lint -> build -> test 과정을 거쳐야 한다고 했을 때, 불필요한 시간이 허비된다. 터보레포를 사용하면 배포 뿐 아니라 개발 과정에서 반복되는 빌드도 막을 수 있다. 여러 패키지가 존재하는 상황에서, 하나의 패키지가 한번의 빌드를 마쳤다면 다른 쪽에서 스크립트를 다시 실행할 때 빌드되지 않도록 Turborepo의 캐싱 작업을 통해 막을 수 있다.

#### 배포 프로세스의 시각화

- 확장이 무한한 사이트의 경우 여러 패키지가 계속 확장되며 각 패키지의 의존성과 배포 진행 과정을 숙제하고 있어야 하는데, 긴 배포 스크립트를 읽으며 패키지 간 의존성을 이해하기 위해 많은 노력이 필요할 것이다. 이 때 터보레포의 프로파일과 그래프 기능을 활용하면 스크립트 간 의존성과 배포 과정을 시각화하여 쉽게 파악할 수 있다.


## Npm Workspace
- Npm 7.0 버전부터 사용할 수 있는 Npm Workspace. npm을 패키지 매니저로 사용하는 경우 추가적인 라이브러리 사용 없이 모노레포를 구축할 수 있다는 장점. 
- 생각보다 레퍼런스가 적음.


## 결론
Yarn은 다른 모노레포 도구에 비해 지원하는 것들이 많지는 않지만, 모노레포 사용의 목적이 단순히 공통 요소를 공유하는 것이라면 Yarn으로 workspace을 구성해서 우선적으로 개발을 진행하고, 단순한 코드의 공유 외에 패키지 간 의존성 관리 및 테스트, 배포 등의 작업에 대한 더 나은 무언가를 필요로 한다면 Lerna 혹은 Turborepo 등을 추가적으로 도입 고려해볼 것.


## 레퍼런스
- [우아한 형제들 모노레포 템플릿](https://github.com/kowoohyuk/monorepo-template)
- [우아한 형제들, Yarn berry workspace를 활용한 프론트엔드 모노레포 구축기](https://techblog.woowahan.com/7976)
- [채널톡, Yarn berry 모노레포 ](https://ghost-kr.channel.io/monorepo-in-operation/)
- [Naver D2 모노레포 도구편 ](https://d2.naver.com/helloworld/7553804)
- [원티드랩 Yarn Berry 적용기 ](https://medium.com/wantedjobs/yarn-berry-%EC%A0%81%EC%9A%A9%EA%B8%B0-1-e4347be5987)
- [터보레포 예제](https://github.com/vercel/turbo/tree/main/examples/basic)
- [라인Line의 사례](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/)