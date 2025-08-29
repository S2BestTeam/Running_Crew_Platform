/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import MainContainer from '../../components/MainContainer/MainContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import useGetAskBoardQuery from '../../queries/useGetAskBoardQuery';
import * as s from './styles';
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { IoIosLock } from 'react-icons/io';

function Ask() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchText = searchParams.get('searchText') || '';
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const { data, isLoading, isError } = useGetAskBoardQuery({ page, size, searchText });
  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const start = (page - 1) * size;

  const askLists = useMemo(() => body?.contents ?? [], [body]);

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set('page', '1');
      p.set('searchText', searchInput);
      return p;
    });
  };

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  const isMine = (b) => Number(b?.user?.userId ?? b?.userId) === Number(userId);

  const handleRowClick = (board) => {
    if (!board?.askId) return;
    if (!isMine(board)) {
      alert('본인이 작성한 문의만 열람할 수 있습니다.');
      return;
    }
    navigate(`/ask/${board.askId}`);
  };

  return (
    <MainContainer>
      <div css={s.container}>
        <h2>문의사항</h2>

        <div css={s.searchBox}>
          <div css={s.inputGroup}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              css={s.searchInput}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchOnClick()}
            />
            <button css={s.searchButton} onClick={handleSearchOnClick}>
              <IoSearch />
            </button>
            <button css={s.registerButton} onClick={() => {
              if (!userId) {
                alert('회원가입한 유저만 등록할 수 있습니다.');
                navigate('/');
                return;
              }
              navigate('/ask/register');
            }}>
              문의사항 등록
            </button>
          </div>

          <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
           <b>내가 작성한 문의만</b> 상세로 들어갈 수 있습니다.
          </div>
        </div>

        <table css={s.table}>
          <thead>
            <tr>
              <th css={s.th}>번호</th>
              <th css={s.th}>제목</th>
              <th css={s.th}>작성자</th>
              <th css={s.th}>등록일</th>
              <th css={s.th}>답변 유/무</th>
            </tr>
          </thead>
          <tbody>
            {askLists.map((board, index) => {
              const mine = isMine(board);
              const number = totalElements - (start + index); // 최신이 큰 번호
              const nickname = board?.user?.nickname ?? board?.nickname ?? '-';

              return (
                <tr
                  key={board.askId}
                  css={s.tr}
                  onClick={() => handleRowClick(board)}
                  style={{ cursor: mine ? 'pointer' : 'not-allowed', opacity: mine ? 1 : 0.95 }}
                  title={mine ? '열람 가능' : '본인 글만 열람 가능'}
                >
                  <td css={s.td}>{number}</td>
                  <td css={s.tdTitle} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {!mine && <IoIosLock aria-label="locked" />}
                    <span>{board.title}</span>
                  </td>
                  <td css={s.td}>{nickname}</td>
                  <td css={s.td}>{board.createdAt}</td>
                  <td css={s.td}>{board.isAnswer ? 'Y' : 'N'}</td>
                </tr>
              );
            })}

            {askLists.length === 0 && (
              <tr>
                <td className={s.td} colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                  문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', marginTop: 16 }}>
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
      </div>
    </MainContainer>
  );
}

export default Ask;
