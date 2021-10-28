# 에러 해결🔑 error Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65.

리액트 네이티브에서 가장 유명한 에러가 아닐까..
(아니 나참.. 리네 = 에러 픽스 90 + 개발 10 같다.. 후)

이 65 에러가 나는 주요한 원인은 cached pod file이랑 현재 패키지가 사용하고 있는 pod file이랑 매치가 되지 않는 것이다.
따라서 이 캐시를 제거해주고 pod을 recreate해주면 된다.

요 에러를 확실하게 해결해주었던 해결책 3가지를 소개한다.

## 1. Xcode에서 Derived Data 삭제하기

일단 Xcode를 켜세요..
그리고 아래 영상을 보면서 따라합니다.

[Delete Derived Data in Xcode](https://www.youtube.com/watch?v=f8bTvx0Aoyo)

3초 결론은

1. **Xcode/DerivedData폴더 지우고** <br />
2. Xcode 완전히 껐다가 켠 다음에 <br />
3. 해당 프로젝트 open해서 새롭게 DerivedData 폴더 만들어지는 것 확인하고서
4. 다시 npm run ios 해보라는 것

## 2. ios/.xcworkspace 파일 삭제하기

이 .xcworkspace파일은 Xcode 프로젝트 파일인데, pod install을 할 때 재생성된다.
자세한 사항은 [스택오버플로우: Is the project.xcworkspace file important?](https://stackoverflow.com/questions/10956312/is-the-project-xcworkspace-file-important) 참고.

## 3. Podfile.lock 삭제하기

old dependencies들이 담긴 파일이고, 마찬가지로 pod install을 하면 재생성된다.

## 4. pod install

프로젝트 루트 폴더에서 `npx pod-install ios`를 하거나 ios 폴더로 들어가 `pod install`을 해준다.
위에서 캐시들을 모두 삭제했기 때문에 현재 패키지에 맞는 pod files가 다운로드되고,
.xcodeworkspace도 재생성된다.
