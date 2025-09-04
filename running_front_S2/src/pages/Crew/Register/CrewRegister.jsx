/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { reqCheckCrewName, reqRegisterCrew } from "../../../api/Crew/crewApi";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import useGetCrewRoleQuery from "../../../queries/useGetCrewRoleQuery";

function CrewRegister(props) {
  const navigate = useNavigate();
  const { data: principalData, isLoading } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  useEffect(() => {
    if (isLoading || CrewRoleQuery.isLoading) return;

    const userId = principalData?.data?.body?.user?.userId;
    if (!userId) {
      alert("로그인 후 이용 부탁드립니다.");
      navigate("/auth/oauth2/signin");
      return;
    }

    const roles = CrewRoleQuery?.data || [];
    const isLeader = roles.some(role => role.roleId === 1);

    if (isLeader) {
      alert("이미 크루장입니다.");
      navigate("/");
    }
  }, [principalData, isLoading, navigate, CrewRoleQuery.data, CrewRoleQuery.isLoading]);

  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data.body || [];
  const [preview, setPreview] = useState({
    profilePicture: "",
    thumbnailPicture: "",
  });
  const [isDuplicated, setDuplicated] = useState(true);

  const [registerCrew, setRegisterCrew] = useState({
    crewName: "",
    title: "",
    content: "",
    limitedPeople: "",
    profilePicture: null,
    thumbnailPicture: null,
    gunguId: "",
  });

  const handleImgAddOnClick = (e, name) => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setRegisterCrew((prev) => ({
        ...prev,
        [name]: file,
      }));
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview((prev) => ({
          ...prev,
          [name]: e.target.result,
        }));
      };

      fileReader.readAsDataURL(file);
    };

    fileInput.click();
  };

  const handleCheckCrewNameOnClick = async () => {
    if (!registerCrew.crewName.trim()) return;
    try {
      const response = await reqCheckCrewName(registerCrew.crewName);
      setDuplicated(!response.data?.body);
      if (response.data?.body) {
        alert("사용 가능한 크루명 입니다!");
      } else {
        alert("중복된 크루명 입니다.");
      }
    } catch {
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleQuillOnChange = (value) => {
    setRegisterCrew((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleRegisterCrewOnClick = async () => {
    if (isDuplicated) {
      alert("크루명 중복 확인 필요");
      return;
    }
    const formData = new FormData();

    formData.append("gunguId", registerCrew.gunguId);
    formData.append("crewName", registerCrew.crewName);
    formData.append("title", registerCrew.title);
    formData.append("content", registerCrew.content);
    formData.append("limitedPeople", registerCrew.limitedPeople);

    formData.append("profilePicture", registerCrew.profilePicture);
    formData.append("thumbnailPicture", registerCrew.thumbnailPicture);

    try {
      const res = await reqRegisterCrew(formData);
      alert("크루가 등록되었습니다.");
      navigate("/");
    } catch (err) {
      if (err?.response?.status === 409) {
        alert("이미 등록 크루가 있습니다.");
      } else {
        alert("등록에 실패했습니다.");
      }
    }
  }

  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["blockquote", "link"],
  ];

  return (
    <MainContainer>
    <div css={s.mainBox}>
      <div css={s.titleBox}>
        {/* 썸네일 */}
        <div css={s.banner} onClick={(e) => handleImgAddOnClick(e, "thumbnailPicture")}>
          <div>
            {preview.thumbnailPicture && <img src={preview.thumbnailPicture} alt="크루 썸네일" />}
            <div css={s.imageOverlay} className="overlay">클릭하여 썸네일 업로드</div>
          </div>
        </div>

        {/* 프로필 + 크루 정보 */}
        <div css={s.crewInfoSection}>
          <div css={s.profilePicture} onClick={(e) => handleImgAddOnClick(e, "profilePicture")}>
            {preview.profilePicture && <img src={preview.profilePicture} alt="크루 프로필" />}
            <div css={s.profileImageOverlay} className="overlay">프로필 업로드</div>
          </div>

          <div css={s.crewTextBox}>
            <h2>{registerCrew.crewName || "크루명 입력"}</h2>
            <div css={s.crewText}>
              <p css={s.gungu}>{gunguList.find(g => g.gunguId === registerCrew.gunguId)?.gunguName || "지역 선택"}</p>
              <p>멤버수 1 / {registerCrew.limitedPeople || 10}</p>
            </div>
          </div>

          <button
            css={s.saveButton}
            onClick={handleRegisterCrewOnClick}
          >
            크루 등록
          </button>
        </div>
      </div>

      <div css={s.mainLine}>
        <p css={s.fontBold}>크루 정보 입력</p>

        {/* 크루명 */}
        <div css={s.field}>
            
          <label css={s.label}>크루명</label>
          <div css={s.checkName}>
            <input
              type="text"
              value={registerCrew.crewName}
              onChange={(e) => setRegisterCrew(prev => ({ ...prev, crewName: e.target.value }))}
              css={s.input}
              placeholder="크루명을 입력하세요"
              />
            <button css={s.subButton} onClick={handleCheckCrewNameOnClick}>
              중복 확인
            </button>
          </div>
        </div>

        {/* 한줄 소개 */}
        <div css={s.field}>
          <label css={s.label}>한줄 소개</label>
          <input
            type="text"
            value={registerCrew.title}
            onChange={(e) => setRegisterCrew(prev => ({ ...prev, title: e.target.value }))}
            css={s.input}
            placeholder="크루를 한줄로 소개해주세요"
          />
        </div>

        {/* 최대 인원 */}
        <div css={s.field}>
          <label css={s.label}>최대 인원</label>
          <div css={s.numberInputContainer}>
            <input
              type="number"
              value={registerCrew.limitedPeople}
              onChange={(e) => setRegisterCrew(prev => ({ ...prev, limitedPeople: e.target.value }))}
              css={s.numberInput}
              min={1}
              max={100}
            />
          </div>
        </div>

        {/* 지역 선택 */}
        <div css={s.field}>
          <label css={s.label}>지역 선택</label>
          <select
            value={registerCrew.gunguId}
            onChange={(e) => setRegisterCrew(prev => ({ ...prev, gunguId: e.target.value }))}
            css={s.input}
          >
            <option value="">지역을 선택해주세요</option>
            {gunguList.map((g) => (
              <option key={g.gunguId} value={g.gunguId}>{g.gunguName}</option>
            ))}
          </select>
        </div>

        {/* 크루 소개 */}
        <div css={s.field}>
          <label css={s.label}>크루 소개</label>
          <div css={s.quillWrapper}>
            <ReactQuill
              value={registerCrew.content}
              onChange={handleQuillOnChange}
              modules={{ toolbar: toolbarOptions }}
              placeholder="크루에 대해 자세히 소개해주세요"
            />
          </div>
        </div>
      </div>
    </div>
  </MainContainer>
  );

}


export default CrewRegister;
