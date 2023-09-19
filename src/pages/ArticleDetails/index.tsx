import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  deleteArticleRequest,
  setArticleDetailsRequest,
} from '../../store/slices/article.slice'
import { IArticleDetailsProps } from '../../models'
import { Link } from 'react-router-dom'
import Comments from '../../components/ui/Comments'

const ArticleDetails: React.FC<IArticleDetailsProps> = ({
  isLoading,
  isDeleted,
  isAuthenticated,
  article,
  setArticleDetailsRequest,
  deleteArticleRequest,
  errors,
}) => {
  const navigate = useNavigate()
  const { slug, author } = useParams()
  useEffect(() => {
    if (slug) {
      setArticleDetailsRequest(slug)
    }
    if (article?.author.username !== author) {
      navigate('/')
    }
  }, [slug, author])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleDeleteArticle = () => {
    deleteArticleRequest(slug)
    if (isDeleted) {
      navigate('/')
    }
  }

  console.log(article?.author.username)

  return (
    article && (
      <div>
<<<<<<< HEAD
        <Link to={`../${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></Link>    
        <Link to={`../${article.author.username}`}><strong>{article.author.username}</strong></Link>
        <time>{article.createdAt}</time>
=======
        {isAuthenticated && (
          <>
            <Link to={`/${slug}/edit`}>Edit</Link> -{' '}
            <button onClick={handleDeleteArticle}>delete</button>
          </>
        )}
        <div>
          <img src={article.author.image} alt={article.author.username} />
          <strong>{article.author.username}</strong>
          <time>{article.createdAt}</time>
        </div>
        <div>
          <p>{article.favoritesCount}</p>
          <h1>{article.title}</h1>
          {article.tagList?.map((tag: string) => (
            <Link key={tag} to={`/tags/${tag}`}>
              #{tag}
            </Link>
          ))}
          <p style={{ whiteSpace: 'pre-line' }}>
            {article.body.replace(/(\\n)/g, '\n')}
          </p>
        </div>
        <div>
          <Comments />
        </div>
>>>>>>> 47800eb0d776e95b6631a511f7cffd15c5db48d3
      </div>
    )
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.article.status.articleDetails === 'loading',
    isDeleted: state.article.status.deleteArticle === 'idle',
    isAuthenticated: state.auth.isAuthenticated,
    article: state.article.articleDetails,
    errors: state.article.errors,
  }),
  {
    setArticleDetailsRequest,
    deleteArticleRequest,
  }
)(ArticleDetails)
