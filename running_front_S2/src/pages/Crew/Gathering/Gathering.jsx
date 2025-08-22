/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { MdAccessTimeFilled, MdDateRange } from "react-icons/md";
import { FaCalendar, FaMapMarkerAlt, FaWonSign } from "react-icons/fa";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import GatheringRegModal from "./GatheringRegModal/GatheringRegModal";
import GatheringDetailModal from "./GatheringDetailModal/GatheringDetailModal";

function Gathering({ crewId }) {
  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [isRegOpen, setRegOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(null);
  const gatherings = gatheringsQuery?.data?.data.body || [];
  console.log(gatherings);

  const handleModalClose = () => {
    setRegOpen(false);
    setDetailOpen(false);
  };

  const handleOpenDetailModal = (gathering) => {
    setSelectedGathering(gathering);
    setDetailOpen(true);
  };

  return (
    <>
      <div css={s.mainBox}>
        <header>
          <h2>정모 일정</h2>
          <button onClick={() => setRegOpen(true)}>일정 등록</button>
        </header>
        <main css={s.gatheringMain}>
          {gatherings.map((g, index) => (
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
                  <div>
                    <FaCalendar />
                  </div>
                  <div>{g.runningDate}</div>
                </div>
                <div>
                  <div>
                    <MdAccessTimeFilled />
                  </div>
                  <div>{g.runningTime}</div>
                </div>
                <div>
                  <div>
                    <FaMapMarkerAlt />
                  </div>
                  <div>{g.placeName}</div>
                </div>
                <div>
                  <div>
                    <FaWonSign />
                  </div>
                  <div>{g.cost}</div>
                </div>
                <div>
                  <div css={s.profileImg}>
                    <img src={g?.user?.picture} alt="프로필 사진" />
                  </div>
                  <div> 1 / {g.maxParticipants}</div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <GatheringRegModal
        crewId={crewId}
        isOpen={isRegOpen}
        onClose={handleModalClose}
      />
      <GatheringDetailModal
        crewId={crewId}
        isOpen={isDetailOpen}
        onClose={handleModalClose}
        gathering={selectedGathering}
      />
    </>
  );
}

export default Gathering;
