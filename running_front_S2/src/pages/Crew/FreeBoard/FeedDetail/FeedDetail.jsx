/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetCrewFreeBoardDetailQuery from '../../../../queries/useGetCrewFreeBoardDetailQuery';
import sanitizeHtml from "sanitize-html";
import { div } from 'framer-motion/client';
import { reqRegisterComment } from '../../../../api/Crew/freeboardApi';
import useGetCrewFreeCommentQuery from '../../../../queries/useGetCrewFreeCommentQuery';


export default function FeedDetail() {
  const { crewId, freeId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCrewFreeBoardDetailQuery({ crewId, freeId });

  const [comment, setComment] = useState("");

  const freeCommentList = useGetCrewFreeCommentQuery(crewId, freeId);
  const commentList = freeCommentList?.data?.data?.body;
  console.log(commentList);

  if (isLoading) return <div css={s.layout}>로딩중…</div>;
  if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;

  const post = data?.body?.[0];
  if (!post) return <div css={s.layout}>게시글을 찾을 수 없어요.</div>;

  const cleanHtml = sanitizeHtml(post.content ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt"],
    },
    transformTags: {
      "a": (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });

  const handleCommentOnClick = () => {
    reqRegisterComment(comment, crewId, freeId);
  }

  return (
    <div>
      <div css={s.layout}>
        <div css={s.topBar}>
          <button onClick={() => navigate(-1)}>← 목록</button>
          <span style={{ color: "#94a3b8", fontSize: 14 }}>
            크루 #{crewId} · 글번호 #{post.freeId}
          </span>
        </div>

        <h1 css={s.titleCss}>{post.title}</h1>
        <div css={s.metaCss}>
          <span>{post.user?.nickname ?? "익명"}</span>
          <span className="dot" />
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div css={s.contentCss} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
      <div>
        <input type="text" placeholder="댓글을 입력하세요" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleCommentOnClick}>등록하기</button>
      </div>
      <div>
      </div>
    </div>

  );
}