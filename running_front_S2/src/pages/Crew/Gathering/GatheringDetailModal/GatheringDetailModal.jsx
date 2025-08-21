/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import ReactModal from "react-modal";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaMapMarkerAlt, FaWonSign } from "react-icons/fa";

function GatheringDetailModal({ isOpen, onClose, gathering }) {

  if (!gathering) return null;
  

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000bb",
        },
        content: {
          position: "static",
          backgroundColor: "#fff",
          padding: "20px",
          border: "none",
          borderRadius: "8px",
          width: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
        },
      }}
    >
      <div css={s.layout}>
        <header css={s.header}>
          <h2>{gathering.title}</h2>
          <button onClick={onClose}>닫기</button>
        </header>
        <main css={s.main}>
          <div css={s.thumbnail}>
            <img src={gathering.thumbnailPicture} alt={gathering.title} />
          </div>
          <div>
            <p>
              <strong>설명:</strong> {gathering.content}
            </p>
            <p>
              <MdAccessTimeFilled /> {gathering.runningDate}{" "}
              {gathering.runningTime}
            </p>
            <p>
              <FaMapMarkerAlt /> {gathering.placeName}
            </p>
            <p>
              <FaWonSign /> {gathering.cost}원
            </p>
            <p>최대인원: {gathering.maxParticipants}</p>
            <div css={s.profile}>
              <img src={gathering?.user.picture} alt="작성자" />
              <span>{gathering?.user.fullName || "알 수 없음"}</span>
            </div>
          </div>

        </main>
      </div>
    </ReactModal>
  );
}

export default GatheringDetailModal;
