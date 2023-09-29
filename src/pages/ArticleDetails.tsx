import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbHeartPlus, TbHeartMinus, TbArchive } from 'react-icons/tb'
import { FaRegComment, FaRegCommentDots, FaRegEdit } from 'react-icons/fa'
import { PiSpinnerBold } from 'react-icons/pi'
import { FcLike } from 'react-icons/fc'
import { RootState } from '../store'
import {
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
  deleteArticleRequest,
  setArticleDetailsRequest,
} from '../store/slices/article.slice'
import { IArticleDetailsProps } from '../models'
import { Comments } from '../components/ui'
import { currentUser, isAuthenticated } from '../services'
import { formatDate, formatFullDate } from '../utils'
import styles from '../styles/Global.module.css'
import { countComments } from '../store/selectors'
import NotFound from './NotFound'
import ArticleDetailsLoading from '../components/ui/ArticleDetailsLoading'

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
    document.title = `Blogger | ${article?.title}`
    if (slug && article === null) {
      setArticleDetailsRequest(slug)
    }
  }, [])

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
    return <ArticleDetailsLoading />
  }

  if (errors?.status === 404) {
    return <NotFound />
  }

  if (errors?.status === 404) {
    return <NotFound />
  }

  const handleDeleteArticle = () => {
    deleteArticleRequest(slug)
    if (isDeleted) {
      navigate('/', { replace: true })
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
              disabled={article.status?.favorite === 'loading'}
              title='Favorite'
            >
              <span className={styles.icon}>
                {article.status?.favorite === 'loading' ? (
                  <PiSpinnerBold className={styles.spinner} />
                ) : article.favorited ? (
                  <TbHeartMinus className={styles.icon} />
                ) : (
                  <TbHeartPlus className={styles.icon} />
                )}
              </span>
            </button>

            <Link className={`${styles.action} ${styles.comment}`} to='#comments' title='Comments'>
              <span className={styles.icon}>
                {countComments ? (
                  <FaRegCommentDots className={styles.icon} />
                ) : (
                  <FaRegComment className={styles.icon} />
                )}
              </span>
            </Link>
            {article.author.username === user?.username && (
              <>
                <Link className={`${styles.action} ${styles.edit}`} to={`/${slug}/edit`} title='Edit'>
                  <span className={styles.icon}>{<FaRegEdit className={styles.icon} />}</span>
                </Link>
                <button
                  className={`${styles.action} ${styles.delete}`}
                  type='button'
                  onClick={handleDeleteArticle}
                  title='Delete'
                >
                  <span className={styles.icon}>
                    {' '}
                    {status?.favorite === 'loading' ? (
                      <PiSpinnerBold className={styles.spinner} />
                    ) : (
                      <TbArchive className={styles.icon} />
                    )}
                  </span>
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
                  <span className={styles.icon}>
                    <FcLike />
                  </span>
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
              <p style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{article.body.replace(/(\\n)/g, '\n')}</p>
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
