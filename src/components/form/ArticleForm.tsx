import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../../store'
import { createArticleRequest, setArticleDetailsRequest, updateArticleRequest } from '../../store/slices/article.slice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { IArticleFormProps } from '../../models'

const SignUpSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Your Title is Too Short!').max(50, 'Your Title is Too Long!').required('Required'),
  description: Yup.string()
    .min(3, 'Your Description is Too Short!')
    .max(50, 'Your Description is Too Long!')
    .required('Required'),
  body: Yup.string().min(3, 'Your Body is Too Short!').required('Required'),
  tags: Yup.array().max(4, 'Your Tag is Too Long!'),
})

const ArticleForm: React.FC<IArticleFormProps> = ({
  isLoading,
  isActionLoading,
  isActionSuccess,
  status,
  article,
  setArticleDetailsRequest,
  createArticleRequest,
  updateArticleRequest,
  errors,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams<string>()
  const lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

  // useEffect(() => {
  //   if (isActionSuccess) {
  //     navigate(-1)
  //   }
  // }, [isActionSuccess])

  useEffect(() => {
    if (!article) {
      slug && setArticleDetailsRequest(slug)
    }
  }, [article])

  if (isLoading) {
    return <div>Form Article Loading...</div>
  }

  return (
    // Cứ từ từ tạo state để lưu data của article trước khi nhấn anywhere button vào được đây :D
    <Formik
      initialValues={{
        title: article?.title || '',
        description: article?.description || '',
        tagList: article?.tagList || [''],
        body: article?.body || '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={({ title, description, body, tagList }, { resetForm }) => {
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
        resetForm()
      }}
    >
      <Form>
        <div>
          <Field name='title' type='text' />
          {/* {status === 'failed' && errors?.username && (
            <div>{`Username ${errors.username}`}</div>
          )} */}
          <ErrorMessage name='title' component='div' />
        </div>
        <div>
          <Field name='description' type='text' />
          <ErrorMessage name='description' component='div' />
        </div>
        <div>
          <Field name='tagList' type='text' placeholder='Add up to 4 tags' />
          <ErrorMessage name='tagList' component='div' />
        </div>
        <div>
          <Field name='body' as='textarea' />
          <ErrorMessage name='body' component='div' />
        </div>
        <button disabled={isActionLoading} type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.article.status.articleDetails === 'loading',
    isActionLoading:
      state.article.status.createArticle === 'loading' || state.article.status.updateArticle === 'loading',
    isActionSuccess: state.article.status.createArticle === 'idle' && state.article.status.updateArticle === 'idle',
    status: state.article.status,
    article: state.article.articleDetails,
    errors: state.auth.errors,
  }),
  { setArticleDetailsRequest, createArticleRequest, updateArticleRequest }
)(ArticleForm)
