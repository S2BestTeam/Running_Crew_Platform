/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import ReactModal from "react-modal";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaCalendar, FaMapMarkerAlt, FaRunning, FaWonSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  reqAttendGathering,
  reqCancelAttendGathering,
  reqGatheringParticipants,
} from "../../../../api/Crew/gatheringApi";

function GatheringDetailModal({
  isOpen,
  onClose,
  gathering,
  onUpdateParticipants,
}) {
  const [isAttending, setIsAttending] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (gathering) {
      setIsAttending(gathering.isAttending || false);
      fetchParticipants();
    }
  }, [gathering]);

  const fetchParticipants = async () => {
    try {
      const data = await reqGatheringParticipants(
        gathering.crewId,
        gathering.gatheringId
      );
      setParticipants(data.data);
    } catch (err) {
      console.error("참석자 불러오기 실패:", err);
    }
  };

  const handleAttendToggle = async () => {
    if (!gathering) return;

    try {
      let currentParticipants = gathering.currentParticipants || 0;

      if (isAttending) {
        await reqCancelAttendGathering(gathering.crewId, gathering.gatheringId);
        currentParticipants = Math.max(currentParticipants - 1, 0);
        setIsAttending(false);
      } else {
        if (currentParticipants >= gathering.maxParticipants) {
          alert("이미 정원이 가득 찼습니다.");
          return;
        }
        await reqAttendGathering(gathering.crewId, gathering.gatheringId);
        currentParticipants = currentParticipants + 1;
        setIsAttending(true);
      }

      if (onUpdateParticipants) {
        onUpdateParticipants(
          gathering.gatheringId,
          currentParticipants,
          !isAttending
        );
      }

      onClose();
    } catch (err) {
      console.error("참석/불참 처리 실패:", err);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  if (!gathering) return null;

  const dateObj = new Date(`${gathering.runningDate}T${gathering.runningTime}`);
  let hours = dateObj.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;
  const formattedDate = `${dateObj.getFullYear()}년 ${
    dateObj.getMonth() + 1
  }월 ${dateObj.getDate()}일`;
  const formattedTime = `${ampm} ${hours}시 ${String(
    dateObj.getMinutes()
  ).padStart(2, "0")}분`;

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
        <header css={s.header}>{gathering.title}</header>
        <main css={s.main}>
          <div css={s.thumbnail}>
            <img src={gathering?.thumbnailPicture} alt="썸네일 이미지" />
          </div>
          <div>
            <div>설명: {gathering.content}</div>
            <div>
              <FaCalendar /> {formattedDate}
            </div>
            <div>
              <MdAccessTimeFilled /> {formattedTime}
            </div>
            <div>
              <FaMapMarkerAlt /> {gathering.placeName}
            </div>
            <div>
              <FaWonSign /> {gathering.cost}원
            </div>
            <div><FaRunning /> {gathering.km} km</div>

            <div>
              참석자 명단 ({participants.length} / {gathering.maxParticipants})
            </div>
            <div>
              {participants.map((p) => (
                <div key={p.userId}>
                  <img src={p.picture} alt="" width={30} height={30} />
                  <span>{p.fullName}</span>
                </div>
              ))}
            </div>

            <div css={s.profile}>
              <img src={gathering.user?.picture} alt="작성자" />
              <span>{gathering.user?.fullName || "알 수 없음"}</span>
            </div>
          </div>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleAttendToggle}>
            {isAttending ? "불참" : "참석"}
          </button>
        </main>
      </div>
    </ReactModal>
  );
}

export default GatheringDetailModal;
