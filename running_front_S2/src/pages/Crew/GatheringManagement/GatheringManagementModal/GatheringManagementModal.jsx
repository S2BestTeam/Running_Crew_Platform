/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import * as s from "./styles";

function GatheringManagementModal({ isOpen, onClose, participants }) {
  const [checkedState, setCheckedState] = useState(
    participants.map(() => false)
  );

  const handleCheckboxChange = (index) => {
    const updated = [...checkedState];
    updated[index] = !updated[index];
    setCheckedState(updated);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box css={s.modalBox}>
        <div>참석자 ({participants.length}명)</div>
        <table css={s.participantTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>참석자</th>
              <th>참석여부</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={p.userId} css={s.participantRow}>
                <td>{index + 1}</td>
                <td css={s.participantCell}>
                  <img src={p.picture} alt="" css={s.participantImg} />
                  <span>{p.nickname}({p.fullName})</span>
                </td>
                <td>
                  <Checkbox
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          닫기
        </Button>
      </Box>
    </Modal>
  );
}

export default GatheringManagementModal;
