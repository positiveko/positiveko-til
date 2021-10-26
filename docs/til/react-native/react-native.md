# npx react-native run-android 시 "error Failed to install the app. Make sure you have an Android emulator running or a device connected." 에러 해결

Android Studio를 설치 후 한번도 emulator를 사용하지 않았을 경우 발생하는 에러였다.

>Error: Failed to install the app. Make sure you have an Android emulator running or a device connected

안드로이드 스튜디오를 들어가서 에뮬레이터 설정을 해주어야 한다.
- `new project` 클릭 후 임의로 옵션을 선택해서 `finish` 클릭
- 우측 상단 버튼 중에 `AVD Manager`라고 툴팁이 뜨는 버튼 클릭(핸드폰 모양)
- `create virtual device`클릭 해서 기본값인 `Nexus 5X API 30`으로 기기 추가
- 다시 프로젝트로 돌아가서 `npx react-native run-android` 실행하면 해당 에러 없이 잘 실행된다.