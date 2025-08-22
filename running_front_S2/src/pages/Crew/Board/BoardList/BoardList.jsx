/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const BoardList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ dropDown, setDropDown ] = React.useState('');

  const handleChange = (event) => {
    setDropDown(event.target.value);
  };


  const boardList = [
    { id: "공지", title: "공지사항입니다!", username: "선영공주", date: "2021.08.05" },
    { id: 10, title: "개금에서 런하실분 선착순 10명 모집", username: "진우공주", date: "2021.10.14" },
    { id: 9, title: "운동화 사쪄욤", username: "준일공주", date: "2021.09.30" },
    { id: 8, title: "단추왕자 자랑 좀 할게요", username: "선영공주", date: "2022.03.11" },
    { id: 7, title: "안녕하세요 테토녀 다정공주입니다", username: "다정공주", date: "2021.10.29" },
    { id: 6, title: "개금에서 런하실분 선착순 10명 모집", username: "진우공주", date: "2021.10.14" },
    { id: 5, title: "운동화 사쪄욤", username: "준일공주", date: "2021.09.30" },
    { id: 4, title: "단추왕자 자랑 좀 할게요", username: "선영공주", date: "2022.03.11" },
    { id: 3, title: "안녕하세요 테토녀 다정공주입니다", username: "다정공주", date: "2021.10.29" },
    { id: 2, title: "개금에서 런하실분 선착순 10명 모집", username: "진우공주", date: "2021.10.14" },
    { id: 1, title: "운동화 사쪄욤", username: "준일공주", date: "2021.09.30" },
  ];


  const filteredList = boardList.filter((board) => {
    const matchesSearchTerm = searchTerm
      ? board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        board.username.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesSearchTerm;
  });

  return (
      <div css={s.container}>
        <h2>자유게시판</h2>
        <div css={s.searchBox}>
          <div css={s.selectGroup}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={dropDown}
                onChange={(e) => setDropDown(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "최신순" }}
                  sx={{
                  fontSize: "1.2rem",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                  },}}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return "최신순";
                  }
                  return selected;
                }}
              >
                <MenuItem sx={{"font-size": "1.2rem"}} value="최신순">최신순</MenuItem>
                <MenuItem sx={{"font-size": "1.2rem"}} value="어쩌고">어쩌고</MenuItem>
                <MenuItem sx={{"font-size": "1.2rem"}} value="저쩌고">저쩌고</MenuItem>

              </Select>
            </FormControl>
          </div>

          <div css={s.inputGroup}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              css={s.searchInput}
            />
            <button css={s.searchButton}>
              <IoSearch />
            </button>
            {/* <button css={s.registerButton} onClick={() => navigate(`/community/${params.category}/register`)}> */}
            <button css={s.registerButton}>
              게시글 등록
            </button>
          </div>
        </div>

        <table css={s.table}>
          <thead>
            <tr>
              <th css={s.th}>번호</th>
              <th css={s.th}>제목</th>
              <th css={s.th}>작성자</th>
              <th css={s.th}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((board) => (
              <tr key={board.id}>
                <td css={s.td}>{board.id}</td>
                <td css={s.tdTitle}>{board.title}</td>
                <td css={s.td}>{board.username}</td>
                <td css={s.td}>{board.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default BoardList;
