/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { reqCheckCrewName, reqRegisterCrew } from "../../../api/Crew/crewApi";
import { reqGunguList } from "../../../api/Gungu/gungu";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";

function CrewRegister(props) {
  const navigate = useNavigate();

  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data.body || [];
  const [preview, setPreview] = useState({
    crewProfileImg: "",
    crewThumbnailImg: "",
  });
  const [isDuplicated, setDuplicated] = useState(true);

  const [registerCrew, setRegisterCrew] = useState({
    crewName: "",
    title: "",
    content: "",
    limitedPeople: "",
    crewProfileImg: null,
    crewThumbnailImg: null,
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

    formData.append("crewProfileImg", registerCrew.crewProfileImg);
    formData.append("crewThumbnailImg", registerCrew.crewThumbnailImg);

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
        <div css={s.container}>
          <div>
            <div css={s.header}>
              <div css={s.mainInputRow}>
                <div>
                  <div css={s.imgContainer}>
                    <div>
                      <img src={preview.crewThumbnailImg} alt="" />
                    </div>
                    <div
                      css={s.plus}
                      onClick={(e) => handleImgAddOnClick(e, "crewThumbnailImg")}
                    >
                      <FiPlus />
                    </div>
                    <div>썸네일 이미지</div>
                  </div>
                </div>

                <div>
                  <div css={s.imgContainer}>
                    <div>
                      <img src={preview.crewProfileImg} alt="" />
                    </div>
                    <div
                      css={s.plus}
                      onClick={(e) => handleImgAddOnClick(e, "crewProfileImg")}
                    >
                      <FiPlus />
                    </div>
                    <div>프로필 이미지</div>
                  </div>
                </div>

                <div css={s.selectContainer}>
                  <select
                    id="gungu-select"
                    value={registerCrew.gunguId}
                    onChange={(e) =>
                      setRegisterCrew((prev) => ({
                        ...prev,
                        gunguId: e.target.value,
                      }))
                    }
                  >
                    <option value="">선택하세요</option>
                    {gunguList.map((gungu) => (
                      <option key={gungu.gunguId} value={gungu.gunguId}>
                        {gungu.gunguName}
                      </option>
                    ))}
                  </select>
                </div>

                <div css={s.nameInputContainer}>
                  <input
                    id="crew-name"
                    css={s.nameInput}
                    type="text"
                    placeholder="크루 이름을 입력하세요"
                    value={registerCrew.crewName}
                    onChange={(e) =>
                      setRegisterCrew((prev) => ({
                        ...prev,
                        crewName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div css={s.buttonContainer}>
                  <button
                    css={s.checkButton}
                    onClick={handleCheckCrewNameOnClick}
                  >
                    중복 확인
                  </button>
                  <button
                    css={s.registerButton}
                    onClick={handleRegisterCrewOnClick}
                  >
                    크루 등록하기
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>한줄소개</div>
              <input
                id="crew-title"
                css={s.titleInput}
                type="text"
                placeholder="크루 한줄소개를 입력하세요"
                value={registerCrew.title}
                onChange={(e) =>
                  setRegisterCrew((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <div>크루소개</div>
              <div css={s.editorContainer}>
                <ReactQuill
                  style={{ height: "50rem" }}
                  modules={{ toolbar: toolbarOptions }}
                  value={registerCrew.content}
                  onChange={handleQuillOnChange}
                />
              </div>
            </div>
            <div css={s.limitedPeopleContainer}>
              <div>정원</div>
              <div>
                <input
                  id="limited_people"
                  css={s.limitedPeopleInput}
                  type="text"
                  value={registerCrew.limitedPeople}
                  onChange={(e) => {
                    setRegisterCrew((prev) => ({
                      ...prev,
                      limitedPeople: e.target.value,
                    }));
                  }}
                  onBlur={(e) => {
                    const regex = /^(?:[1-9]\d|100)$/;
                    if (!regex.test(e.target.value)) {
                      alert("정원은 10 ~ 100명으로 설정하여야합니다.");
                      setRegisterCrew((prev) => ({
                        ...prev,
                        limitedPeople: "",
                      }));
                      return;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }


  export default CrewRegister;
