import { LoaderFunction, redirect } from 'react-router-dom'
import ArticleForm from '../../components/form/ArticleForm'
import { getItem } from '../../services'

export const formArticleLoader: LoaderFunction = () => {
  const token = getItem('token')
  if (!token) return redirect('/')
  return null
}

const FormArticle = () => {
  return <ArticleForm />
}

export default FormArticle
