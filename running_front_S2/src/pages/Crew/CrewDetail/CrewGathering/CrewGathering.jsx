/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import CrewGatheringRegisterModal from "./CrewGatheringRegisterModal/CrewGatheringRegisterModal";


function CrewGathering({ crewId }) {
  const [isOpen, setOpen] = useState(true);
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
