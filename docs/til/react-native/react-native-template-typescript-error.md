# 에러 해결🔑 react native template typescript An unexpected error occurred: "https://registry.yarnpkg.com/react-native-template-react-native-template-typescript: Not found"

리액트 네이티브를 타입스크립트 템플릿으로 추가할 때 발생하는 에러.

1. remove legacy react-native-cli
`npm uninstall -g react-native-cli`

2. install new thing
`npm i -g @react-native-community/cli`

3. and you can new project with react-native-template-typescript
`npx react-native init MyApp --template react-native-template-typescript`

- 2에서 `npm ERR! code EACCES` 엑세스 접근 에러가 나면 npm 앞에 `sudo`를 붙여서 접근 권한을 허용해준다.
- sudo로 접근 권한이 있음에도, 
  "npm ERR! EEXIST: file already exists, symlink '../lib/node_modules/react-native-cli/index.js' -> '/usr/local/bin/react-native'
  npm ERR! File exists: /usr/local/bin/react-native"와 같은 에러가 나면 해당 `/usr/local/bin/react-native` 폴더를 삭제한 후 다시 설치해본다.

## reference

[https://lifesaver.codes/answer/an-unexpected-error-occurred-https-registry-yarnpkg-com-react-native-template-react-native-template-typescript-not-found-72](https://lifesaver.codes/answer/an-unexpected-error-occurred-https-registry-yarnpkg-com-react-native-template-react-native-template-typescript-not-found-72)