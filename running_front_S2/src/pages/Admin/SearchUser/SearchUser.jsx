/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSearchUserQuery from "../../../queries/Admin/useSearchUserQuery";
import Pagination from "../../../components/Pagination/Pagination";
import * as s from "./styles";
import UserDetailModal from "./UserDetailModal/UserDetailModal";
import SearchBox from "../../../components/SearchBox/SearchBox";

function SearchUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchOnClick = () => {
    setSearchParams({ page: 1, searchText: searchInput });
  };

  const searchUserQuery = useSearchUserQuery({ page, size: 9, searchText });

  if (searchUserQuery.isLoading) return <div>Loading...</div>;
  if (searchUserQuery.isError) return <div>Error: {searchUserQuery.error.message}</div>;

  const users = searchUserQuery.data?.data?.body?.contents || [];
  const totalPages = searchUserQuery.data?.data?.body?.totalPages || 1;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div css={s.container}>
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearchOnClick}
      />

      <div css={s.tableWrapper}>
        <table css={s.table}>
          <thead>
            <tr>
              <th>No</th>
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
                <td colSpan="8">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <img
                      src={user.picture}
                      alt={user.fullName}
                      css={s.thumbnail}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button css={s.detailButton} onClick={() => setSelectedUser(user)}>
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div css={s.paginationWrapper}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => goPage(p)}
          windowSize={1}
        />
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(newUser) => setSelectedUser(newUser)}
        />
      )}
    </div>
  );
}

export default SearchUser;