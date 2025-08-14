/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { reqGunguList } from "../../../api/useReqList";
import { reqCheckCrewName, reqRegisterCrew } from "../../../api/Crew/crewApi";
import api from "../../../api/axios";

function CrewRegister(props) {
  const principalQuery = usePrincipalQuery();
  const principal = principalQuery.data?.data?.body;
  const navigate = useNavigate();
  const userId = principal?.user?.userId;

  const [registerCrew, setRegisterCrew] = useState({
    crewName: "",
    title: "",
    content: "",
    limitedPeople: "",
    crewProfileImg: null,
    crewThumbnailImg: null,
    gunguId: "",
    userId: "",
  });

  const handleProfileImgRegisterOnClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      api.post(`/api/crews/${userId}/crew-profile-img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };

    fileInput.click();
  };

  const handleThumbnailImgRegisterOnClick = () => {
    setRegisterCrew((prev) => ({
      ...prev,
      crewProfileImg: null,
    }));
  };

  const handleThumbnailImgOnClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.click();
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const imageData = {
          file,
          dataUrl: e.target.result,
        };

        setRegisterCrew((prev) => ({
          ...prev,
          crewThumbnailImg: imageData,
        }));
      };
      fileReader.readAsDataURL(file);
    };
  };

  const handleThumbnailDeleteOnClick = () => {
    setRegisterCrew((prev) => ({
      ...prev,
      crewThumbnailImg: null,
    }));
  };

  const [gunguList, setGunguList] = useState([]);

  useEffect(() => {
    if (principal?.user?.userId) {
      setRegisterCrew((prev) => ({
        ...prev,
        userId: principal.user.userId,
      }));
    }
  }, [principal]);

  useEffect(() => {
    reqGunguList()
      .then((res) => setGunguList(res.data.body))
      .catch((err) => console.error(err));
  }, []);

  const [isCrewNameChecked, setIsCrewNameChecked] = useState(false);

  const handleCheckCrewNameOnClick = async () => {
    if (!registerCrew.crewName.trim()) return;
    try {
      const response = await reqCheckCrewName(registerCrew.crewName);
      if (response.data?.body === "false") {
        setIsCrewNameChecked(true);
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

  const registerFormData = (data) => {
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("gunguId", gunguId);
    formData.append("crewName", crewName);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("limitedPeople", limitedPeople);

    formData.append("crewProfileImg", profileFile);
    formData.append("crewThumbnailImg", thumbnailFile);

    return formData;
  };

  const handleRegisterCrewOnClick = async () => {
    const formData = registerFormData(registerCrew);
    try {
      const res = await api.post("/api/crews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("등록 성공!", res);
      navigate("/");
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
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
                {/* 썸네일 업로드 */}
                {!registerCrew.crewThumbnailImg && (
                  <div css={s.imgContainer}>
                    <div
                      css={s.plus}
                      onClick={handleThumbnailImgRegisterOnClick}
                    >
                      <FiPlus />
                    </div>
                    <div>썸네일 이미지</div>
                  </div>
                )}

                {registerCrew.crewThumbnailImg && (
                  <div css={s.imgContainer}>
                    <div css={s.feedImg(registerCrew.crewThumbnailImg.dataUrl)}>
                      <div
                        css={s.fixButton}
                        onClick={handleThumbnailDeleteOnClick}
                      >
                        <div>
                          <FiX />
                        </div>
                      </div>
                    </div>
                    <div>썸네일 이미지</div>
                  </div>
                )}
              </div>

              <div>
                {!registerCrew.crewProfileImg && (
                  <div css={s.imgContainer}>
                    <div css={s.plus} onClick={handleProfileImgRegisterOnClick}>
                      <FiPlus />
                    </div>
                  </div>
                )}

                {registerCrew.crewProfileImg && (
                  <div css={s.imgContainer}>
                    <div css={s.feedImg(registerCrew.crewProfileImg.dataUrl)}>
                      <div
                        css={s.fixButton}
                        onClick={handleProfileImgDeleteOnClick}
                      >
                        <div>
                          <FiX />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                onChange={(e) =>
                  setRegisterCrew((prev) => ({
                    ...prev,
                    limitedPeople: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default CrewRegister;
