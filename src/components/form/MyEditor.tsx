import { useState } from 'react'
import { ContentState, Editor, EditorState } from 'draft-js'
// import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'draft-js/dist/Draft.css'

const MyEditor: React.FC<any> = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { value } = field
  let initialState = EditorState.createEmpty()
  if (value) {
    initialState = htmlToDraftBlocks(value)
  }
  // console.log(form)
  // console.log(props)
  const [editorState, setEditorState] = useState(initialState)

  // console.log(convertToRaw(editorState.getCurrentContent()))

  return (
    <Editor
      {...props}
      editorState={editorState}
      onChange={setEditorState}
      placeholder='Write your post contnet here...'
    />
  )
}

const htmlToDraftBlocks = (html: string) => {
  const blocksFromHtml = htmlToDraft(html)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorState = EditorState.createWithContent(contentState)
  return editorState
}

export default MyEditor
