# 에러 해결🔑 Catch clause variable type annotation must be 'any' or 'unknown' if specified.ts(1196)

아래와 같이 에러 핸들링을 하려고 할 때에는 타입을 어떻게 정의해줄 수 있을까?

```ts
try {
  await auth().createUserWithEmailAndPassword(email, password);
} catch (error: unknown) {
  switch (
    error.code // Object is of type 'unknown'.ts(2571)
  ) {
    case 'auth/weak-password': {
      Alert.alert('Write a stronger password!');
    }
  }
}
```

error에 대한 타입을 정의해주려고 하면 다음과 같은 에러가 발생한다.

```ts
interface AuthError {
  code: string;
  message: string;
}

try {
  await auth().createUserWithEmailAndPassword(email, password);
} catch (error) {
  // Catch clause variable type annotation must be 'any' or 'unknown' if specified.ts(1196)
  switch (error.code) {
    case 'auth/weak-password': {
      Alert.alert('Write a stronger password!');
    }
  }
}
```

try-catch 구문 사용 시, catch로 잡히는 error에 따라 에러 핸들링을 하려고 할 때.
error에 대한 타입 정의를 할 경우에 생기는 에러다.
하지만 catch로 잡히는 에러의 타입은 unexpected하기 때문에 하나의 에러 타입으로 정의할 수 없다.
따라서 아래와 같이 타입가드를 작성한다.

```ts
try {
  await auth().createUserWithEmailAndPassword(email, password);
} catch (error) {
  const isAuthError = (error: any): error is AuthError => {
    return typeof error.code === 'string';
  };

  if (isAuthError(error)) {
    switch (error.code) {
      case 'auth/weak-password': {
        Alert.alert('Write a stronger password!');
      }
    }
  } else {
    throw error;
  }
}
```
