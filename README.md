# 추억의 롤링 페이퍼 웹 서비스 **'롤링'** 

## 1. 프로젝트 개요

- **소속**: 코드잇 프론트엔드 엔지니어 부트캠프 2기, 파트 2 - 9팀
- **개발 기간**: 2023. 12. 09 - 2023. 12. 22
- **개발 인원**: 프론트엔드 개발자 5명
- **배포 링크**: [https://rolling-team9.netlify.app](https://rolling-team9.netlify.app)
- **주요 기능**:
  - `롤링 페이퍼 생성`: 이미지 또는 컬러 배경을 선택해 나만의 롤링 페이퍼 방을 생성
  - `친구 초대`: 카카오톡 링크를 통해 롤링 페이퍼 공유
  - `메시지 작성`: 폰트 크기 및 스타일을 자유롭게 편집하여 메시지 작성
  - `메시지 꾸미기`: 작성자의 이름 및 프로필 이미지를 설정하여 개성 표현
  - `리액션 기능`: 친구의 롤링 페이퍼에 이모지를 추가해 감정 표현


## 2. 팀원  
[@kimbobby](https://github.com/kimbobby) 
[@juncastle97](https://github.com/juncastle97)
[@juncastle97](https://github.com/juncastle97)
[@Useong0](https://github.com/Useong0)
[@ynmkim](https://github.com/ynmkim)



## 3. 기술 스택
### 🛠 언어
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)  
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)  
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### 📚 라이브러리
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)

### 🎨 스타일링
- ![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat-square&logo=styled-components&logoColor=white)

### 🧑‍💻 코드 품질 관리
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)  
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)


## 4. 주요 기여 내용 
### 1. **디자인 토큰 제작**
- 색상 팔레트, 타이포그래피, 레이아웃, Box Shadow, Overlay Backdrop Color 속성의 문자열 오타 및 반복 코드 작성의 비효율을 방지하기 위해, 재사용 가능한 객체 타입으로 정의한 **디자인 토큰 제작으로 생산성을 높임**.
### 2. **컴포넌트 가이드 문서 작성**
- 팀원 모두가 타입스크립트 학습 전이라 기술 스택에 포함되지 않아 Button 컴포넌트에 필요한 **props와 자료형 타입을 정의한 [가이드 문서](<https://www.notion.so/Button-1becc837546980278bf8d68e328bba95?pvs=4>)를 작성**하여, 팀원이 잘못된 props를 전달하는 실수를 방지하고, 빠르게 컴포넌트를 적용할 수 있도록 제공함. 이를 통해 타입스크립트의 유용성에 대해 배움.

## 5. 역할 분담 
### 🍃 김윤미  
#### 🖥 UI 개발  
- **공통 컴포넌트**: `Button`, `Modal`  
- **페이지**: 롤링 페이퍼 개설 페이지  
- **반응형 적용**: 롤링 페이퍼 개설 페이지, 롤링 페이퍼 메시지 작성 페이지, 롤링 페이퍼 목록 페이지  

#### ⚙ 기능 개발  
- 롤링 페이퍼 메시지 생성 기능  

#### 🛠 기타 작업  
- 디자인 토큰 정의  
- ESLint 설정  

---

### 🐱 김주현  
#### 🖥 UI 개발  
- **공통 컴포넌트**: `Header`, `Date`, `RecipientName`  
- **페이지**: 롤링 페이퍼 메시지 작성 페이지  
- **테마 적용**: 크리스마스 테마  

#### ⚙ 기능 개발  
- 텍스트 편집기 기능  
- 메시지 카드 등록 기능  

#### 🛠 기타 작업  
- Notion 문서 정리 및 프로젝트 문서화  
- 기능 및 컴포넌트 구조 정리  
- R&R 조정  

---

### 💙 이준기  
#### 🖥 UI 개발  
- **공통 컴포넌트**: `Badge`, `Emojis`, `Toast`  
- **페이지**: 메인 페이지, 롤링 페이퍼 관리 페이지  
- **반응형 적용**: 메인 페이지, 롤링 페이퍼 관리 페이지  

#### ⚙ 기능 개발  
- 롤링 페이퍼 메시지 삭제 기능  
- 카카오톡 및 URL 공유 기능  
- SEO 최적화를 위한 `Helmet` 설정  

#### 🛠 기타 작업  
- 개발 컨벤션 정리 (디렉토리 구조, 브랜치 전략)  

---

### 🧸 박준성  
#### 🖥 UI 개발  
- **공통 컴포넌트**: `Option`, `TextField`, `Card`  
- **페이지**: 롤링 페이퍼 페이지  
- **반응형 적용**: 롤링 페이퍼 목록 페이지  

#### ⚙ 기능 개발  
- 이모지 추가 기능  

#### 🛠 기타 작업  
- 배포 환경 구축 (`Netlify`)  

---

### ☁️ 박운성  
#### 🖥 UI 개발  
- **공통 컴포넌트**: `Avatar`, `CardList`  
- **페이지**: 롤링 페이퍼 목록 페이지  
- **반응형 적용**: 롤링 페이퍼 목록 페이지  

#### ⚙ 기능 개발  
- 무한 스크롤 기능  
- 스켈레톤 로딩 기능  

#### 🛠 기타 작업  
- 라우팅 구조 설정 (`React Router`)  


### 6. 미리보기

#### 메인
![KakaoTalk_Image_2023-12-22-05-27-54_001](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/2bd87d33-4134-4568-a74e-a8cb4d7a12a8)

#### 롤링 페이퍼 전체 목록
![KakaoTalk_Image_2023-12-22-05-29-13](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/190a605d-58ab-436a-8350-a5cbc158ec4a)

#### 롤링 페이퍼 개설 
![KakaoTalk_Image_2023-12-22-05-27-55_002](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/f25e3aea-07ee-4264-a6d6-add04d710d1a)

![KakaoTalk_Image_2023-12-22-05-29-22](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/03596032-4794-442e-9e11-4bbcd2814435)

#### 롤링 페이퍼 메시지 보내기
![KakaoTalk_Image_2023-12-22-05-43-53](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/a9516546-004a-48d2-a6f3-6fab95652050)


#### 롤링 페이퍼 상세
![KakaoTalk_Image_2023-12-22-05-29-49_001](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/b01b5804-dda8-4709-b634-8840c9973a6a)


#### 롤링 페이퍼 관리
![KakaoTalk_Image_2023-12-22-05-29-50_003](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/d3f7c4a0-dadc-4674-b3bb-d4cbff697834)


#### 롤링 페이퍼 리액션  
![KakaoTalk_Image_2023-12-22-05-29-49_002](https://github.com/Rolling-Project-Team-9/rolling/assets/148737398/11038a00-a71d-4688-b2f4-04ab51e91483)
