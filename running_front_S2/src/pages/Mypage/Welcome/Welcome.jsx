import { useEffect, useState } from "react";
import { reqDeleteMyWelcome, reqMyWelcome, reqUpdateMyWelcome } from "../../../api/Crew/welcomeApi";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";

function Welcome() {
  const [myWelcomes, setMyWelcomes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const principalQuery = usePrincipalQuery();
  const userId = principalQuery.data?.data?.body?.user.userId;

  const fetchWelcomes = () => {
    if (!userId) return;
    reqMyWelcome(userId)
      .then((res) => setMyWelcomes(res?.data?.body || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchWelcomes();
  }, [userId]);

  const handleEdit = (welcome) => {
    setEditingId(welcome.welcomeId);
    setEditContent(welcome.content);
  };

  const handleModifyMyWelcomeOnClick = (welcomeId) => {
    const updateData = {
      welcomeId : welcomeId,
      userId : userId,
      content: editContent
    }
    console.log(welcomeId);
    
    console.log(updateData);
    reqUpdateMyWelcome(updateData)
      .then(() => {
        fetchWelcomes();
        setEditingId(null);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMyWelcomeOnClick = (welcomeId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    reqDeleteMyWelcome(welcomeId)
      .then(() => fetchWelcomes())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>크루</th>
            <th>가입 인사</th>
            <th>요청 상태</th>
            <th>작성일</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {myWelcomes.map((welcome, index) => (
            <tr key={welcome.welcomeId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={welcome.profilePicture}
                  alt="크루 프로필 이미지"
                  style={{ width: "40px", borderRadius: "50%", marginRight: "8px" }}
                />
                {welcome.crewName}
              </td>
              <td>
                {editingId === welcome.welcomeId ? (
                  <input
                    type="text"
                    placeholder={welcome.content}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  welcome.content
                )}
              </td>
              <td>{welcome.status}</td>
              <td>{new Date(welcome.createdAt).toLocaleDateString("ko-KR")}</td>
              <td>
                {welcome.status === "거절" ? null : (
                  editingId === welcome.welcomeId ? (
                    <>
                      <button onClick={() => handleModifyMyWelcomeOnClick(welcome.welcomeId)}>저장</button>
                      <button onClick={() => setEditingId(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(welcome)}>수정</button>
                      <button onClick={() => handleDeleteMyWelcomeOnClick(welcome.welcomeId)}>삭제</button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;
