/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaMapMarkerAlt, FaWonSign } from "react-icons/fa";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import GatheringRegModal from "./GatheringRegModal/GatheringRegModal";


function Gathering({ crewId }) {
  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [isOpen, setOpen] = useState(false);
  const gatherings = gatheringsQuery?.data?.data.body || [];
  console.log(gatherings);
  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div css={s.mainBox}>
        <header>
          <h2>정모 일정</h2>
          <button onClick={() => setOpen(true)}>일정 등록</button>
        </header>
        <main>
          {gatherings.map((g, idx) => (
            <div css={s.gatheringContainer} key={idx}>
              <div css={s.thumbnailImg}>
                <img src={g.thumbnailPicture} alt={g.title} />
              </div>
              <div css={s.gatheringInfoContainer}>
                <div>{g.title}</div>
                <div>
                  <div>
                    <MdAccessTimeFilled />
                  </div>
                  <div>
                    {g.runningDate} {g.runningTime}
                  </div>
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
                    <img src={g.user.picture} alt="" />
                  </div>
                  <div>{g.maxParticipants}</div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <GatheringRegModal
        crewId={crewId}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
}

export default Gathering;