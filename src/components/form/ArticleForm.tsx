import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../../store'
import {
  createArticleRequest,
  updateArticleRequest,
} from '../../store/slices/article.slice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const SignUpSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  body: Yup.string().min(3, 'Too Short!').required('Required'),
  tags: Yup.string(),
})

const ArticleForm: React.FC<any> = ({
  isActionLoading,
  isActionSuccess,
  status,
  article,
  createArticleRequest,
  updateArticleRequest,
  errors,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const lastPath = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  console.log(status, isActionSuccess)

  return (
    <Formik
      initialValues={{
        title: 'New post title',
        description: 'New post description',
        tags: 'new tag',
        body: 'New post body',
      }}
      validationSchema={SignUpSchema}
      onSubmit={({ title, description, body, tags }) => {
        if (lastPath === 'new') {
          createArticleRequest({
            article: { title, description, body, tagList: [tags] },
          })
        }
        if (lastPath === 'edit' && slug) {
          updateArticleRequest({
            slug,
            article: { title, description, body, tagList: [tags] },
          })
        }
        console.log(isActionSuccess)

        if (isActionSuccess) {
          console.log('success')
          navigate(-1)
        }
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
          <Field name='tags' type='text' />
          <ErrorMessage name='tags' component='div' />
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
    isActionLoading:
      state.article.status.createArticle === 'loading' ||
      state.article.status.updateArticle === 'loading',
    isActionSuccess:
      state.article.status.createArticle === 'idle' &&
      state.article.status.updateArticle === 'idle',
    status: state.article.status,
    article: state.article.articleDetails,
    errors: state.auth.errors,
  }),
  { createArticleRequest, updateArticleRequest }
)(ArticleForm)
