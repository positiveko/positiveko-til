# 에러 해결🔑 자동 배포 시 S3 upload failed

## `The bucket does not allow ACLS`

IAM에서 S3관련 권한이 다 허용되었음에도 The bucket does not allow ACLS과 같은 문구가 뜨면서 자동 배포에 실패하는 경우, AWS에 S3에서 권한 설정을 수정해주어야 한다.

<img width="837" alt="스크린샷 2022-02-13 오후 5 17 14" src="https://user-images.githubusercontent.com/69200669/153749033-b4681d27-7fa7-4cb1-8ca7-189597026384.png">

S3에 해당 버킷을 클릭한 뒤 `권한`탭을 보면 하단에 ACL(액세스 제어 목록) 메뉴가 있다. 편집을 눌러 액세스를 허용해주면 된다.