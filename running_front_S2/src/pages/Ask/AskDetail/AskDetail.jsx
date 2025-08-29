/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from "sanitize-html";
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import MainContainer from '../../../components/MainContainer/MainContainer';
import useGetAskDetailQuery from '../../../queries/useGetAskDetailQuery';

export default function AskDetail() {
  const { askId } = useParams();
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();

  const principalId =
    principalQuery?.data?.data?.body?.user?.userId ??
    principalQuery?.data?.body?.user?.userId ??
    null;

  const { data, isLoading, error } = useGetAskDetailQuery({ askId });
  const post = useMemo(() => {
    const body = data?.data?.body ?? data?.body;
    return Array.isArray(body) ? body[0] : body;
  }, [data]);


  if (isLoading) return <div css={s.layout}>로딩중…</div>;
  if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;
  if (!post) return <div css={s.layout}>공지글을 찾을 수 없어요.</div>;

  const authorId = post?.user?.userId ?? post?.userId ?? null;
  const isAuthor = principalId != null && authorId != null && Number(principalId) === Number(authorId);

  const cleanHtml = sanitizeHtml(post.content ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt"] },
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } }),
    },
  });

  return (
    <MainContainer>
    <div>
      <div css={s.layout}>
        <div css={s.topBar}>
          <button onClick={() => navigate(-1)}>← 목록</button>
          <span style={{ color: "#94a3b8", fontSize: 14 }}>
            글번호 #{post.askId}
          </span>
        </div>
        <h1 css={s.titleCss}>{post.title}</h1>
        <div css={s.metaCss}>
          <span>{post.user?.nickname ?? "익명"}</span>
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}</span>
        </div>
        <div css={s.contentCss} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
    </div>
    </MainContainer>

  );
}