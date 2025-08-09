/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import * as s from './styles';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { FiPlus, FiX } from 'react-icons/fi';
import { reqCheckCrewName, reqRegisterCrew } from '../../api/crew/crewApi';
import { reqGunguList } from '../../api/useReqList';
import { data, useNavigate } from 'react-router-dom';

function CrewCreate(props) {
  const principalQuery = usePrincipalQuery();
  const principal = principalQuery.data?.data?.body;
  const navigate = useNavigate();

  const [ registerCrew, setRegisterCrew ] = useState({
    crewName: "",
    crewDescription: "",
    crewImgPath: null,
    gunguId: "",
    userId: "",
  });

  const handlePlusOnClick = () => {
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

        setRegisterCrew(prev => ({
          ...prev,
          crewImgPath: imageData,
        }));
      };
      fileReader.readAsDataURL(file);
    };
  };

  const handleImgDeleteOnClick = () => {
    setRegisterCrew(prev => ({
      ...prev,
      crewImgPath: null,
    }));
  };
  
  const [gunguList, setGunguList] = useState([]);

  useEffect(() => {
    if (principal?.user?.userId) {
      setRegisterCrew(prev => ({
        ...prev,
        userId: principal.user.userId
      }));
    }
  }, [principal]);

  useEffect(() => {
    reqGunguList()
      .then((res) => setGunguList(res.data.body))
      .catch((err) => console.error(err));
  }, []);

  const [isCrewNameChecked, setIsCrewNameChecked ] = useState(false);

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
  }

  const handleQuillOnChange = (value) => {
    setRegisterCrew(prev => ({
      ...prev,
      crewDescription: value,
    }));
  }

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("crewName", data.crewName);
    formData.append("crewDescription", data.crewDescription);
    formData.append("gunguId", data.gunguId);
    formData.append("userId", data.userId);

    // crewImg가 null이 아니면 파일을 추가
    if (data.crewImgPath) {
      // data.crewImg가 File 객체라면
      formData.append("crewImgPath", data.crewImgPath.file);
    }
  return formData;
};

  const handleRegisterCrewOnClick = async () => {
    const formData = createFormData(registerCrew);
    await reqRegisterCrew(formData)
    .then(res => {
      console.log("등록 성공!", res);
      navigate("/");
    })
    .catch(err => {
      console.error("등록 실패", err);
    });
  }
  

  const toolbarOptions = [
    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
    ['blockquote', 'link'],
  ];

  return (
    <div css={s.layout}>
      <div>
        <div css={s.header}>
            <div css={s.headerLeft}>
                <div>
                  {
                    !registerCrew.crewImgPath &&
                    <Box>
                      <div css={s.imgContainer}>
                        <div css={s.plus} onClick={handlePlusOnClick}>
                          <FiPlus />
                        </div>
                      </div>
                    </Box>
                  }

                  {
                    registerCrew.crewImgPath &&
                    <Box>
                      <div css={s.imgContainer}>
                        <div css={s.feedImg(registerCrew.crewImgPath.dataUrl)}>
                          <div css={s.fixButton} onClick={handleImgDeleteOnClick}>
                            <div><FiX /></div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  }
                </div>
            </div>
              <div css={s.crewTitleInput}>
                <div css={s.selectAndInput}>
                  <FormControl style={{ width : '20rem', padding: '1rem'}}>
                  <InputLabel id="gungu-select-label">구/군</InputLabel>
                    <Select
                      labelId="gungu-select-label"
                      value={registerCrew.gunguId}
                      onChange={(e) => setRegisterCrew(prev => ({...prev, gunguId : e.target.value}))}
                      >
                      {gunguList.map((gungu) => (
                        <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
                          {gungu.gunguName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="크루 이름을 입력하세요"
                    value={registerCrew.crewName}
                    onChange={(e) => setRegisterCrew(prev => ({...prev, crewName : e.target.value}))}
                    InputProps={{
                      style: {
                        width : 'auto',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                      }
                    }}
                  />
                </div>
                <Button variant='outlined' style={{ width : '10rem', height: '5.6rem' , fontSize: '0.9rem', fontWeight: 'bold'}} onClick={handleCheckCrewNameOnClick}>중복 확인</Button>
                <Button variant='outlined' style={{ width : '14rem', height: '5.6rem' , fontSize: '0.9rem', fontWeight: 'bold'}} onClick={handleRegisterCrewOnClick}>크루 등록하기</Button>
              </div>
            </div>
        </div>
        <div>
          <ReactQuill
            style={{ height: "30rem", paddingTop: '1rem'}} 
            modules={{toolbar: toolbarOptions}}
            value={registerCrew.crewDescription}
            onChange={handleQuillOnChange}
            />
        </div>
      </div>
  );
}

export default CrewCreate;