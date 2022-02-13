# 에러 해결🔑 자동 배포 시 S3 upload failed

## `The bucket does not allow ACLS`

IAM에서 S3관련 권한이 다 허용되었음에도 The bucket does not allow ACLS과 같은 문구가 뜨면서 자동 배포에 실패하는 경우, AWS에 S3에서 권한 설정을 수정해주어야 한다.

<img width="837" alt="image" src="https://user-images.githubusercontent.com/69200669/153744912-97ae06f4-3a6f-417f-8477-894bfe5e0fa5.png">


S3에 해당 버킷을 클릭한 뒤 `권한`탭을 보면 하단에 ACL(액세스 제어 목록) 메뉴가 있다. 편집을 눌러 액세스를 허용해주면 된다.