/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import ReactModal from "react-modal";
import { reqReportMember } from "../../../../../api/Crew/crewApi";

export default function ReportModal({ isOpen, onClose, userId, nickname, crewId, onSubmit }) {
  const [reason, setReason] = useState("");

  const modalStyles = useMemo(
    () => ({
      overlay: {
        backgroundColor: "#000000aa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      content: {
        position: "static",
        inset: "unset",
        border: "none",
        borderRadius: "12px",
        padding: 0,
        overflow: "hidden",
        background: "#fff",
        width: 360,
        maxWidth: "calc(100% - 24px)",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      },
    }),
    []
  );

  const submitOnClick = async () => {
    if (!reason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }
    try {
      await reqReportMember({ crewId, userId, reason });
      alert("신고가 접수되었습니다.");
      setReason("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReactModal isOpen={!!isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick style={modalStyles}>
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          fontWeight: 700,
        }}
      >
        신고하기
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 8 }}> 닉네임: {nickname}</div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 입력하세요"
          style={{ width: "100%", height: 120, resize: "none" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button onClick={onClose}>취소</button>
          <button onClick={submitOnClick}>제출</button>
        </div>
      </div>
    </ReactModal>
  );
}
