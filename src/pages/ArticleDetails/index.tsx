import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbHeartPlus, TbHeartMinus, TbArchive } from 'react-icons/tb'
import { FaRegComment, FaRegCommentDots, FaRegEdit } from 'react-icons/fa'
import { RootState } from '../../store'
import {
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
  deleteArticleRequest,
  setArticleDetailsRequest,
} from '../../store/slices/article.slice'
import { IArticleDetailsProps } from '../../models'
import { Comments } from '../../components/ui'
import { currentUser, isAuthenticated } from '../../services'
import { formatDate, formatFullDate } from '../../utils'
import styles from '../../styles/Global.module.css'
import { countComments } from '../../store/selectors'

const ArticleDetails: React.FC<IArticleDetailsProps> = ({
  status,
  isLoading,
  isDeleted,
  isAuthenticated,
  user,
  article,
  countComments,
  setArticleDetailsRequest,
  deleteArticleRequest,
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
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

  const handleFavorite = () => {
    if (!isAuthenticated) {
      console.warn('not authenticated')
      navigate('/login')
    }
    if (!article) {
      return
    }

    if (!article.favorited) {
      createArticleFavoriteRequest(article.slug)
    } else {
      deleteArticleFavoriteRequest(article.slug)
    }
  }

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
      <div className={styles.layout}>
        {isAuthenticated && (
          <aside className={`${styles.aside} ${styles.actions}`}>
            <button
              className={`${styles.action} ${styles.btnFavorite}`}
              type='button'
              onClick={handleFavorite}
              disabled={status?.favorite === 'loading'}
              title='Favorite'
            >
              <span className={styles.icon}>{article.favorited ? <TbHeartMinus /> : <TbHeartPlus />}</span>
            </button>
            <a className={`${styles.action} ${styles.comment}`} href='#comments' title='Comments'>
              <span className={styles.icon}>{countComments ? <FaRegCommentDots /> : <FaRegComment />}</span>
            </a>
            {article.author.username === user?.username && (
              <>
                <Link className={`${styles.action} ${styles.edit}`} to={`/${slug}/edit`} title='Edit'>
                  <span className={styles.icon}>{<FaRegEdit />}</span>
                </Link>
                <button
                  className={`${styles.action} ${styles.delete}`}
                  type='button'
                  onClick={handleDeleteArticle}
                  title='Delete'
                >
                  <span className={styles.icon}>{<TbArchive />}</span>
                </button>
              </>
            )}
          </aside>
        )}
        <div className={styles.articleDetail}>
          <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.author}>
                <Link className={styles.link} to={author === user?.username ? '/me' : `/${author}`}>
                  <img className={styles.avatar} src={article.author.image} alt={article.author.username} />
                </Link>
                <div className={styles.info}>
                  <Link className={styles.link} to={author === user?.username ? '/me' : `/${author}`}>
                    <strong className={styles.name}>{article.author.username}</strong>
                  </Link>
                  <time className={styles.date} title={formatFullDate(new Date(article.createdAt))}>
                    {formatDate(new Date(article.createdAt))}
                  </time>
                </div>
              </div>
              <div className={styles.favorites}>
                <span className={`${styles.favorite} ${article.favorited ? styles.remove : styles.add}`}>
                  <span className={styles.count}>{article.favoritesCount}</span>
                  <span className={styles.icon}>{'❤️‍🔥'}</span>
                </span>
              </div>
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.tagList}>
                {article.tagList?.map((tag: string) => (
                  <Link className={styles.tag} key={tag} to={`/tags/${tag}`}>
                    #{tag}
                  </Link>
                ))}
              </div>
              <p style={{ whiteSpace: 'pre-line' }}>{article.body.replace(/(\\n)/g, '\n')}</p>
            </div>
          </div>
          <hr className={styles.separator} />
          <div id='comments'>
            <Comments />
          </div>
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
    status: state.article.status,
    user: currentUser(),
    article: state.article.articleDetails,
    countComments: countComments(state),
    errors: state.article.errors,
  }),
  {
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
    setArticleDetailsRequest,
    deleteArticleRequest,
  }
)(ArticleDetails)
