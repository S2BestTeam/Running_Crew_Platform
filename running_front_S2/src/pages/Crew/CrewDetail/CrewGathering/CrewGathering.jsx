/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import CrewGatheringRegisterModal from "./CrewGatheringRegisterModal/CrewGatheringRegisterModal";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaMapMarkerAlt, FaWonSign } from "react-icons/fa";


function CrewGathering({ crewId }) {
  const [isOpen, setOpen] = useState(false);
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
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <div>
                <div>정모이름</div>
                <div>
                  <span><MdAccessTimeFilled /></span>
                  <span>오늘 오후 7시</span>
                </div>
                <div>
                  <span><FaMapMarkerAlt /></span>
                  <span>만덕역</span>
                </div>
                <div>
                  <span><FaWonSign /></span>
                  <span>10000</span>
                </div>
                <div>
                  <span><img src="" alt="" /></span>
                  <span>1/10</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <CrewGatheringRegisterModal
        crewId={crewId}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
}

export default CrewGathering;
