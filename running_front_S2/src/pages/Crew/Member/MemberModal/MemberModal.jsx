/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import ReactModal from "react-modal";

import { reqExpelMember, reqUpdateMemberRole } from "../../../../api/Crew/memberApi";
import useUserDetailQuery from "../../../../queries/useUserDetailQuery";
import * as s from "./styles";

export default function MemberModal({ memberId, isOpen, onClose, isLeader = false, onChanged, onReport }) {
  const { data: detail, isLoading, isError } = useUserDetailQuery(memberId);

  const canGrant = !!(isLeader && detail && detail.roleId !== 1 && detail.roleId !== 2);
  const canDown = !!(isLeader && detail && detail.roleId !== 1 && detail.roleId !== 3);
  const canExpel = !!(isLeader && detail && detail.roleId !== 1);

  const modalStyles = useMemo(() => s.modalStyles, []);

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

  return (
    <ReactModal isOpen={!!isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick style={modalStyles} >
      <div css={s.headerStyle}>
        <span>멤버 정보</span>
      </div>

      <div css={s.contentStyle}>
        {isLoading && <div css={s.loadingStyle}>불러오는 중…</div>}
        {isError && <div css={s.errorStyle}>정보를 불러오지 못했어요.</div>}

        {!isLoading && !isError && detail && (
          <div css={s.detailGridStyle}>
            <img src={detail.user.picture} alt="" css={s.profileImageStyle}/>
            <div css={s.infoItemStyle}>
              <b>닉네임</b> : {detail.user.nickname}
            </div>
            <div css={s.infoItemStyle}>
              <b>실명</b> : {detail.user.fullName}
            </div>
            <div css={s.infoItemStyle}>
              <b>성별</b> : {detail.user.gender === 1 ? "남성" : "여성"}
            </div>
            <div css={s.infoItemStyle}>
              <b>생년월일</b> : {detail.user.birthDate ?? "-"}
            </div>
            <div css={s.infoItemStyle}>
              <b>총 거리</b> : {detail.user.totalKM ?? 0} km
            </div>
          </div>
        )}
      </div>
      
      {isLeader && detail?.roleId !== 1 && (
        <div css={s.actionsStyle}>
          {detail?.roleId === 2 ? (
            <button css={s.actionButtonStyle} disabled={!canDown} onClick={() => handleUpdateRoleOnClick(3)}>
              운영진 권한 박탈
            </button>
          ) : (
            <button css={s.actionButtonStyle} disabled={!canGrant} onClick={() => handleUpdateRoleOnClick(2)}>
              운영진 권한 부여
            </button>
          )}
          <button css={s.expelButtonStyle} disabled={!canExpel} onClick={handleExpelOnClick}>
            추방하기
          </button>
        </div>
      )}
    </ReactModal>
  );
}