import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

function FeedReg(props) {
    const navigate = useNavigate();
    const quillRef = useRef();
    const [quillValue, setQuillValue] = useState("");
     
    const imageHandler = async () => {
    if (!quillRef.current) return;

    const quillInstance = quillRef.current.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      const formData = new FormData();
      formData.append("imageConfigName", "crewFreeBoard");
      formData.append("file", file);

      try {
        const response = await api.post("/api/images", formData, {headers: {"Content-Type": "multipart/form-data"}});
        console.log(response.data.body)

        const range = quillInstance.getSelection(true); 
        quillInstance.insertEmbed(range.index, 'image', response.data.body); 
        quillInstance.setSelection(range.index + 1); 
      } catch (error) {
        console.log(error);
      }
    };
  };

    const toolbarOptions = [
      [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["blockquote", "link", "image"],
    ];

    const handleQuillOnChange = (value) => {
      setQuillValue(value);
    }

    console.log(quillValue)
    

    return (
        <div>
            <ReactQuill 
                    style={{
                        height: "45rem"
                    }} 
                    modules={{
                        toolbar: {
                          container: toolbarOptions,
                          handlers: {
                            image: imageHandler
                          }
                        }
                    }}
                    value={quillValue}
                    onChange={handleQuillOnChange}
                    ref={quillRef}
                />
        </div>
    );
}

export default FeedReg;