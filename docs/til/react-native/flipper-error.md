## Flipper 관련 BUILD FAILED 에러 해결
(22.04.09)

- "react-native": "0.68.0"

```
** BUILD FAILED **


The following build commands failed:
        CompileSwiftSources normal x86_64 com.apple.xcode.tools.swift.compiler (in target 'YogaKit' from project 'Pods')
        CompileC /Users/사용자/Library/Developer/Xcode/DerivedData/프로젝트명/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/React-cxxreact.build/Objects-normal/x86_64/RAMBundleRegistry.o /Users/사용자/node_modules/react-native/ReactCommon/cxxreact/RAMBundleRegistry.cpp normal x86_64 c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'React-cxxreact' from project 'Pods')
(2 failures)

error Command failed with exit code 1.
```

Podfile에서 아래 부분을 삭제했다.

```
  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable the next line.
  use_flipper!()

  post_install do |installer|
    react_native_post_install(installer)
    __apply_Xcode_12_5_M1_post_install_workaround(installer)
  end
```

`Podfile.lock`과 `프로젝트명.xcworkspace` 지우고 `npx pod-install` 후 
다시 실행하면 잘된다..!