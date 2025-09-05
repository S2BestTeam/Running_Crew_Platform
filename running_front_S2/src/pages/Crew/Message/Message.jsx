import React from 'react';
import useGetCrewMessage from '../../../queries/useGetCrewMessageQuery';
import { useCrewStore } from '../../../stores/useCrewStroes';

export default function Message() {
  const { crewId } = useCrewStore();
  const { data: messages = [], isLoading, isError, error, refetch } = useGetCrewMessage(crewId);

  if (isLoading) return <div>메시지를 불러오는 중...</div>;
  if (isError)   return <div>메시지 로드 실패: {String(error?.message ?? "알 수 없는 오류")}</div>;

  if (!messages.length) {
    return (
      <div>
        <div>수신한 메시지가 없습니다.</div>
        <button onClick={() => refetch()}>새로고침</button>
      </div>
    );
  }

  return (
    <div>
      {messages.map(m => (
        <div key={m.messageId}>
          <div>
            <span>ADMIN</span>
            <span>{(m.createdAt)}</span>
          </div>
          <div >
            {m?.content ?? ""}
          </div>
        </div>
      ))}
    </div>
  );
}