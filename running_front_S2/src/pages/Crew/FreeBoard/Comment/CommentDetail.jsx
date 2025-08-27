import { useNavigate, useParams } from "react-router-dom";
import useGetCrewFreeCommentQuery from "../../../../queries/useGetCrewFreeCommentQuery";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useState } from "react";

function CommentDetail() {
    const { crewId, freeId } = useParams();
    console.log(freeId)
    const navigate = useNavigate();

    const [comment, setComment] = useState("");

    const freeCommentList = useGetCrewFreeCommentQuery(crewId, freeId);
    const commentList = freeCommentList?.data?.data?.body || [];
    // const commentList = data?.data?.body ?? [];
    console.log(commentList);

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;
    };

    return (
        <div css={s.wrap}>
            <button type="button" css={s.backBtn} onClick={() => navigate(-1)}>
                게시글로 돌아가기
            </button>
            {commentList.map((c) => {
                // ✅ 반드시 return
                return (
                    <div key={c.freeCommentId} css={s.row}>
                        <img
                            src={c?.user?.picture} alt={"`"} css={s.avatar} />
                        <div css={s.right}>
                            <div css={s.header}>
                                <span css={s.nickname}>{c?.user?.nickname}</span>
                                <time css={s.date}>{formatDate(c.createdAt)}</time>
                            </div>
                            <div css={s.content}>{c.content}</div>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

export default CommentDetail;
