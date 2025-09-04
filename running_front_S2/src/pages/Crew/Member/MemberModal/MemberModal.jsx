/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import ReactModal from "react-modal";

import { reqExpelMember, reqUpdateMemberRole } from "../../../../api/Crew/memberApi";
import useUserDetailQuery from "../../../../queries/useUserDetailQuery";


export default function MemberModal({ memberId, isOpen, onClose, isLeader = false, onChanged, onReport }) {
  const { data: detail, isLoading, isError } = useUserDetailQuery(memberId);

  const canGrant = !!(isLeader && detail && detail.roleId !== 1 && detail.roleId !== 2);
  const canDown = !!(isLeader && detail && detail.roleId !== 1 && detail.roleId !== 3);
  const canExpel = !!(isLeader && detail && detail.roleId !== 1);

  const handleUpdateRoleOnClick = async (roleId) => {
    try {
      await reqUpdateMemberRole({ memberId, roleId });
      alert("권한이 변경되었습니다.")
      onChanged();
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message ?? "권한 부여 실패");
    }
  }

  const handleExpelOnClick = async () => {
    if (!confirm("추방할까요?")) return;
    try {
      await reqExpelMember({memberId});
      alert("추방되었습니다.")
      onChanged();
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message ?? "추방 실패");
    }
  };

  const handleReportOnClick = () => {
    onClose();
    onReport(memberId);
  };

  const modalStyles = useMemo(
    () => ({
      overlay: {
        backgroundColor: "#000000aa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        fontSize: "1.6rem" 
      },
      content: {
        position: "static",
        inset: "unset",
        border: "none",
        borderRadius: "12px",
        padding: 0,
        overflow: "hidden",
        background: "#fff",
        width: 500,
        maxWidth: "calc(100% - 24px)",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      },
    }),
    []
  );
  return (
    <ReactModal isOpen={!!isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick style={modalStyles} >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>멤버 정보</span>
        <button onClick={handleReportOnClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }} title="신고하기">
          🚨
        </button>
      </div>

      <div style={{ padding: 16}}>
        {isLoading && <div>불러오는 중…</div>}
        {isError && <div style={{ color: "crimson" }}>정보를 불러오지 못했어요.</div>}

        {!isLoading && !isError && detail && (
          <div style={{ display: "grid", rowGap: 15 }}>
            <img src={detail.user.picture} alt="" style={{ width: 64, height: 64, borderRadius: "50%" }}/>
            <div>
              <b>닉네임</b> : {detail.user.nickname}
            </div>
            <div>
              <b>실명</b> : {detail.user.fullName}
            </div>
            <div>
              <b>성별</b> : {detail.user.gender === 1 ? "남성" : "여성"}
            </div>
            <div>
              <b>생년월일</b> : {detail.user.birthDate ?? "-"}
            </div>
            <div>
              <b>총 거리</b> : {detail.user.totalKM ?? 0} km
            </div>
          </div>
        )}
      </div>
      

     {isLeader && detail?.roleId !== 1 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 16px",
            borderTop: "1px solid #eee",
            justifyContent: "flex-end",
          }}
        >
          {detail?.roleId === 2 ? (<button disabled={!canDown} onClick={() => handleUpdateRoleOnClick(3)}>
            운영진 권한 박탈
          </button>) : (<button disabled={!canGrant} onClick={() => handleUpdateRoleOnClick(2)}>
            운영진 권한 부여
          </button>)
          }
          <button disabled={!canExpel} onClick={handleExpelOnClick}>
            추방하기
          </button>
        </div>
      )}
    </ReactModal>
  );
}