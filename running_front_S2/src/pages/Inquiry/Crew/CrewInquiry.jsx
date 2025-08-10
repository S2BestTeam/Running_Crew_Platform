
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { reqGetInquiriesCrew, reqRegisterInquiryCrew } from '../../../api/Inquiry/crewInquiryApi';

ReactModal.setAppElement('#root');

function CrewInquiry() {
  const principalQuery = usePrincipalQuery();
  const user = principalQuery?.data?.data?.body?.user;
  const currentUserId = user?.userId;

  const [inquiries, setInquiries] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const fetchInquiries = async () => {
    setListLoading(true);
    try {
      const response = await reqGetInquiriesCrew();
      setInquiries(response.data.body);
      
    } catch (error) {
      console.error('목록 조회 실패:', error);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const deleteInquiryList = (inquiryId) => {
    setInquiries(prev => prev.filter(inq => inq.crewInquiryId !== inquiryId));
  };

  const modifyInquiryList = (inquiryId, modifyData) => {
    setInquiries(prev => prev.map(item => 
      item.crewInquiryId === inquiryId ? { ...item, ...modifyData } : item
    ));
  };

  // Register 관련 상태 & 코드
  const [registerModal, setRegisterModal] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    title: '',
    content: '',
    category: '일반'
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  const openRegisterModal = () => {
    setRegisterForm({ title: '', content: '', category: '일반' });
    setRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setRegisterModal(false);
    setRegisterForm({ title: '', content: '', category: '일반' });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async () => {
    if (!registerForm.title.trim() || !registerForm.content.trim()) {
      return alert('제목과 내용을 모두 입력해주세요.');
    }

    setRegisterLoading(true);
    try {
      await reqRegisterInquiryCrew(registerForm);
      await fetchInquiries();
      closeRegisterModal();
      alert('문의가 등록되었습니다.');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('문의 등록에 실패했습니다.');
    } finally {
      setRegisterLoading(false);
    }
  };

  // Modify 상태 & 코드
  const [modifyModal, setModifyModal] = useState(false);
  const [modifyForm, setModifyForm] = useState({
    id: null,
    title: '',
    content: '',
    category: '일반'
  });
  const [editLoading, setEditLoading] = useState(false);

  const openModifyModal = (inquiry) => {
    setModifyForm({
      id: inquiry.crewInquiryId,
      title: inquiry.title,
      content: inquiry.content,
      category: inquiry.category || '일반'
    });
    setDetailModal(false);
    setModifyModal(true);
  };

  const closeModifyModal = () => {
    setModifyModal(false);
    setModifyForm({ id: null, title: '', content: '', category: '일반' });
  };

  const handleModifyOnChange = (e) => {
    const { name, value } = e.target;
    setModifyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleModifyOnClick = async () => {
    if (!modifyForm.title.trim() || !modifyForm.content.trim()) {
      return alert('제목과 내용을 모두 입력해주세요.');
    }

    setEditLoading(true);
    try {
      const modifyData = {
        id : modifyForm.id,
        title: modifyForm.title,
        content: modifyForm.content,
        category: modifyForm.category,
        createdAt: new Date().toISOString()
      };

      // await reqModifyInquiryCrew(modifyData);
      modifyInquiryList(modifyData);
      console.log(modifyData);
      

      closeModifyModal();
      alert('문의가 수정되었습니다.');
    } catch (error) {
      console.error('수정 실패:', error);
      alert('문의 수정에 실패했습니다.');
    } finally {
      setEditLoading(false);
    }
  };

  // delete 관련 상태 & 코드 
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (inquiry) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    setDeleteLoading(true);
    try {
      // TODO: 실제 삭제 API 호출
      // await reqDeleteInquiryCrew(inquiry.crewInquiryId);

      deleteInquiryList(inquiry.crewInquiryId);
      setDetailModal(false);
      alert('문의가 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('문의 삭제에 실패했습니다.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const [detailModal, setDetailModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const openDetailModal = (inquiry) => {
    if (inquiry.userId === currentUserId) {
      setSelectedInquiry(inquiry);
      setDetailModal(true);
    }
  };

  const closeDetailModal = () => {
    setDetailModal(false);
    setSelectedInquiry(null);
  };

  const getMaskedData = (inq, field) => {
    const isOwner = inq.userId === currentUserId;
    
    if (field === 'user') return isOwner ? (inq.userNickname || user?.nickname || '본인') : '***';
    if (field === 'title') return isOwner ? inq.title : '비공개 문의';
    return inq[field];
  };

  const formatDate = (dateString) => 
    dateString?.includes('T') ? dateString.split('T')[0] : dateString || '';

  const modalProps = { ariaHideApp: true };

  return (
    <>
      <div css={s.headerSection}>
        <div>
          <button onClick={openRegisterModal}>글쓰기</button>
        </div>
      </div>
      
      <div css={s.container}>
        {listLoading ? (
          <div style={{textAlign: 'center', padding: '20px'}}>로딩 중...</div>
        ) : (
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
              {inquiries.length > 0 ? inquiries.map(inq => (
                <tr
                  key={inq.crewInquiryId}
                  css={s.tableRow(inq.userId === currentUserId)}
                  onClick={() => openDetailModal(inq)}
                >
                  <td>{inq.crewInquiryId}</td>
                  <td>{getMaskedData(inq, 'user')}</td>
                  <td>{getMaskedData(inq, 'title')}</td>
                  <td>{inq.status}</td>
                  <td>{formatDate(inq.createdAt || inq.date)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                    등록된 문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ReactModal 
        {...modalProps} 
        style={s.modalStyles} 
        isOpen={registerModal}
        onRequestClose={closeRegisterModal}
      >
        <div css={s.modalContainer}>
          <header css={s.modalHeader}>
            <h2>문의 작성</h2>
            <button css={s.closeButton} onClick={closeRegisterModal}>
              <FiX />
            </button>
          </header>
          
          <main css={s.modalContent}>
            <div css={s.formGroup}>
              <label>카테고리</label>
              <select 
                name="category" 
                value={registerForm.category} 
                onChange={handleRegisterChange} 
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
                value={registerForm.title}
                onChange={handleRegisterChange}
                css={s.textInput}
              />
            </div>

            <div css={s.formGroup}>
              <label>내용</label>
              <textarea
                name="content" 
                placeholder="문의 내용을 자세히 입력해주세요"
                value={registerForm.content} 
                rows={8}
                onChange={handleRegisterChange}
                css={s.textareaInput}
              />
            </div>
          </main>

          <footer css={s.modalFooter}>
            <button 
              css={s.submitButton} 
              onClick={handleRegisterSubmit}
              disabled={registerLoading}
            >
              {registerLoading ? '등록 중...' : '등록'}
            </button>
          </footer>
        </div>
      </ReactModal>

      <ReactModal 
        {...modalProps} 
        style={s.modalStyles} 
        isOpen={modifyModal}
        onRequestClose={closeModifyModal}
      >
        <div css={s.modalContainer}>
          <header css={s.modalHeader}>
            <h2>문의 수정</h2>
            <button css={s.closeButton} onClick={closeModifyModal}>
              <FiX />
            </button>
          </header>
          
          <main css={s.modalContent}>
            <div css={s.formGroup}>
              <label>카테고리</label>
              <select 
                name="category" 
                value={modifyForm.category} 
                onChange={handleModifyOnChange} 
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
                value={modifyForm.title}
                onChange={handleModifyOnChange}
                css={s.textInput}
              />
            </div>

            <div css={s.formGroup}>
              <label>내용</label>
              <textarea
                name="content" 
                placeholder="문의 내용을 자세히 입력해주세요"
                value={modifyForm.content} 
                rows={8}
                onChange={handleModifyOnChange}
                css={s.textareaInput}
              />
            </div>
          </main>

          <footer css={s.modalFooter}>
            <button 
              css={s.submitButton} 
              onClick={handleModifyOnClick}
              disabled={editLoading}
            >
              {editLoading ? '수정 중...' : '수정'}
            </button>
          </footer>
        </div>
      </ReactModal>

      <ReactModal 
        {...modalProps} 
        style={s.detailModalStyles} 
        isOpen={detailModal}
        onRequestClose={closeDetailModal}
      >
        {selectedInquiry && (
          <div css={s.modalContainer}>
            <header css={s.modalHeader}>
              <h2>문의 상세보기</h2>
              <button css={s.closeButton} onClick={closeDetailModal}>
                <FiX />
              </button>
            </header>
            
            <main css={s.modalContent}>
              <div css={s.detailSection}>
                {[
                  ['카테고리', selectedInquiry.category],
                  ['작성자', selectedInquiry.userNickname || user?.nickname || '본인'],
                  ['작성일', formatDate(selectedInquiry.createdAt || selectedInquiry.date)],
                  ['상태', <span css={s.statusBadge(selectedInquiry.status)}>{selectedInquiry.status}</span>]
                ].map(([label, value], idx) => (
                  <div key={idx} css={s.detailRow}>
                    <span css={s.label}>{label}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              
              <div css={s.detailSection}>
                <h3>제목</h3>
                <p>{selectedInquiry.title}</p>
              </div>
              
              <div css={s.detailSection}>
                <h3>내용</h3>
                <div css={s.contentArea}>{selectedInquiry.content}</div>
              </div>
            </main>

            {selectedInquiry.status === '대기' && (
              <footer css={s.modalFooter}>
                <button css={s.modifyButton} onClick={() => openModifyModal(selectedInquiry)}>
                  수정
                </button>
                <button 
                  css={s.deleteButton} 
                  onClick={() => handleDelete(selectedInquiry)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? '삭제 중...' : '삭제'}
                </button>
              </footer>
            )}
          </div>
        )}
      </ReactModal>
    </>
  );
}

export default CrewInquiry;