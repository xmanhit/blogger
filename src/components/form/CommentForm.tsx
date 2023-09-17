import { Formik, Field, Form, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../store'

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('Required')
    .min(3, 'Must be at least 3 characters')
    .max(500, 'Must be 500 characters or less'),
})

const CommentForm: React.FC = ({
  isAuthenticated,
  isActionLoading,
  errors,
}: any) => {
  return (
    <div>
      <h1>Comment Form</h1>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={CommentSchema}
        onSubmit={(values) => {
          console.log(values, isAuthenticated, isActionLoading, errors)
        }}
      >
        <Form>
          <label htmlFor='comment'>Comment</label>
          <Field name='comment' as='textarea' />
          <ErrorMessage name='comment' component='div' />
          <button type='submit' disabled={isActionLoading}>
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
    isActionLoading: state.auth.isActionLoading,
    errors: state.comment.errors,
  }),
  {}
)(CommentForm)
