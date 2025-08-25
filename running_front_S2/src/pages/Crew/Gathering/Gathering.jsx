/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaCalendar, FaMapMarkerAlt, FaWonSign } from "react-icons/fa";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import GatheringRegModal from "./GatheringRegModal/GatheringRegModal";
import GatheringDetailModal from "./GatheringDetailModal/GatheringDetailModal";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";

function Gathering({ crewId }) {
  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [isRegOpen, setRegOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(null);
  const [gatherings, setGatherings] = useState([]);

  useEffect(() => {
    if (gatheringsQuery?.data?.data?.body) {
      setGatherings(gatheringsQuery.data.data.body);
    }
  }, [gatheringsQuery?.data]);

  const handleModalClose = () => {
    setRegOpen(false);
    setDetailOpen(false);
  };

  const handleOpenDetailModal = (gathering) => {
    setSelectedGathering(gathering);
    setDetailOpen(true);
  };

  const handleUpdateParticipants = (
    gatheringId,
    currentParticipants,
    isAttending
  ) => {
    setGatherings((prev) =>
      prev.map((g) =>
        g.gatheringId === gatheringId
          ? { ...g, currentParticipants, isAttending }
          : g
      )
    );
  };

  return (
    <ContentLayout>
      <div css={s.layout}>
        <header>
          <h2>정모 일정</h2>
          <button onClick={() => setRegOpen(true)}>일정 등록</button>
        </header>
        <main css={s.gatheringMain}>
          {gatherings.map((g, index) => {
            const dateObj = new Date(`${g.runningDate}T${g.runningTime}`);
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
              <div
                key={index}
                css={s.gatheringContainer}
                onClick={() => handleOpenDetailModal(g)}
              >
                <div css={s.thumbnailImg}>
                  <img src={g?.thumbnailPicture} alt="썸네일 이미지" />
                </div>
                <div css={s.gatheringInfoContainer}>
                  <div css={s.gatheringTitle}>{g.title}</div>
                  <div>
                    <FaCalendar /> {formattedDate}
                  </div>
                  <div>
                    <MdAccessTimeFilled /> {formattedTime}
                  </div>
                  <div>
                    <FaMapMarkerAlt /> {g.placeName}
                  </div>
                  <div>
                    <FaWonSign /> {g.cost}
                  </div>
                  <div css={s.statusContainer}>
                    <div>
                      <div css={s.profileImg}>
                        <img src={g?.user?.picture} alt="프로필 사진" />
                      </div>
                      <div>
                        {g.currentParticipants} / {g.maxParticipants}
                      </div>
                    </div>
                    <div css={s.status}>
                      <div>모집중</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      <GatheringRegModal
        crewId={crewId}
        isOpen={isRegOpen}
        onClose={handleModalClose}
      />
      <GatheringDetailModal
        isOpen={isDetailOpen}
        onClose={handleModalClose}
        gathering={selectedGathering}
        onUpdateParticipants={handleUpdateParticipants}
      />
    </ContentLayout>
  );
}

export default Gathering;
