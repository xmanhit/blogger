import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { PiSpinnerBold } from 'react-icons/pi'
import { RootState } from '../../store'
import { createArticleCommentRequest } from '../../store/slices/comment.slice'
import { currentUser } from '../../services'
import { ICommentFormProps } from '../../models'
import { textAreaAdjust } from '../../utils'
import styles from '../../styles/Comments.module.css'

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('Your comment is required.')
    .min(3, 'Comment must be at least 3 characters')
    .max(500, 'Comment must be 500 characters or less'),
})

const CommentForm: React.FC<ICommentFormProps> = ({ user, createArticleCommentRequest, status }) => {
  const { slug } = useParams()
  const [displayButton, setDisplayButton] = useState(false)
  return (
    <div className={styles.commentForm}>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={CommentSchema}
        onSubmit={({ comment }, { resetForm }) => {
          slug && createArticleCommentRequest({ slug, comment: { body: comment } })
          resetForm()
        }}
      >
        <Form className={styles.form}>
          <div className={styles.wrapper}>
            <img className={styles.avatar} src={user?.image} alt='Author' />
            <div className={styles.formWrapper}>
              <div className={styles.formGroup}>
                <Field
                  className={styles.formControl}
                  name='comment'
                  as='textarea'
                  placeholder='Write your comment here...'
                  rows={5}
                  onKeyUp={textAreaAdjust}
                  onFocus={() => {
                    setDisplayButton(true)
                  }}
                />
                <ErrorMessage className={styles.error} name='comment' component='div' />
              </div>
              {displayButton && (
                <button className={styles.submit} type='submit' disabled={status === 'loading'}>
                  Submit {status === 'loading' && <PiSpinnerBold className={styles.spinner} />}
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    status: state.comment.status.createComment,
    errors: state.comment.errors,
  }),
  { createArticleCommentRequest }
)(CommentForm)
