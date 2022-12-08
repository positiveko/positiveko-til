# 에러 해결🔑 gitignore 설정이 적용되지 않는 에러 해결

깃 캐시로 인한 에러일 확률이 높다. 아래와 같이 캐시를 삭제한 후 다시 커밋해본다.

```
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```