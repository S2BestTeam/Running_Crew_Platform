import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";

function CrewList() {
  // URL 쿼리 먼저
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const selectedGunguId = searchParams.get("gunguId") || "";

  // 검색 인풋
  const [searchInput, setSearchInput] = useState(searchText);

  // 데이터 쿼리
  const crewListQuery = useGetCrewListQuery({
    page,
    size: 12,
    searchText,
    gunguId: selectedGunguId,
  });
  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data?.body || [];

  // 페이지 합치기
  const [crewList, setCrewList] = useState([]);
  useEffect(() => {
    const pages = crewListQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setCrewList(merged);
  }, [crewListQuery.data]);

  // 무한 스크롤
  const loadMoreRef = useRef(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          crewListQuery.hasNextPage &&
          !crewListQuery.isFetchingNextPage
        ) {
          crewListQuery.fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [
    crewListQuery.hasNextPage,
    crewListQuery.isFetchingNextPage,
    crewListQuery.fetchNextPage,
  ]);

  // 핸들러
  const handleGunguChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("gunguId", value);
      p.set("searchText", searchInput);
      return p;
    });
  };

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      p.set("gunguId", selectedGunguId);
      return p;
    });
  };

  const handleSearchOnKeyDown = (e) => {
    if (e.key === "Enter") handleSearchOnClick();
  };

  return (
    <div>
      <div>
        <Select
          value={selectedGunguId}
          onChange={handleGunguChange}
          displayEmpty
        >
          <MenuItem value="">전체</MenuItem>
          {gunguList.map((gungu) => (
            <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
              {gungu.gunguName}
            </MenuItem>
          ))}
        </Select>

        <div>
          <input
            type="text"
            placeholder="크루 검색"
            value={searchInput}
            onChange={handleSearchOnChange}
            onKeyDown={handleSearchOnKeyDown}
          />
          <button onClick={handleSearchOnClick}>검색</button>
        </div>
      </div>

      <div>
        {crewList.length === 0 ? (
          <p>크루가 없습니다.</p>
        ) : (
          crewList.map((crew) => (
            <div key={crew.crewId}>
              <div>{/* 이미지부분 일단 생략: <img src="" alt="" /> */}</div>
              <div>{crew.crewName}</div>
            </div>
          ))
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  );
}

export default CrewList;
