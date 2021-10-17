# Next.js next export 배포 시 image loader 에러

Next.js 프로젝트 결과물을 S3로 배포하던 중 image loader에서 다음과 같은 에러가 발생했다.

>Error: Image Optimization using Next.js' default loader is not compatible with next export. <br>Possible solutions:
<br>- Use next start, which starts the Image Optimization API.
<br>- Use Vercel to deploy, which supports Image Optimization.
<br>- Configure a third-party loader in next.config.js.

`next/Image`에서 임포트하는 `<Image />` 컴포넌트의 default loader가 next export에서는 지원되지 않기 때문에 발생하는 에러다.
따라서 다음과 같은 설정이 추가로 필요하다.

```js
// next.config.js
module.exports = {
  images: {
    loader: 'imgix',
    domain: [process.env.CLIENT], // 이미지 도메인
  },
}
```

```ts
// utils/imgLoader.ts

export const imgLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  return `${CLIENT}${src}?w=${width}&q=${quality || 75}`;
};
```

그리고 `Image` 컴포넌트 사용 시 아래와 같이 loader를 적용하여 작성한다.
```tsx
<Image
  loader={({ src, width, quality }: ImageLoaderProps) => imgLoader({ src, width, quality })}
  src="/assets/images/arrow.png"
  blurDataURL="/assets/images/arrow.png"
  placeholder="blur"
  alt="arrow"
  width={192}
  height={192}
/>
```

### references
- [https://github.com/vercel/next.js/issues/21079](https://github.com/vercel/next.js/issues/21079)
- [https://nextjs.org/docs/api-reference/next/image#built-in-loaders](https://nextjs.org/docs/api-reference/next/image#built-in-loaders)