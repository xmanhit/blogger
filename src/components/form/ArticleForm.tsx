import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../../store'
import {
  createArticleRequest,
  resetStatusFormArticle,
  setArticleDetailsRequest,
  updateArticleRequest,
} from '../../store/slices/article.slice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { IArticleFormProps } from '../../models'
import { isLoadingFormArticle, isSuccessedFormArticle } from '../../store/selectors'
import TagInput from './TagInput'
import { PiSpinnerBold } from 'react-icons/pi'
import { textAreaAdjust } from '../../utils'
import styles from '../../styles/ArticleForm.module.css'
// import MyEditor from './MyEditor'

const SignUpSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Your Title is Required'),
  description: Yup.string()
    .min(3, 'Description must be at least 3 characters')
    .max(150, 'Description must be at most 150 characters')
    .required('Your Description Required'),
  body: Yup.string().min(3, 'Body must be at least 3 characters').required('Your Body is Required'),
  tagList: Yup.array().of(Yup.string().max(50, 'Tag List must be at most 50')).max(4, 'Tag List must be at most 4'),
})

const ArticleForm: React.FC<IArticleFormProps> = ({
  isLoading,
  isLoadingFormArticle,
  isSuccessedFormArticle,
  article,
  resetStatusFormArticle,
  setArticleDetailsRequest,
  createArticleRequest,
  updateArticleRequest,
  // errors,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams<string>()
  const lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

  useEffect(() => {
    if (isSuccessedFormArticle) {
      resetStatusFormArticle()
      navigate(`/${article?.author.username}/${article?.slug}`, { replace: true })
    }
  }, [isSuccessedFormArticle])

  useEffect(() => {
    if (!article) {
      slug && setArticleDetailsRequest(slug)
    }
  }, [article])

  if (isLoading) {
    return (
      <form className={isLoading && styles.loading}>
        <div className={styles.formWrapper}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <textarea className={`${styles.input} ${styles.title}`} name='title' rows={1} />
            </div>

            <div className={styles.field}>
              <input className={`${styles.input} ${styles.tags}`} name='tagList' />
            </div>

            <div className={styles.field}>
              <textarea className={`${styles.input} ${styles.desc}`} name='description' rows={4} />
            </div>
          </div>

          <div className={styles.field}>
            <textarea className={`${styles.input} ${styles.body}`} name='body' rows={8} />
          </div>
        </div>
        <button className={styles.submit} disabled={true} type='submit'>
          Publish
        </button>
      </form>
    )
  }

  const handleKeyPressTitle = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      return false
    }
  }

  return (
    <Formik
      initialValues={{
        title: (slug && article?.title) || '',
        description: (slug && article?.description) || '',
        tagList: (slug && article?.tagList) || [],
        body: (slug && article?.body) || '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={({ title, description, body, tagList }) => {
        if (lastPath === 'new') {
          createArticleRequest({
            article: { title, description, body, tagList },
          })
        }
        if (lastPath === 'edit' && slug) {
          updateArticleRequest({
            slug,
            article: { title, description, body, tagList },
          })
        }
      }}
    >
      <Form className={styles.formArticle}>
        <div className={styles.formWrapper}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <Field
                className={`${styles.input} ${styles.title}`}
                name='title'
                as='textarea'
                rows={1}
                onKeyUp={textAreaAdjust}
                onKeyPress={handleKeyPressTitle}
                placeholder='New post title here'
              />
              <ErrorMessage className={styles.error} name='title' component='div' />
            </div>

            <div className={styles.field}>
              <Field
                className={`${styles.input} ${styles.tags}`}
                name='tagList'
                component={TagInput}
                placeholder='Add up to 4 tags...'
              />
            </div>

            <div className={styles.field}>
              <Field
                className={`${styles.input} ${styles.desc}`}
                name='description'
                as='textarea'
                rows={2}
                onKeyUp={textAreaAdjust}
                placeholder='Write your post description here...'
              />
              <ErrorMessage className={styles.error} name='description' component='div' />
            </div>
          </div>

          <div className={styles.field}>
            <Field
              className={`${styles.input} ${styles.body}`}
              name='body'
              as='textarea'
              rows={8}
              onKeyUp={textAreaAdjust}
              // component={MyEditor}
              placeholder='Write your post contnet here...'
            />
            <ErrorMessage className={styles.error} name='body' component='div' />
          </div>
        </div>
        <button className={styles.submit} disabled={isLoadingFormArticle} type='submit'>
          Publish {isLoadingFormArticle && <PiSpinnerBold className={styles.spinner} />}
        </button>
      </Form>
    </Formik>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.article.status.articleDetails === 'loading',
    isLoadingFormArticle: isLoadingFormArticle(state),
    isSuccessedFormArticle: isSuccessedFormArticle(state),
    status: state.article.status,
    article: state.article.articleDetails,
    errors: state.auth.errors,
  }),
  { resetStatusFormArticle, setArticleDetailsRequest, createArticleRequest, updateArticleRequest }
)(ArticleForm)
