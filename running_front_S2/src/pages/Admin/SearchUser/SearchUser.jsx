import React, { useState } from "react";
import useSearchUserQuery from "../../../queries/useSearchUserQuery";
import { useSearchParams } from "react-router-dom";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import UserDetailModal from "./UserDetailModal";

function SearchUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchOnClick();
    }
  };

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("page", 1);
      newParams.set("searchText", searchInput);
      return newParams;
    });
  };

  // 유저 검색 API 호출
  const searchUserQuery = useSearchUserQuery({
    page,
    size: 20,
    searchText,
  });

  if (searchUserQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (searchUserQuery.isError) {
    return <div>Error: {searchUserQuery.error.message}</div>;
  }

  const users = searchUserQuery.data?.data?.body?.contents || [];
  
  const totalPages = searchUserQuery.data?.data?.body?.totalPages || 1;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchOnChange}
          onKeyDown={handleSearchOnKeyDown}
          placeholder="검색어 입력"
          autoFocus
        />
        <button onClick={handleSearchOnClick}>검색</button>
      </div>

      {/* 유저 리스트 */}
      <table border="1" cellPadding="6" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>성명</th>
            <th>프로필 사진</th>
            <th>사용자이름</th>
            <th>이메일</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">검색 결과가 없습니다.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.fullName}</td>
                <td style={{ width: "80px" }}>
                  <img
                    src={user.picture}
                    alt={user.fullName}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button onClick={() => setSelectedUser(user)}>상세보기</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", marginTop: 16 }}>
        <button onClick={() => goPage(page - 1)} disabled={page <= 1}>
          <BiSolidChevronLeftSquare />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={() => goPage(page + 1)} disabled={page >= totalPages}>
          <BiSolidChevronRightSquare />
        </button>
      </div>
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

export default SearchUser;
