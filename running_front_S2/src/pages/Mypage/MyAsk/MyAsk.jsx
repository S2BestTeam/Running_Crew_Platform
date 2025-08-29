import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useGetAskBoardQuery from "../../../queries/useGetAskBoardQuery";
import MainContainer from "../../../components/MainContainer/MainContainer";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

function MyAsk() {
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

    const pageList = useMemo(() => {
        const contents = body?.contents ?? [];
        return contents.map((board, idx) => ({
            ...board,
            _seq: totalElements - (start + idx),
        }));
    }, [body, totalElements, start]);

    const isMine = (b) => Number(b?.user?.userId ?? b?.userId) === Number(userId);

    const askLists = useMemo(() => pageList.filter(isMine), [pageList, userId]);

    const handleSearchOnClick = () => {
        setSearchParams((prev) => {
            const p = new URLSearchParams(prev);
            p.set('page', '1');
            p.set('searchText', searchInput);
            return p;
        });
    };

    const goPage = (next) => {
        const nextPage = Math.min(Math.max(1, next), totalPages);
        setSearchParams({ page: nextPage, searchText });
    };

    const handlePostOnClick = (board) => {
        if (!board?.askId) return;
        if (!isMine(board)) {
            alert('본인이 작성한 문의만 열람할 수 있습니다.');
            return;
        }
        navigate(`/ask/${board.askId}`);
    };

    if (isLoading) return <MainContainer><div>불러오는 중…</div></MainContainer>;
    if (isError) return <MainContainer><div>문제가 발생했어요.</div></MainContainer>;

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
                        {askLists.map((board, index) => (
                            <tr
                                key={board.askId}
                                css={s.tr}
                                onClick={() => handlePostOnClick(board)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td css={s.td}>{totalElements - (start + index)}</td>
                                <td css={s.tdTitle}>{board.title}</td>
                                <td css={s.td}>{board?.user?.nickname ?? board?.nickname ?? '-'}</td>
                                <td css={s.td}>{board.createdAt}</td>
                                <td css={s.td}>{board.isAnswer ? 'Y' : 'N'}</td>
                            </tr>
                        ))}
                        {askLists.length === 0 && (
                            <tr>
                                <td className={s.td} colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                                    내 문의가 없습니다.
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

export default MyAsk;
