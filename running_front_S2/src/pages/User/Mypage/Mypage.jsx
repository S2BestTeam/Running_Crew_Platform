import { useEffect, useState } from 'react';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { reqGetUserWelcome } from '../../../api/User/userApi';

function Mypage(props) {
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery?.data?.data?.body?.user;
  const userId = userInfo?.userId
  const [ welcomes, setWelcomes ] = useState([]);


  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await reqGetUserWelcome(userId);
        setWelcomes(res.data.body);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  },[userId]);
  
  
  return (
    <div>
      <img src={userInfo?.profileImg} alt="프로필 이미지" />
      <div>이름 : {userInfo?.fullName}</div>
      <div>별명 : {userInfo?.nickname}</div>
      <div>이메일 : {userInfo?.email}</div>
      <div>생년월일 : {userInfo?.birthDate}</div>
      <div>성별 : {userInfo?.gender === 1 ? "남성" : "여성"}</div>
      <div>주소 : {userInfo?.address}</div>
      <div>전화번호 : {userInfo?.phoneNumber}</div>

      <div>
        <div>가입 신청 내역</div>
        {
          welcomes.map((welcome,index) => (
          <div key={index}>
              <img src={welcome.profileImg} alt="" />
              <div>{welcome.crewName}</div>
              <div>{welcome.status}</div>
            </div>
          ))
        }
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Mypage;