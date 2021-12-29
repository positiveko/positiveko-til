# 에러 해결🔑 Styled Component로 FlatLst 사용 시 renderItem type unknown 에러

FlatList에 타입이 정의된 data를 넘겨주었음에도 불구하고,
renderItem에 타입이 unknown으로 나오는 에러가 있었다.
styled.FlatList이 styled-components의 타입 정의로는 지원되지 않기 때문이었다.

```ts
const [cleanData, setCleanData] = useState<CoinItem[]>([]);

// 중략
return (
  <List
    data={cleanData} // const cleanData: CoinItem[]
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    numColumns={3}
    columnWrapperStyle={{
      justifyContent: 'space-between',
    }}
    keyExtractor={(item) => item.id} // error: Object is of type 'unknown'.ts(2571)
    renderItem={({ item, index }) => (
      <Coin index={index} symbol={item.symbol} /> // error: Object is of type 'unknown'.ts(2571)
    )}
  />
);

const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;
```

사실.. type assertion으로 `keyExtractor={(item) => (item as CoinItem).id}` 이렇게 정의해준다면
제일 간단하게 타입을 정의해줄 수 있긴 하지만, item의 key들을 자주 써주어야하는 경우엔 일일히 assert해주어야 하니 좋은 방법은 아니다.

solution 1) 스타일드 컴포넌트에 타입 부여

```ts
const List = (styled.FlatList`
  padding: 20px 10px;
  width: 100%;
` as unknown) as typeof FlatList;
```

스택오버플로우를 검색하면 가장 많이 내놓는 해결책이지만 ideal한 방법은 아닌 것 같다.
정확히는 스타일드 컴포넌트화된 FlatList에 unknown을 부여한 뒤 `List = (styled.FlatList`~~`as unknown)`
그에 대한 타입을 다시 FlatList로 갈아끼우는 방식인데 영.. 마뜩잖다.

solution 2) 최종_진짜최종_이게진짜최종.jpg
[여기](https://github.com/styled-components/styled-components/issues/1803#issuecomment-407332173) 그리고 [여기](https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e)에서 참고한 방식이다.'
`List = styled(FlatList)`로 선언하되, generic으로 렌더 아이템의 타입을 전달해주는 방식.

```ts
const List = styled(FlatList as new () => FlatList<CoinItem>)`
  padding: 20px 10px;
  width: 100%;
`;
```

참고로 아래와 같은 방법도 있는데, 위의 방법이 더 간편하다.
```ts
const StyledGenericComponent = styled(GenericComponent)`
  position: relative;
`  as React.ComponentType as new <T>() => GenericComponent<T>;
```
