import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import SimpleSelect from '../../components/SimpleSelect';
import { useApiSelect } from '../../components/hooks/useSelect';

function Feed(props) {
  const { options: gunguOptions, selectedValue: selectedGunguId, setSelectedValue: setSelectedGunguId, loading } = useApiSelect('gunguId', 'gunguName');
  const [ quillValue, setQuillValue ] = useState("");

  const toolbarOptions = [
    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }],
    ['bold', 'italic', 'underline', 'strike'],
  ];

  const handleQuillOnChange = (value) => {
    console.log(value);
    setQuillValue(value);
  }

  return (
    <div>
      <SimpleSelect
          label="군/구"
          value={selectedGunguId}
          onChange={(e) => setSelectedGunguId(e.target.value)}
          options={gunguOptions}
          loading={loading}
        />
      <input type='text'/>
      <ReactQuill
        style={{
          height: "40rem"
        }} 
        modules={{
          toolbar: toolbarOptions
        }}
        value={quillValue}
        onChange={handleQuillOnChange}
      />
    </div>
  );
}

export default Feed;