import React from 'react';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { useCrewDetailQuery } from '../../../queries/useCrewDetailQuery';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { useNavigate, useParams } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from './styles';

function ReportMember(props) {
    const principal = usePrincipalQuery();
    const userId = principal?.data?.data?.body?.user?.userId;
    const { crewId } = useParams();
    const { data: crewData, isLoading } = useCrewDetailQuery(crewId);
    const navigate = useNavigate();

    const crew = crewData?.body || {
        crewId: Number(crewId),
        crewProfileImg: "",
        crewName: "",
        userId: 0,
        title: "",
        content: "",
        limitedPeople: 0,
        crewTotalKm: 0,
    };

    if (isLoading) {
        return (
            <MainContainer>
                <div>로딩중...</div>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <div css={s.layout}>
                <div css={s.leftBox}>
                    <div>
                        <div css={s.crewInfoBox}>
                            <div css={s.crewImgBox}></div>
                            <div
                                css={s.crewNameBox}
                                onClick={() => navigate(`/crews/${crewId}`)}
                            >
                                {crew.crewName}
                            </div>
                        </div>
                        <div css={s.buttonContainer}>
                            <button onClick={() => navigate(`/crews/${crewId}/members`)}>
                                크루 멤버
                            </button>
                            <button>정모 일정</button>
                            <button>가입 인사</button>
                            <button>자유게시판</button>
                            <button>사진첩</button>
                            <button>공지사항</button>
                            <button>문의사항</button>
                            {crew.userId === userId && (
                                <>
                                    <button onClick={() => navigate(`/crews/${crew.crewId}/report`)}>신고사항</button>
                                    <button onClick={() => navigate(`/crews/${crew.crewId}/setting`)}>설정</button>
                                </>
                            )}
                        </div>
                    </div>
                    {crew.userId !== userId && (
                        <div css={s.getout}>
                            <button>탈퇴하기</button>
                        </div>
                    )}
                </div>
            </div>
        </MainContainer >
    )
}

export default ReportMember;