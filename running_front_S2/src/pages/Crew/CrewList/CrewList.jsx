/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";
import useGetGunguListQuery from "../../../queries/useGetGunguListQuery";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { motion } from "framer-motion";

function CrewList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const selectedGunguId = searchParams.get("gunguId") || "";
  const [liked, setLiked] = useState(false);
  const [searchInput, setSearchInput] = useState(searchText);

  const [likedCrewIds, setLikedCrewIds] = useState([]);
  console.log(likedCrewIds);
  const handleLike = (crewId) => {
    setLikedCrewIds((prev) =>
      prev.includes(crewId)
        ? prev.filter((id) => id !== crewId)
        : [...prev, crewId]
    );
  };

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
    <MainContainer>
      <div css={s.layout}>
        <div css={s.headerBox}>
          <select value={selectedGunguId} onChange={handleGunguChange}>
            <option value="">전체</option>
            {gunguList.map((gungu) => (
              <option key={gungu.gunguId} value={gungu.gunguId}>
                {gungu.gunguName}
              </option>
            ))}
          </select>

          <div>
            <input type="text" placeholder="크루 검색" value={searchInput} onChange={handleSearchOnChange} onKeyDown={handleSearchOnKeyDown} />
            <button onClick={handleSearchOnClick}>검색</button>
          </div>
        </div>

        <div css={s.gridBox}>
          {crewList.length === 0 ? (
            <p>크루가 없습니다.</p>
          ) : (
            crewList.map((crew) => {
              const liked = likedCrewIds.includes(crew.crewId);
              return (
                <div
                  key={crew.crewId}
                  css={s.cards}
                  onClick={() => navigate(`/crews/${crew.crewId}`)}
                >
                  <div css={s.tumbnailBox}>
                    <img src={crew?.thumbnailPicture} alt="" />
                    <motion.div
                      css={s.heartIcon}
                      onClick={(e) => {
                        e.stopPropagation(); // 카드 클릭과 구분
                        handleLike(crew.crewId);
                      }}
                      animate={{ scale: liked ? [1, 1.4, 1] : [1, 0.8, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {liked ? <FaHeart color="red" /> : <FiHeart color="white" />}
                    </motion.div>
                  </div>
                  <div css={s.textBox}>
                    <div css={s.gungu}>{crew.gunguName}</div>
                    <div css={s.crewName}>[{crew.crewName}]</div>
                    <div css={s.crewTitle}>{crew.title}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div ref={loadMoreRef} style={{ height: 1 }} />
      </div>
    </MainContainer>
  );
}

export default CrewList;
