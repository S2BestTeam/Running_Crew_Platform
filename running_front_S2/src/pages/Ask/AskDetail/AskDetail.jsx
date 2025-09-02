/** @jsxImportSource @emotion/react */
<<<<<<< HEAD
import * as s from './styles';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sanitizeHtml from "sanitize-html";
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import MainContainer from '../../../components/MainContainer/MainContainer';
import useGetAskDetailQuery from '../../../queries/useGetAskDetailQuery';
import { reqAskComment, reqDeleteAskComment, reqUpdateAskComment } from '../../../api/Admin/adminApi';
import { useGetAskCommentsQuery } from '../../../queries/Admin/useGetAskCommentsQuery';
=======
import * as s from "./styles";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetAskDetailQuery from "../../../queries/useGetAskDetailQuery";
>>>>>>> origin/95-세부기능-다듬기-4

function AskDetail() {
  const { askId } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD

  const principalQuery = usePrincipalQuery();
  const principalRole = principalQuery?.data?.data?.body?.user?.role;
  const isAdmin = principalRole === "ROLE_ADMIN";

  const { data, isLoading, error, refetch } = useGetAskDetailQuery({ askId });
=======

  const { data, isLoading, error } = useGetAskDetailQuery({ askId });

>>>>>>> origin/95-세부기능-다듬기-4
  const post = useMemo(() => {
    const body = data?.body;
    return Array.isArray(body) ? body[0] : body;
  }, [data]);

<<<<<<< HEAD
  const askCommentQuery = useGetAskCommentsQuery(post?.askId);
  const comments = askCommentQuery?.data?.data?.body ?? [];
  
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.askCommentId);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleEditSave = async (commentId) => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const updateComment = {
        askCommentId: commentId,
        content: editContent.trim()
      };
      
      await reqUpdateAskComment(updateComment);
      alert("댓글이 수정되었습니다.");
      askCommentQuery.refetch();
      setEditingCommentId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) return <div css={s.layout}>로딩중…</div>;
  if (error) return <div css={s.layout}>에러가 발생했어요: {String(error)}</div>;
  if (!post) return <div css={s.layout}>공지글을 찾을 수 없어요.</div>;
=======
  if (isLoading)
    return (
      <MainContainer>
        <div css={s.layout}>
          <div css={s.skeletonHeader} />
          <div css={s.skeletonBlock} />
          <div css={s.skeletonBlock} />
        </div>
      </MainContainer>
    );
>>>>>>> origin/95-세부기능-다듬기-4

  if (error)
    return (
      <MainContainer>
        <div css={s.layout}>에러가 발생했어요: {String(error)}</div>
      </MainContainer>
    );

  if (!post)
    return (
      <MainContainer>
        <div css={s.layout}>문의글을 찾을 수 없어요.</div>
      </MainContainer>
    );

  // 응답 형태 호환: askContent/askCreatedAt 또는 content/createdAt
  const askContentRaw = post.askContent ?? post.content ?? "";
  const askCreated =
    post.askCreatedAt ??
    post.createdAt ??
    null;
  const writerName = post.user?.nickname ?? post.nickname ?? "익명";

  const answerContent =
    post.answerContent ?? post.answer?.content ?? null;
  const answerCreated =
    post.answerCreatedAt ?? post.answer?.createdAt ?? null;

  const isAnswered =
    Boolean(post.isAnswer) || Boolean(answerContent);

  const cleanHtml = sanitizeHtml(askContentRaw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
<<<<<<< HEAD
    allowedAttributes: { 
      a: ["href", "name", "target", "rel"], 
      img: ["src", "alt"] 
=======
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt"],
>>>>>>> origin/95-세부기능-다듬기-4
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
<<<<<<< HEAD
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" }
=======
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
>>>>>>> origin/95-세부기능-다듬기-4
      }),
    },
  });

<<<<<<< HEAD
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await reqAskComment({
        askId: post.askId,
        content: comment
      });
      alert("댓글이 등록되었습니다.");
      refetch();
      setComment("");
    } catch (err) {
      console.error(err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (askCommentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await reqDeleteAskComment(askCommentId);
      alert("댓글이 삭제되었습니다.");
      askCommentQuery.refetch();
    } catch (err) {
      console.error(err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };
=======
  const format = (d) =>
    d ? new Date(d).toLocaleString("ko-KR") : "-";
>>>>>>> origin/95-세부기능-다듬기-4

  return (
    <MainContainer>
      <div css={s.layout}>
        {/* 상단 바 */}
        <div css={s.topBar}>
<<<<<<< HEAD
          <button onClick={() => navigate(-1)}>← 목록</button>
          <span style={{ color: "#94a3b8", fontSize: 14 }}>
            글번호 #{post.askId}
          </span>
        </div>

        <h1 css={s.titleCss}>{post.title}</h1>
        <div css={s.metaCss}>
          <span>{post.user?.nickname ?? "익명"}</span>
          <span>
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
          </span>
        </div>

        <div css={s.contentCss} dangerouslySetInnerHTML={{ __html: cleanHtml }} />

        <div css={s.commentList}>
          {comments.length === 0 ? (
            <p>아직 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.askCommentId} css={s.commentItem}>
                {comment.status === 1 ? (
                  <p style={{ color: "#94a3b8", fontStyle: "italic" }}>
                    관리자에 의해 삭제된 댓글입니다.
                  </p>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <strong>
                          {comment.user?.role === "ROLE_ADMIN" && "관리자"}
                        </strong>
                        <span style={{ marginLeft: 8, color: "#94a3b8", fontSize: 14 }}>
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {isAdmin && (
                        <div>
                          {editingCommentId === comment.askCommentId ? (
                            <>
                              <button
                                style={{ marginRight: 6, backgroundColor: '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                                onClick={() => handleEditSave(comment.askCommentId)}
                              >
                                저장
                              </button>
                              <button
                                style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                                onClick={handleEditCancel}
                              >
                                취소
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                style={{ marginRight: 6 }}
                                onClick={() => handleEditClick(comment)}
                              >
                                수정
                              </button>
                              <button onClick={() => handleDeleteComment(comment.askCommentId)}>
                                삭제
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {editingCommentId === comment.askCommentId ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder={comment.content}
                        style={{
                          width: '100%',
                          minHeight: '80px',
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          resize: 'vertical',
                          fontSize: '14px'
                        }}
                      />
                    ) : (
                      <p style={{ margin: 0 }}>{comment.content}</p>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {isAdmin && (
          <div css={s.commentBox}>
            <textarea
              css={s.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button css={s.commentBtn} onClick={handleCommentSubmit}>
              댓글 달기
            </button>
=======
          <button css={s.backBtn} onClick={() => navigate(-1)} aria-label="목록으로">
            ← 목록
          </button>
          <div css={s.metaRight}>
            <span css={[s.stateChip, isAnswered ? s.chipAnswered : s.chipWaiting]}>
              {isAnswered ? "답변완료" : "대기"}
            </span>
            <span css={s.idText}>글번호 #{post.askId}</span>
>>>>>>> origin/95-세부기능-다듬기-4
          </div>
        </div>

        {/* 제목 & 작성 메타 */}
        <h1 css={s.title}>{post.title}</h1>
        <div css={s.metaRow}>
          <span>{writerName}</span>
          <span>{format(askCreated)}</span>
        </div>

        {/* 본문 */}
        <div css={s.card}>
          <div css={s.content} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>

        {/* 관리자 답변 (있을 때만 표시) */}
        {answerContent && (
          <>
            <div css={s.sectionTitle}>관리자 답변</div>
            <div css={[s.card, s.answerCard]}>
              <div css={s.answerMeta}>
                <span>관리자</span>
                <span>{format(answerCreated)}</span>
              </div>
              <div css={s.answerContent}>{answerContent}</div>
            </div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

export default AskDetail;