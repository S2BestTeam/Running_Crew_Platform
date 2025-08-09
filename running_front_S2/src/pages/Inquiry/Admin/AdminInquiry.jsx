/** @jsxImportSource @emotion/react */
import * as s from './styles';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';

function AdminCrewInquiry(props) {
  const principalQuery = usePrincipalQuery();
  const admin = principalQuery?.data?.data?.body?.user;
  
  const [ inquiries, setInquiries ] = useState([]);
  const [ selectedInquiry, setSelectedInquiry ] = useState(null);
  const [ isStatusModalOpen, setIsStatusModalOpen ] = useState(false);
  const [ selectedStatus, setSelectedStatus ] = useState('');
  const [ adminReply, setAdminReply ] = useState('');

  useEffect(() => {
    // 추후 API 호출로 문의 목록 가져오기 (관리자는 모든 문의를 볼 수 있음)
    setInquiries([
      { id: 1, userId: 1, user: "현재사용자", title: "결제 관련 문의", content: "결제가 안되는 문제입니다.", date: "2025-08-09", status: "대기", category: "결제", adminReply: "" },
      { id: 2, userId: 2, user: "김철수", title: "회원가입 오류", content: "회원가입 시 오류가 발생합니다.", date: "2025-08-08", status: "처리 완료", category: "계정", adminReply: "회원가입 오류를 수정했습니다. 다시 시도해주세요." },
      { id: 3, userId: 3, user: "이영희", title: "로그인 문제", content: "로그인이 되지 않습니다.", date: "2025-08-07", status: "대기", category: "기술지원", adminReply: "" },
      { id: 4, userId: 4, user: "박민수", title: "환불 요청", content: "서비스에 불만족하여 환불을 요청합니다.", date: "2025-08-06", status: "처리 중", category: "결제", adminReply: "" },
      { id: 5, userId: 5, user: "정수연", title: "기능 문의", content: "새로운 기능에 대한 문의사항입니다.", date: "2025-08-05", status: "대기", category: "일반", adminReply: "" }
    ]);
  }, []);

  const handleRowClick = (inquiry) => {
    // 관리자는 모든 문의를 상세보기 할 수 있음
    setSelectedInquiry(inquiry);
  };

  const handleDetailModalClose = () => {
    setSelectedInquiry(null);
  };

  const handleStatusChangeClick = () => {
    setSelectedStatus(selectedInquiry.status);
    setAdminReply(selectedInquiry.adminReply || '');
    setIsStatusModalOpen(true);
  };

  const handleStatusModalClose = () => {
    setIsStatusModalOpen(false);
    setSelectedStatus('');
    setAdminReply('');
  };

  const handleStatusUpdate = () => {
    if (!selectedStatus) {
      alert('상태를 선택해주세요.');
      return;
    }

    // 처리 완료나 처리 중일 때는 답변이 필요할 수 있음
    if ((selectedStatus === '처리 완료' || selectedStatus === '처리 중') && !adminReply.trim()) {
      const confirmResult = window.confirm('답변 없이 상태를 변경하시겠습니까?');
      if (!confirmResult) return;
    }

    // 문의 상태 및 답변 업데이트
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === selectedInquiry.id 
        ? {
            ...inquiry,
            status: selectedStatus,
            adminReply: adminReply.trim(),
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : inquiry
    ));

    // 선택된 문의도 업데이트
    setSelectedInquiry(prev => ({
      ...prev,
      status: selectedStatus,
      adminReply: adminReply.trim(),
      updatedDate: new Date().toISOString().split('T')[0]
    }));

    handleStatusModalClose();
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 문의를 삭제하시겠습니까?\n삭제된 문의는 복구할 수 없습니다.')) {
      setInquiries(prev => prev.filter(inq => inq.id !== selectedInquiry.id));
      setSelectedInquiry(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '대기':
        return '#ff6b6b';
      case '처리 중':
        return '#feca57';
      case '처리 완료':
        return '#48dbfb';
      case '보류':
        return '#ff9ff3';
      default:
        return '#ddd';
    }
  };

  const getStatusCount = (status) => {
    return inquiries.filter(inq => inq.status === status).length;
  };

  return (
    <>
      <div css={s.headerSection}>
        <div css={s.adminHeader}>
          <h2>문의 관리</h2>
          <div css={s.statusSummary}>
            <span css={s.statusItem}>
              대기: <strong>{getStatusCount('대기')}</strong>
            </span>
            <span css={s.statusItem}>
              처리 중: <strong>{getStatusCount('처리 중')}</strong>
            </span>
            <span css={s.statusItem}>
              처리 완료: <strong>{getStatusCount('처리 완료')}</strong>
            </span>
            <span css={s.statusItem}>
              보류: <strong>{getStatusCount('보류')}</strong>
            </span>
          </div>
        </div>
      </div>
      
      <div css={s.container}>
        <table css={s.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>작성자</th>
              <th>제목</th>
              <th>내용</th>
              <th>상태</th>
              <th>작성일</th>
              <th>처리일</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr 
                key={inq.id} 
                css={s.adminTableRow}
                onClick={() => handleRowClick(inq)}
              >
                <td>{inq.id}</td>
                <td>
                  <span css={s.categoryBadge}>{inq.category}</span>
                </td>
                <td>{inq.user}</td>
                <td css={s.titleCell}>{inq.title}</td>
                <td css={s.contentCell}>{inq.content}</td>
                <td>
                  <span 
                    css={s.statusBadge} 
                    style={{ backgroundColor: getStatusColor(inq.status) }}
                  >
                    {inq.status}
                  </span>
                </td>
                <td>{inq.date}</td>
                <td>{inq.updatedDate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 문의 상세보기 모달 (관리자용) */}
      <ReactModal
        style={s.detailModalStyles}
        isOpen={!!selectedInquiry}
        onRequestClose={handleDetailModalClose}
      >
        {selectedInquiry && (
          <div css={s.modalContainer}>
            <header css={s.modalHeader}>
              <h2>문의 상세보기 (관리자)</h2>
              <button css={s.closeButton} onClick={handleDetailModalClose}>
                <FiX />
              </button>
            </header>
            
            <main css={s.modalContent}>
              <div css={s.detailSection}>
                <div css={s.detailRow}>
                  <span css={s.label}>문의 번호:</span>
                  <span>#{selectedInquiry.id}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>카테고리:</span>
                  <span css={s.categoryBadge}>{selectedInquiry.category}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>작성자:</span>
                  <span>{selectedInquiry.user} (ID: {selectedInquiry.userId})</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>작성일:</span>
                  <span>{selectedInquiry.date}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>현재 상태:</span>
                  <span 
                    css={s.statusBadge} 
                    style={{ backgroundColor: getStatusColor(selectedInquiry.status) }}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
                {selectedInquiry.updatedDate && (
                  <div css={s.detailRow}>
                    <span css={s.label}>처리일:</span>
                    <span>{selectedInquiry.updatedDate}</span>
                  </div>
                )}
              </div>
              
              <div css={s.detailSection}>
                <h3>문의 제목</h3>
                <p css={s.inquiryTitle}>{selectedInquiry.title}</p>
              </div>
              
              <div css={s.detailSection}>
                <h3>문의 내용</h3>
                <div css={s.contentArea}>
                  {selectedInquiry.content}
                </div>
              </div>

              {selectedInquiry.adminReply && (
                <div css={s.detailSection}>
                  <h3>관리자 답변</h3>
                  <div css={s.adminReplyArea}>
                    {selectedInquiry.adminReply}
                  </div>
                </div>
              )}
            </main>

            <footer css={s.modalFooter}>
              <button css={s.statusButton} onClick={handleStatusChangeClick}>
                상태 변경
              </button>
              <button css={s.deleteButton} onClick={handleDeleteClick}>
                삭제
              </button>
              <button css={s.cancelButton} onClick={handleDetailModalClose}>
                닫기
              </button>
            </footer>
          </div>
        )}
      </ReactModal>

      {/* 상태 변경 모달 */}
      <ReactModal
        style={s.modalStyles}
        isOpen={isStatusModalOpen}
        onRequestClose={handleStatusModalClose}
      >
        <div css={s.modalContainer}>
          <header css={s.modalHeader}>
            <h2>문의 상태 변경</h2>
            <button css={s.closeButton} onClick={handleStatusModalClose}>
              <FiX />
            </button>
          </header>
          
          <main css={s.modalContent}>
            <div css={s.formGroup}>
              <label>문의 번호</label>
              <p css={s.readOnlyText}>#{selectedInquiry?.id} - {selectedInquiry?.title}</p>
            </div>

            <div css={s.formGroup}>
              <label>상태 변경</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                css={s.selectInput}
              >
                <option value="">상태를 선택하세요</option>
                <option value="대기">대기</option>
                <option value="처리 중">처리 중</option>
                <option value="처리 완료">처리 완료</option>
                <option value="보류">보류</option>
              </select>
            </div>

            <div css={s.formGroup}>
              <label>관리자 답변 (선택사항)</label>
              <textarea
                placeholder="고객에게 전달할 답변을 입력하세요"
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                rows={6}
                css={s.textareaInput}
              />
            </div>
          </main>

          <footer css={s.modalFooter}>
            <button css={s.cancelButton} onClick={handleStatusModalClose}>
              취소
            </button>
            <button css={s.submitButton} onClick={handleStatusUpdate}>
              상태 변경
            </button>
          </footer>
        </div>
      </ReactModal>
    </>
  );
}

export default AdminCrewInquiry;