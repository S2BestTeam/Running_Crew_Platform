/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { Stack, Pagination, Select, MenuItem } from "@mui/material";

import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";

function CrewList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const searchText = searchParams.get("searchText") || "";
  const selectedGunguId = searchParams.get("gunguId") || "";

  const handleGunguChange = (e) => {
    setSearchParams({
      page: 1,
      searchText,
      gunguId: e.target.value,
    });
  };
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 12;

  const { data: crewData } = useGetCrewListQuery({
    page,
    size,
    searchText,
    gunguId: selectedGunguId,
  });

  const { data: gunguData } = useGetGunguListQuery();
  const gunguList = gunguData?.data?.body || [];
  const crewList = crewData?.data?.body?.contents || [];
  const totalPages = crewData?.data?.body?.totalPages || 1;

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);

  const handleSearchOnClick = () => {
    setSearchParams({
      page: 1,
      searchText: searchInput,
      gunguId: selectedGunguId,
    });
  };

  const handlePaginationOnChange = (e, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("page", value);
      return newParams;
    });
  };

  return (
    <div css={s.layout}>
      <div css={s.searchBox}>
        <Select
          css={s.selectInput}
          value={selectedGunguId}
          onChange={handleGunguChange}
        >
          <MenuItem value="">전체</MenuItem>
          {gunguList.map((gungu) => (
            <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
              {gungu.gunguName}
            </MenuItem>
          ))}
        </Select>

        <div css={s.searchGroup}>
          <input
            type="text"
            placeholder="크루 검색"
            value={searchInput}
            onChange={handleSearchOnChange}
            css={s.searchInput}
          />
          <button onClick={handleSearchOnClick} css={s.searchBtn}>
            검색
          </button>
        </div>
      </div>

      <div css={s.gridContainer}>
        {crewList.length === 0 ? (
          <p>크루가 없습니다.</p>
        ) : (
          crewList.map((crew) => (
            <div key={crew.crewId} css={s.crewCard}>
              <div css={s.crewImageBox}>
                <img
                  src={crew.crewImgPath}
                  alt={crew.crewName}
                  css={s.crewImg}
                />
              </div>
              <div css={s.crewName}>{crew.crewName}</div>
              <div
                css={s.crewDescription}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(crew.crewDescription),
                }}
              />
            </div>
          ))
        )}
      </div>

      <Stack direction="row" width="100%" justifyContent="center" marginTop={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePaginationOnChange}
        />
      </Stack>
    </div>
  );
}

export default CrewList;