import { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import 'draft-js/dist/Draft.css'

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  return (
    <Editor
      defaultEditorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
      toolbarClassName='toolbar-class'
    />
  )
}

export default MyEditor
