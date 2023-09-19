import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { setArticleDetailsRequest } from '../../store/slices/article.slice'
import { IArticleDetailsProps } from '../../models'
import { Link } from 'react-router-dom'
import Comments from '../../components/ui/Comments'

const ArticleDetails: React.FC<IArticleDetailsProps> = ({
  isLoading,
  isActionLoading,
  isAuthenticated,
  article,
  setArticleDetailsRequest,
  errors,
}) => {
  const { slug } = useParams()
  useEffect(() => {
    if (slug) {
      setArticleDetailsRequest(slug)
    }
  }, [slug])

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(article)

  return (
    <div>
      <div>
        <Link to={`../${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></Link>    
        <Link to={`../${article.author.username}`}><strong>{article.author.username}</strong></Link>
        <time>{article.createdAt}</time>
      </div>
      <div>
        <p>{article.favoritesCount}</p>
        <h1>{article.title}</h1>
        <span>{article.tagList.join(', ')}</span>
        <p style={{ whiteSpace: 'pre-line' }}>
          {article.body.replace(/(\\n)/g, '\n')}
        </p>
      </div>
      <div>
        <Comments />
      </div>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.article.isLoading,
    isActionLoading: state.article.isActionLoading,
    isAuthenticated: state.auth.isAuthenticated,
    article: state.article.article,
    errors: state.article.errors,
  }),
  {
    setArticleDetailsRequest,
  }
)(ArticleDetails)
