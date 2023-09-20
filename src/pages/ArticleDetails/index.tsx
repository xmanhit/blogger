import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { deleteArticleRequest, setArticleDetailsRequest } from '../../store/slices/article.slice'
import { IArticleDetailsProps } from '../../models'
import Comments from '../../components/ui/Comments'
import { currentUser, isAuthenticated } from '../../services'

const ArticleDetails: React.FC<IArticleDetailsProps> = ({
  isLoading,
  isDeleted,
  isAuthenticated,
  user,
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
  }, [])

  useEffect(() => {
    if (article?.author) {
      if (article?.author?.username !== author) {
        console.warn(
          'Sửa tên author trên link làm cái gì. Chẳng có nghĩa lý gì đâu :P',
          'Nếu bạn là author bài viết này thì không cho bạn sửa xóa ở đây luôn nhé!'
        )
      }
    }
  }, [article?.author.username])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleDeleteArticle = () => {
    deleteArticleRequest(slug)
    if (isDeleted) {
      navigate('/')
    }
  }

  return (
    article && (
      <div>
        {isAuthenticated && author === user?.username && article.author.username === user?.username && (
          <>
            <Link to={`/${slug}/edit`}>Edit</Link> - <button onClick={handleDeleteArticle}>delete</button>
          </>
        )}
        <div>
          <Link to={author === user?.username ? '/me' : `/${author}`}>
            <img src={article.author.image} alt={article.author.username} />
            <strong>{article.author.username}</strong>
          </Link>
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
          <p style={{ whiteSpace: 'pre-line' }}>{article.body.replace(/(\\n)/g, '\n')}</p>
        </div>
        <div>
          <Comments />
        </div>
      </div>
    )
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    isLoading: state.article.status.articleDetails === 'loading',
    isDeleted: state.article.status.deleteArticle === 'idle',
    user: currentUser(),
    article: state.article.articleDetails,
    errors: state.article.errors,
  }),
  {
    setArticleDetailsRequest,
    deleteArticleRequest,
  }
)(ArticleDetails)
