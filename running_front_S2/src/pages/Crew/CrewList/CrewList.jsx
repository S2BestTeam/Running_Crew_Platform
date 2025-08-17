import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";

function CrewList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const selectedGunguId = searchParams.get("gunguId") || "";

  const [searchInput, setSearchInput] = useState(searchText);

  const crewListQuery = useGetCrewListQuery({
    page,
    size: 12,
    searchText,
    gunguId: selectedGunguId,
  });
  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data?.body || [];

  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    const pages = crewListQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setCrewList(merged);
  }, [crewListQuery.data]);

  const loadMoreRef = useRef(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && crewListQuery.hasNextPage && !crewListQuery.isFetchingNextPage) {
          crewListQuery.fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [crewListQuery.hasNextPage, crewListQuery.isFetchingNextPage, crewListQuery.fetchNextPage]);

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
        <Select value={selectedGunguId} onChange={handleGunguChange} displayEmpty>
          <MenuItem value="">전체</MenuItem>
          {gunguList.map((gungu) => (
            <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
              {gungu.gunguName}
            </MenuItem>
          ))}
        </Select>

        <div>
          <input type="text" placeholder="크루 검색" value={searchInput} onChange={handleSearchOnChange} onKeyDown={handleSearchOnKeyDown} />
          <button onClick={handleSearchOnClick}>검색</button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 가로 4칸
          gap: "16px", // 카드 간격
          padding: "16px",
        }}
      >
        {crewList.length === 0 ? (
          <p>크루가 없습니다.</p>
        ) : (
          crewList.map((crew) => (
            <div
              key={crew.crewId}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#fafafa",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/crews/${crew.crewId}`)}
            >
              <div style={{ fontSize: "14px", color: "#666" }}>{crew.gunguName}</div>
              <div style={{ fontWeight: "bold", marginTop: "8px" }}>{crew.crewName}</div>
              <div style={{ fontSize: "13px", marginTop: "4px", color: "#333" }}>{crew.title}</div>
            </div>
          ))
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  );
}

export default CrewList;
