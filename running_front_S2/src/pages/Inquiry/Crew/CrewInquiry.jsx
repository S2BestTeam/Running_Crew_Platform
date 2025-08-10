/** @jsxImportSource @emotion/react */
import * as s from './styles';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { reqRegisterInquiryCrew } from '../../../api/Inquiry/crewInquiryApi';

function CrewInquiry(props) {
  const principalQuery = usePrincipalQuery();
  const user = principalQuery?.data?.data?.body?.user;
  
  const [ inquiries, setInquiries ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedInquiry, setSelectedInquiry ] = useState(null);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ editingId, setEditingId ] = useState(null);
  const [ inquiry, setInquiry ] = useState({
    title: '',
    content: '',
    category: '일반'
  });

  useEffect(() => {
    // 추후 API 호출로 문의 목록 가져오기
    setInquiries([
      { id: 1, userId: 1, user: "현재사용자", title: "결제 관련 문의", content: "결제가 안되는 문제입니다.", date: "2025-08-09", status: "대기", category: "결제" },
      { id: 2, userId: 2, user: "김철수", title: "회원가입 오류", content: "회원가입 시 오류가 발생합니다.", date: "2025-08-08", status: "처리 완료", category: "계정" },
      { id: 3, userId: 3, user: "이영희", title: "로그인 문제", content: "로그인이 되지 않습니다.", date: "2025-08-07", status: "대기", category: "기술지원" }
    ]);
  }, []);

  const handleWriteButtonClick = () => {
    setIsEditMode(false);
    setEditingId(null);
    setInquiry({ title: '', content: '', category: '일반' });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setInquiry({ title: '', content: '', category: '일반' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!inquiry.title.trim() || !inquiry.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    if (isEditMode) {
      // 수정 모드
      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === editingId 
          ? {
              ...inquiry,
              title: inquiry.title,
              content: inquiry.content,
              category: inquiry.category
            }
          : inquiry
      ));
    } else {
      // 새 글 작성 모드
      const newInquiry = {
        id: inquiries.length + 1,
        userId: user.id,
        user: user.nickname,
        title: inquiry.title,
        content: inquiry.content,
        category: inquiry.category,
        date: new Date().toISOString().split('T')[0],
        status: "대기"
      };
      setInquiries(prev => [newInquiry, ...prev]);
      reqRegisterInquiryCrew(inquiries);
    }

    handleModalClose();
  };

  const handleRowClick = (inquiry) => {
    // 본인이 작성한 글만 상세보기 가능
    if (inquiry.userId === user.id) {
      setSelectedInquiry(inquiry);
    }
  };

  const handleDetailModalClose = () => {
    setSelectedInquiry(null);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setEditingId(selectedInquiry.id);
    setInquiry({
      title: selectedInquiry.title,
      content: selectedInquiry.content,
      category: selectedInquiry.category || '일반'
    });
    setSelectedInquiry(null); // 상세보기 모달 닫기
    setIsModalOpen(true); // 편집 모달 열기
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setInquiries(prev => prev.filter(inq => inq.id !== selectedInquiry.id));
      setSelectedInquiry(null);
    }
  };

  // 본인 글이 아닌 경우 마스킹 처리
  const getMaskedData = (inquiry, field) => {
    if (inquiry.userId === user.id) {
      return inquiry[field];
    }
    
    switch (field) {
      case 'title':
        return '비공개 문의';
      case 'user':
        return '***';
      default:
        return inquiry[field];
    }
  };

  return (
    <>
      <div css={s.headerSection}>
        <div>
          <button onClick={handleWriteButtonClick}>글쓰기</button>
        </div>
      </div>
      <div css={s.container}>
        <table css={s.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>상태</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr 
                key={inq.id} 
                css={s.tableRow(inq.userId === user.id)}
                onClick={() => handleRowClick(inq)}
              >
                <td>{inq.id}</td>
                <td>{getMaskedData(inq, 'user')}</td>
                <td>{getMaskedData(inq, 'title')}</td>
                <td>{inq.status}</td>
                <td>{inq.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 글쓰기/수정 모달 */}
      <ReactModal
        style={s.modalStyles}
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
      >
        <div css={s.modalContainer}>
          <header css={s.modalHeader}>
            <h2>{isEditMode ? '문의 수정' : '문의 작성'}</h2>
            <button css={s.closeButton} onClick={handleModalClose}>
              <FiX />
            </button>
          </header>
          
          <main css={s.modalContent}>
            <div css={s.formGroup}>
              <label>카테고리</label>
              <select 
                name="category" 
                value={inquiry.category} 
                onChange={handleInputChange}
                css={s.selectInput}
              >
                <option value="일반">일반</option>
                <option value="결제">결제</option>
                <option value="기술지원">기술지원</option>
                <option value="계정">계정</option>
              </select>
            </div>

            <div css={s.formGroup}>
              <label>제목</label>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력해주세요"
                value={inquiry.title}
                onChange={handleInputChange}
                css={s.textInput}
              />
            </div>

            <div css={s.formGroup}>
              <label>내용</label>
              <textarea
                name="content"
                placeholder="문의 내용을 자세히 입력해주세요"
                value={inquiry.content}
                onChange={handleInputChange}
                rows={8}
                css={s.textareaInput}
              />
            </div>
          </main>

          <footer css={s.modalFooter}>
            <button css={s.submitButton} onClick={handleSubmit}>
              {isEditMode ? '수정' : '등록'}
            </button>
          </footer>
        </div>
      </ReactModal>

      {/* 문의 상세보기 모달 */}
      <ReactModal
        style={s.detailModalStyles}
        isOpen={!!selectedInquiry}
        onRequestClose={handleDetailModalClose}
      >
        {selectedInquiry && (
          <div css={s.modalContainer}>
            <header css={s.modalHeader}>
              <h2>문의 상세보기</h2>
              <button css={s.closeButton} onClick={handleDetailModalClose}>
                <FiX onClick={handleDetailModalClose}/>
              </button>
            </header>
            
            <main css={s.modalContent}>
              <div css={s.detailSection}>
                <div css={s.detailRow}>
                  <span css={s.label}>카테고리:</span>
                  <span>{selectedInquiry.category}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>작성자:</span>
                  <span>{selectedInquiry.user}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>작성일:</span>
                  <span>{selectedInquiry.date}</span>
                </div>
                <div css={s.detailRow}>
                  <span css={s.label}>상태:</span>
                  <span css={s.statusBadge(selectedInquiry.status)}>{selectedInquiry.status}</span>
                </div>
              </div>
              
              <div css={s.detailSection}>
                <h3>제목</h3>
                <p>{selectedInquiry.title}</p>
              </div>
              
              <div css={s.detailSection}>
                <h3>내용</h3>
                <div css={s.contentArea}>
                  {selectedInquiry.content}
                </div>
              </div>
            </main>

            <footer css={s.modalFooter}>
              {selectedInquiry.status === '대기' && (
                <>
                  <button css={s.updateButton} onClick={handleEditClick}>
                    수정
                  </button>
                  <button css={s.deleteButton} onClick={handleDeleteClick}>
                    삭제
                  </button>
                </>
              )}
            </footer>
          </div>
        )}
      </ReactModal>
    </>
  );
}

export default CrewInquiry;