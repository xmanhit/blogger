import { Formik, Field, Form, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../store'
import { createArticleCommentRequest } from '../../store/slices/comment.slice'
import { useParams } from 'react-router-dom'

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('Required')
    .min(3, 'Must be at least 3 characters')
    .max(500, 'Must be 500 characters or less'),
})

const CommentForm: React.FC = ({
  isAuthenticated,
  createArticleCommentRequest,
  status,
  errors,
}: any) => {
  const { slug } = useParams()
  return (
    <div>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={CommentSchema}
        onSubmit={({ comment }) => {
          console.log(slug, comment, isAuthenticated, errors)
          createArticleCommentRequest({ slug, comment: { body: comment } })
        }}
      >
        <Form>
          <label htmlFor='comment'>Comment</label>
          <Field name='comment' as='textarea' />
          <ErrorMessage name='comment' component='div' />
          <button type='submit' disabled={status === 'loading'}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    status: state.comment.status.createComment,
    errors: state.comment.errors,
  }),
  { createArticleCommentRequest }
)(CommentForm)
