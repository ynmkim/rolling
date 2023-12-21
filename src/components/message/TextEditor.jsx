import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const editorConfiguration = {
  toolbar: ['bold', 'underline', 'italic', '|', 'alignment', '|'],
};

function TextEditor({ id, name, value, setValues }) {
  const handleContentChange = (e, editor) => {
    setValues((preValues) => ({ ...preValues, [name]: editor.getData() }));
  };
  return (
    <div id={id} className="ck-editor__editable_inline ">
      <CKEditor editor={Editor} config={editorConfiguration} data={value} onChange={handleContentChange} />
    </div>
  );
}

export default TextEditor;
