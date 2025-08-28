/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { reqDeleteGlobalComment, reqDeleteGlobalFree, reqRegisterGlobalComment, reqUpdateGlobalFreeComment } from '../../../api/GlobalFree/globalFreeApi';
import sanitizeHtml from "sanitize-html";
import useGetGlobalFreeBoardDetailQuery from '../../../queries/useGetGlobalFreeBoardDetailQuery';
import useGetGlobalFreeCommentQuery from '../../../queries/useGetGlobalFreeCommentQuery';
import MainContainer from '../../../components/MainContainer/MainContainer';


function BoardDetail(props) {
    const { freeId } = useParams();
    const navigate = useNavigate();

    const principalQuery = usePrincipalQuery();
    const principalId =
        principalQuery?.data?.data?.body?.user?.userId ??
        principalQuery?.data?.body?.user?.userId ?? null;

    const {
        data,
        isLoading,
        error,
        refetch: refetchDetail,
    } = useGetGlobalFreeBoardDetailQuery({ freeId });

    const {
        data: cdata,
        isLoading: cLoading,
        isError: cError,
        refetch: refetchComments,
    } = useGetGlobalFreeCommentQuery(freeId);

    const [comment, setComment] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentValue, setEditCommentValue] = useState("");


    const post = useMemo(() => {
        const body = data?.data?.body ?? data?.body;
        return Array.isArray(body) ? body[0] : body;
    }, [data]);

    const commentList =
        cdata?.data?.data?.body ?? cdata?.data?.body ?? cdata?.body ?? [];

    if (isLoading) return <div css={s.layout}>로딩중…</div>;
    if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;
    if (!post) return <div css={s.layout}>게시글을 찾을 수 없어요.</div>;

    const authorId = post?.user?.userId ?? post?.userId ?? null;
    const isAuthor =
        principalId != null && authorId != null && Number(principalId) === Number(authorId);

    const INITIAL_COUNT = 5;
    const displayedComments = showAll ? commentList : commentList.slice(0, INITIAL_COUNT);

    const cleanHtml = sanitizeHtml(post.content ?? "", {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt"] },
        transformTags: {
            a: (tag, attribs) => ({
                tagName: tag,
                attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
            }),
        },
    });

    const goEdit = () => navigate(`/free/${freeId}/edit`);

    const handleDeleteOnClick = async () => {
        if (!window.confirm("정말 이 게시글을 삭제할까요?")) return;
        try {
            await reqDeleteGlobalFree(freeId);
            alert("삭제되었습니다.");
            navigate(`/free`, { replace: true });
        } catch (e) {
            console.error(e);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleCommentOnClick = async () => {
        const text = comment.trim();
        if (!text) return alert("댓글을 입력해주세요.");
        try {
            await reqRegisterGlobalComment(text, freeId);
            setComment("");
            await refetchComments();
            // setShowAll(true); 
        } catch (e) {
            console.error(e);
            alert("댓글 등록 중 오류가 발생했습니다.");
        }
    };


    const startEditComment = (c) => {
        setEditingCommentId(c.freeCommentId);
        setEditCommentValue(c.content ?? "");
    };
    const cancelEditComment = () => {
        setEditingCommentId(null);
        setEditCommentValue("");
    };

    const saveEditComment = async () => {
        const content = editCommentValue.trim();
        if (!content) return alert("수정할 내용을 입력해주세요.");
        try {
            await reqUpdateGlobalFreeComment(freeId, editingCommentId, content);
            await refetchComments();
            setEditingCommentId(null);
            setEditCommentValue("");
            alert("댓글이 수정되었습니다.");
        } catch (e) {
            console.error(e);
            alert("댓글 수정 중 오류가 발생했습니다.");
        }
    };

    const deleteComment = async (freeCommentId) => {
        if (!window.confirm("정말 이 댓글을 삭제할까요?")) return;
        try {
            await reqDeleteGlobalComment(freeId, freeCommentId);
            await refetchComments();
        } catch (e) {
            console.error(e);
            alert("댓글 삭제 중 오류가 발생했습니다.");
        }
    };


    return (
        <MainContainer>
            <div>
                <div css={s.layout}>
                    <div css={s.topBar}>
                        <button onClick={() => navigate(-1)}>← 목록</button>
                        <span style={{ color: "#94a3b8", fontSize: 14 }}>
                            글번호 #{post.freeId}
                        </span>
                    </div>

                    <h1 css={s.titleCss}>{post.title}</h1>
                    <div css={s.metaCss}>
                        <span>{post.user?.nickname ?? "익명"}</span>
                        <span className="dot" />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}</span>
                        {isAuthor && (
                            <>
                                <span className="dot" />
                                <button onClick={goEdit}>수정</button>
                                <button onClick={handleDeleteOnClick}>삭제</button>
                            </>
                        )}
                    </div>

                    <div css={s.contentCss} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                </div>

                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button onClick={handleCommentOnClick}>등록하기</button>
                </div>

                <div style={{ marginTop: 16 }}>
                    {cLoading && <div>댓글 불러오는 중…</div>}
                    {cError && <div>댓글을 불러오지 못했습니다.</div>}

                    {displayedComments.map((c) => {
                        const cAuthorId = c?.user?.userId ?? c?.userId;
                        const isMyComment =
                            principalId != null &&
                            cAuthorId != null &&
                            Number(principalId) === Number(cAuthorId);

                        const isEditingThis = editingCommentId === c.freeCommentId;

                        return (
                            <div
                                key={c.freeCommentId}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    padding: "12px 0",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <img
                                    src={c?.user?.picture}
                                    alt=""
                                    width={36}
                                    height={36}
                                    style={{ borderRadius: "50%", objectFit: "cover" }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong>{c?.user?.nickname ?? "익명"}</strong>
                                        <span style={{ color: "#94a3b8", fontSize: 12 }}>
                                            {c?.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                                        </span>

                                        {isMyComment && !isEditingThis && (
                                            <>
                                                <button onClick={() => startEditComment(c)}>수정</button>
                                                <button onClick={() => deleteComment(c.freeCommentId)}>삭제</button>
                                            </>
                                        )}
                                    </div>

                                    {isEditingThis ? (
                                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                            <input
                                                style={{ flex: 1, padding: 8 }}
                                                value={editCommentValue}
                                                onChange={(e) => setEditCommentValue(e.target.value)}
                                                placeholder="수정할 내용을 입력하세요"
                                            />
                                            <button onClick={saveEditComment}>수정 완료</button>
                                            <button onClick={cancelEditComment}>취소</button>
                                        </div>
                                    ) : (
                                        <div style={{ whiteSpace: "pre-wrap" }}>{c.content}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {commentList.length > INITIAL_COUNT && (
                        <button style={{ marginTop: 8 }} onClick={() => setShowAll((v) => !v)}>
                            {showAll ? "접기" : `댓글 더 보기 (${commentList.length - INITIAL_COUNT}개)`}
                        </button>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}

export default BoardDetail;