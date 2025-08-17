// import { useState } from "react";
// import ReactModal from "react-modal";

// function ReportModal({ isOpen, onClose, crewId, userId }) {

//   const [reason, setReason] = useState("");
//   const submitOnClick = async () => {
//     await reqReportMember({ crewId, userId, reason });
//   };

//   return (
//     <ReactModal isOpen={!!isOpen} onRequestClose={onClose}>
//       <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", fontWeight: 700 }}>
//         신고하기
//       </div>
//       <div style={{ padding: 16 }}>
//         <div style={{ marginBottom: 8 }}>대상 사용자 ID: {userId}</div>
//         <textarea
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           placeholder="신고 사유를 입력하세요"
//           style={{ width: "100%", height: 120 }}
//         />
//         <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//           <button onClick={submitOnClick}>제출</button>
//         </div>
//       </div>
//     </ReactModal>
//   );
// }

// export default ReportModal;