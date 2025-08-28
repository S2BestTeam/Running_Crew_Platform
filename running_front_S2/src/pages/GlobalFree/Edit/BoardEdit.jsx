import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import useGetGlobalFreeBoardDetailQuery from '../../../queries/useGetGlobalFreeBoardDetailQuery';
import { reqUpdateGlobalFreeBoard } from '../../../api/GlobalFree/globalFreeApi';
import ReactQuill from 'react-quill-new';
import MainContainer from '../../../components/MainContainer/MainContainer';

function BoardEdit(props) {
    const { freeId } = useParams();
    const navigate = useNavigate();

    const principalQuery = usePrincipalQuery();
    const principalId = principalQuery?.data?.data?.body?.user?.userId ?? null;

    const { data, isLoading, error } = useGetGlobalFreeBoardDetailQuery({ freeId });

    const post = useMemo(() => {
        const body = data?.data?.body ?? data?.body;
        return Array.isArray(body) ? body[0] : body;
    }, [data]);

    const authorId = post?.user?.userId ?? post?.userId ?? null;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title ?? "");
            setContent(post.content ?? "");
        }
    }, [post]);

    useEffect(() => {
        if (authorId != null && principalId != null && Number(authorId) !== Number(principalId)) {
            alert("작성자만 수정할 수 있습니다.");
            navigate(-1);
        }
    }, [authorId, principalId, navigate]);

    if (isLoading) return <div>로딩중…</div>;
    if (error) return <div>에러가 발생했어요: {String(error)}</div>;
    if (!post) return <div>게시글을 찾을 수 없어요.</div>;

    const handleSave = async () => {
        const t = title.trim();
        const c = content?.trim?.() ?? content;
        if (!t) return alert("제목을 입력해주세요.");

        try {
            await reqUpdateGlobalFreeBoard({ freeId, title, content });
            alert("수정되었습니다.");
            navigate(`/free/${freeId}`);
        } catch (e) {
            console.error(e);
            alert("수정 중 오류가 발생했습니다.");
        }
    };
    console.log(content)

    return (
        <MainContainer>

            <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <h2>게시글 수정</h2>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    style={{ width: "100%", padding: 8, marginBottom: 8 }}
                />

                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(value) => setContent(value)}
                />

                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button onClick={() => navigate(-1)}>취소</button>
                    <button onClick={handleSave}>저장</button>
                </div>
            </div>
        </MainContainer>
    );
}




export default BoardEdit;