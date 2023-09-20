import { LoaderFunction, redirect } from 'react-router-dom'
import ArticleForm from '../../components/form/ArticleForm'
import { isAuthenticated } from '../../services'

export const formArticleLoader: LoaderFunction = () => {
  if (!isAuthenticated()) {
    return redirect('/login')
  }
  return null
}

const FormArticle: React.FC = () => {
  return <ArticleForm />
}

export default FormArticle
