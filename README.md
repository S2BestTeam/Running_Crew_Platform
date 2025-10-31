# 🏃‍♀️ BRCP (Busan Running Crew Platform) - 부산 러닝 크루 플랫폼
부산 지역 러너들을 위한 통합 플랫폼 <br>
**BRCP**는 다양한 러닝 크루를 조회하고 가입할 수 있으며, 크루를 직접 생성하고 커뮤니티 활동을 할 수 있는 웹 서비스입니다.
> 🚀 “함께 달리면, 더 멀리 갈 수 있습니다.”

---

## 👥 팀원 소개

| 이름 | 역할 | 배포 사이트 | GitHub |
|------|------|-------------|--------|
| 김선영 | UI/UX 기획, 크루 정모 일정 등록 및 관리, 참석자 출석 체크 & 러닝 거리 반영, Kakao Map API를 활용한 위치 선택/표시 기능 제공 | (busanrun.store) | [@chulog](https://github.com/kksun0202) |
| 염진우 | OAuth 2.0 기반 인증, 크루 등록 및 관리, 랭킹 페이지 기능 구현, 마이페이지, 관리자 페이지 | (s2runningcrew.store) | [@duawlsdn](https://github.com/duawlsdn) |
| 제다정 | 크루 리스트 페이지 구현, 크루 멤버 관리, 자유게시판 등록 및 관리, 신고, 문의 관리, 대회 일정(Python 크롤링) | (s2runningcrew.site) | [@dajeong01](https://github.com/dajeong01) |

---

## 📅 프로젝트 기간

- **진행 기간**: 2025.08 ~ 2025.09 (총 1개월)  
- **주요 마일스톤**
  1. 기획 & 디자인 (1주차 ~ 2주차)  
  2. 프론트/백엔드 개발 (2주차 ~ 3주차)  
  3. 배포 및 테스트 (4주차)  

---

## 📌 주요 기능

1. **사용자 로그인 및 크루 등록**
   - 회원가입 및 로그인 기능 제공  
   - 로그인 후 새로운 러닝 크루 생성 가능  
2. **러닝 크루 조회 및 가입**
   - 부산 지역의 다양한 러닝 크루 목록 확인  
   - 크루별 정보 및 활동 확인  
   - 관심 있는 크루에 가입 신청 가능  
3. **정모 일정 등록 및 관리**
   - 크루 내 정기 모임(정모) 등록 및 관리  
   - 정모 일정은 캘린더에서 확인 가능  
   - 개인 참여 일정 관리 가능
4. **랭킹 시스템**
   - 달린 거리(KM)를 기준으로 크루/개인 랭킹 제공  
   - 건강한 경쟁을 통한 동기 부여  
5. **자유게시판**
   - 크루 전용 게시판 및 전체 자유게시판 기능  
   - 공지사항, 문의사항 등 기능  
6. **전국 마라톤 대회 일정 제공**
   - 전국 주요 마라톤 대회 일정 확인  
   - 크루 단체 참여를 위한 일정 공유  

---

## 📷 시연 GIF

<table>
<tr>
  <th>사용자 로그인</th>
  <th>크루 등록</th>
</tr>
<tr>
  <td><img src="./running_front_S2/src/assets/videos/로그인.gif" width="100%" /></td>
  <td><img src="./running_front_S2/src/assets/videos/크루등록.gif" width="100%" /></td>
</tr>

<tr>
  <th>크루 조회 및 가입</th>
  <th>정모 일정 등록</th>
</tr>
<tr>
  <td><img src="./running_front_S2/src/assets/videos/크루조회-및-가입.gif" width="100%" /></td>
  <td><img src="./running_front_S2/src/assets/videos/정모일정등록.gif" width="100%" /></td>
</tr>

<tr>
  <th>자유게시판</th>
  <th>개인/크루 랭킹</th>
</tr>
<tr>
  <td><img src="./running_front_S2/src/assets/videos/자유게시판.gif" width="100%" /></td>
  <td><img src="./running_front_S2/src/assets/videos/랭킹.gif" width="100%" /></td>
</tr>

<tr>
  <th>대회 일정</th>
  <th>관리자페이지</th>
</tr>
<tr>
  <td><img src="./running_front_S2/src/assets/videos/대회일정.gif" width="100%" /></td>
  <td><img src="./running_front_S2/src/assets/videos/관리자페이지.gif" width="100%" /></td>
</tr>
</table>


---

## 🛠️ 사용 기술 스택

- **Frontend**: React.js, Emotion CSS, Zustand, Kakao Map API  
- **Backend**: Spring Boot, MyBatis  
- **Database**: MySQL 8.0 (AWS RDS)  
- **Authentication**: JWT, OAuth 2.0  
- **Deployment / CI**: AWS, GitHub Actions, Docker  

---

## 📚 API 명세서

프로젝트에서 사용된 API 관련 문서는 Notion에서 확인할 수 있습니다.  
아래 버튼 또는 링크를 통해 바로 접근 가능합니다.

[API 명세서 확인하기](https://www.notion.so/269909ed6ec38025b1f2c3fa799a87e4?v=269909ed6ec3810b89a1000cc3ff7d5d&source=copy_link)

> 🔹 Notion 페이지에는 엔드포인트, 요청/응답 형식, 인증 방식 등이 자세히 정리되어 있습니다.

---

## 🗂️ ERD (Entity Relationship Diagram)

![ERD](https://via.placeholder.com/800x400?text=ERD+Diagram)
