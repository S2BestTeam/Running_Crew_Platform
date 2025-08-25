
## 4) 컴포넌트 — `FeedReg.jsx` (완전 주석)

> 핵심 키워드
>
> - **이미지 = 단독 줄**(앞뒤에 `\n`)
> - **커서 = 이미지 아래 줄**(`setSelection(index+2)`)
> - **스크롤 = .ql-container** 기준
> - `requestAnimationFrame`으로 **레이아웃 반영 이후**에 `getBounds()` 호출

```jsx
/** @jsxImportSource @emotion/react */
import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // ✅ 툴바/아이콘 스타일
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { reqRegisterFreeBoard } from "../../../../api/Crew/freeboardApi";
import * as s from "./styles";

function FeedReg({ crewId }) {
  // 라우팅/에디터 ref/입력 상태 -----------------------------------------------
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [quillValue, setQuillValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 커서를 화면 안으로 스크롤하는 유틸 ----------------------------------------
  const scrollCursorIntoView = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    =>  quillRef.current.getEditor() → Quill 인스턴스를 꺼내오기.
    if (!quill) return;

    // selection/레이아웃이 반영된 "다음 프레임"에서 정확한 위치 계산
    requestAnimationFrame(() => {
      const sel = quill.getSelection();
      if (!sel) return;

      const editorRoot = quill.root;             // .ql-editor (내용이 들어가는 div)
      const scrollEl = editorRoot.parentElement; // ✅ .ql-container (스크롤 주체)
      const b = quill.getBounds(sel.index, sel.length || 0); // 커서/선택 영역의 화면 좌표
      const pad = 16;                            // 위아래 여유 공간

      const viewTop = scrollEl.scrollTop;               // 현재 스크롤 최상단 좌표
      const viewBottom = viewTop + scrollEl.clientHeight; // 현재 보이는 영역의 하단 좌표

      // 커서의 하단이 보이는 영역 아래로 나갔으면 ↓로 당겨옴
      if (b.bottom > viewBottom - pad) {
        scrollEl.scrollTop = b.bottom - scrollEl.clientHeight + pad;
      // 커서의 상단이 보이는 영역 위로 나갔으면 ↑로 올림
      } else if (b.top < viewTop + pad) {
        scrollEl.scrollTop = Math.max(0, b.top - pad);
      }
    });

  }, []);

  // 이미지 업로드 핸들러 ------------------------------------------------------
  const imageHandler = () => {
  const quill = quillRef.current?.getEditor?.();
  if (!quill) return;

  // 1) 파일 선택 input 생성/클릭
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    // 2) 서버 업로드(FormData)
    const formData = new FormData();
    formData.append("imageConfigName", "crewFreeBoard");
    formData.append("file", file);

    try {
      const res = await api.post("/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res?.data?.body;       // 서버가 돌려준 이미지 URL
      if (!url) return;

      // 3) 현재 커서 확보 (포커스 강제: 커서 유실 방지)
      quill.focus();
      let range = quill.getSelection(true); // { index, length }

      // 4) 이미지가 "항상 단독 줄"로 들어가도록 앞에 개행 보정
      //    - Quill은 줄 끝에 '\n'이 들어감(줄의 경계 표시)
      //    - 이전 글자가 '\n'이 아니면 현재 위치는 "줄 중간"이므로, 먼저 줄바꿈을 추가
      const prevChar = quill.getText(Math.max(range.index - 1, 0), 1);
      if (prevChar && prevChar !== "\n") {
        quill.insertText(range.index, "\n");      // 줄바꿈 삽입
        range = { index: range.index + 1, length: 0 }; // 커서도 한 칸 밀림
      }

      // 5) 이미지 삽입 (embed는 문서에서 '문자 1개'처럼 취급)
      quill.insertEmbed(range.index, "image", url);

      // 6) 이미지 뒤에 개행 하나(줄바꿈) 삽입 → 이미지 '아래 줄' 생성
      quill.insertText(range.index + 1, "\n");

      // 7) 커서를 "이미지 아래 줄"로 이동
      //    - 이미지 embed(1칸) + 개행(1칸) → 총 2칸 뒤가 "이미지 다음 줄"의 시작점
      quill.setSelection(range.index + 2, 0);
      quill.focus();

      // 8) 방금 이동한 커서가 화면 안에서 보이도록 스크롤(.ql-container 기준)
      scrollCursorIntoView();
    } catch (e) {
      // 업로드 실패 시 처리(알림/토스트 등)
    }
  };

  }, [scrollCursorIntoView]);

    ----- 왜 “단독 줄” 보정이 필요해?

    줄 중간에 이미지를 넣으면, 텍스트와 이미지가 한 줄에 섞여 들어갈 수 있어 보기/편집이 난감.
    블로그 에디터처럼 쓰려면 이미지는 항상 하나의 블록(줄)로 존재하게 만드는 게 UX가 좋아.
    그래서 앞에 \n(줄바꿈) 강제 → 이미지를 넣고 → 뒤에 \n 추가로 “이미지만 있는 줄”을 만들어 줌.
    index + 2 인 이유
    Quill에서 이미지 embed는 1글자 크기로 취급.
    그 뒤에 우리가 \n도 1글자 삽입.
    따라서 이미지 시작 index + 2가 “이미지 바로 다음 줄의 시작점”.

    ----- 요약: 한 줄에 한 기능
    getEditor(): ReactQuill → 진짜 Quill 인스턴스 꺼내오기
    getSelection(): 현재 커서/선택영역 {index, length} 받기
    focus(): 에디터에 포커스 강제 (선택영역이 null로 떨어지는 이슈 방지)
    getText(i, 1): i번째 위치의 한 글자 확인 (이전 글자가 \n인지 체크)
    insertText(i, "\n"): 줄바꿈 추가 (이미지 단독 줄 만들기)
    insertEmbed(i, "image", url): 이미지 삽입
    setSelection(i, 0): 커서를 이동 (이미지 아래 줄로)
    getBounds(i, l): 커서의 화면 좌표 얻기
    requestAnimationFrame: “다음 프레임”에서 실행 → 레이아웃 반영된 뒤 정확한 좌표
    root / parentElement: .ql-editor / .ql-container (스크롤 컨테이너)

    scrollTop / clientHeight: 현재 스크롤 위치 / 보이는 높이
    → 커서가 화면 밖이면 위/아래로 스크롤 보정

  // 내용 비었는지 검사 --------------------------------------------------------
  const isContentEmpty = useCallback((html) => {
    const hasImg = /<img[^>]*src=/.test(html);         // 이미지 존재?
    const text = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    return !hasImg && text.length === 0;
  }, []);

  // 등록 버튼 클릭 -------------------------------------------------------------
  const handleSubmit = useCallback(async () => {
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    if (isContentEmpty(quillValue)) return alert("내용을 입력해 주세요.");

    setSubmitting(true);
    try {
      await reqRegisterFreeBoard({ crewId, title, content: quillValue });
      alert("등록되었습니다.");
      navigate(".."); // 상위(목록)로 이동
    } catch (e) {
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }, [crewId, title, quillValue, isContentEmpty, navigate]);

  // (선택) 본문 HTML 확인용 로그
  console.log(quillValue);

  // 렌더링 --------------------------------------------------------------------
  return (
    <div css={s.wrap}>
      {/* 제목 입력 */}
      <div css={s.titleRow}>
        <input
          css={s.titleInput}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
        />
      </div>

      {/* 에디터 박스: 75vh, 내부 스크롤(.ql-container) */}
      <div css={s.quillBox}>
        <ReactQuill
          ref={quillRef}
          className="quillRoot"               // styles.js에서 레이아웃 제어용
          style={{ height: "100%" }}          // quillBox 높이(75vh)를 꽉 채움
          theme="snow"
          value={quillValue}
          onChange={setQuillValue}
          modules={{
            toolbar: {
              // 툴바 구성(간결 ver.)
              container: [
                [{ header: [false, 1, 2, 3] }],
                ["bold", "italic", "underline", "strike"],
                [{ align: [] }],
                ["blockquote", "link", "image"],
              ],
              handlers: { image: imageHandler }, // 사진 버튼 → 업로드 핸들러
            },
          }}
          placeholder="내용을 입력하세요…"
        />
      </div>

      {/* 등록 버튼 */}
      <div css={s.submitRow}>
        <button css={s.submitBtn} onClick={handleSubmit} disabled={submitting}>
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
}

export default FeedReg;
```

---

## 5) 자주 바꾸는 포인트(팀원용 체크리스트)

- **폼 폭 고정**: `styles.js` → `FORM_W` 숫자만 바꾸면 전체 폼 폭이 바뀜.
- **에디터 높이**: `styles.js` → `quillBox { height: 75vh; }` 수정.
- **이미지 최대 높이**: `styles.js` → `.ql-editor img { max-height: 360px; }` 수정.
- **툴바 구성**: `FeedReg.jsx` → `modules.toolbar.container`에서 버튼 조합 변경.

---

## 6) 트러블슈팅

1. **툴바가 스크롤하며 사라진다**

   - `.ql-editor`가 스크롤하는 구조일 확률 높음.  
     `styles.js`에서 `.ql-container { overflow-y: auto }` 확인하고, `.ql-toolbar { position: sticky; top: 0 }`인지 확인하세요.

2. **이미지 넣어도 커서가 위에 남아 있다**

   - 삽입 후 **반드시** `insertText(index+1, "\n") → setSelection(index+2)` 순서로 아래 줄로 이동시키고,  
     `scrollCursorIntoView()`를 호출해야 합니다.

3. **이미지 사이즈가 이상함**

   - 스타일에서 `.ql-editor img`에 `max-height`, `max-width` 값을 확인하세요.

4. **폭을 반응형으로 바꾸고 싶다**
   - 고정 폭(`FORM_W`) 대신 `clamp(680px, 72vw, 1100px)` 같은 값을 쓰면 반응형으로 전환됩니다.

---

## 7) 한 문장 요약(팀원에게 설명하기)

> “우리는 Quill에서 **이미지를 항상 단독 줄**로 만들고, 삽입 직후 **커서를 이미지 ‘아래 줄’** 로 이동시킨 뒤, **`.ql-container`** 를 스크롤해서 커서가 화면에 보이게 만들었어. 툴바는 `sticky`로 항상 보여. 폼 폭과 에디터/이미지 크기는 `styles.js`에서 상수랑 CSS만 살짝 만지면 돼.”

---

행복한 코딩 🙌  
필요하면 **툴바 버튼 커스터마이징**이나 **동영상 업로드**, **드래그 앤 드롭** 업로드도 이어서 도와줄게!
