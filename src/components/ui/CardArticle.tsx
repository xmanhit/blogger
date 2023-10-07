import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { PiSpinnerBold } from 'react-icons/pi'
import { FcDislike, FcLike } from 'react-icons/fc'
import { RootState } from '../../store'
import { IArticleProps } from '../../models'
import { timeSince } from '../../utils'
import {
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
  setArticleDetails,
} from '../../store/slices/article.slice'
import styles from '../../styles/CardArticle.module.css'

const CardArticle: React.FC<IArticleProps> = ({
  user,
  isAuthenticated,
  article,
  setArticleDetails,
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
}) => {
  const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author, status } = article
  const navigate = useNavigate()

  const handleFavorite = () => {
    if (!isAuthenticated) {
      console.warn('not authenticated')
      return navigate('/login', { replace: true })
    }

    if (!favorited) {
      createArticleFavoriteRequest(slug)
    } else {
      deleteArticleFavoriteRequest(slug)
    }
  }

  const handleSetArticleDetails = () => {
    setArticleDetails(article)
  }

  return (
    <article className={styles.cardArticle}>
      <div className={styles.author}>
        <Link className={styles.link} to={user?.username === author.username ? '/me' : `/${author.username}`}>
          <img className={styles.avatar} src={author.image} alt={author.username} />
          <div className={styles.wrapper}>
            <strong className={styles.name}>{author.username}</strong>
            <time className={styles.time}>{timeSince(new Date(createdAt))}</time>
          </div>
        </Link>
        <button
          className={`${styles.favorite} ${favorited ? styles.remove : styles.add}`}
          onClick={handleFavorite}
          disabled={status?.favorite === 'loading'}
        >
          <span className={styles.count}>{favoritesCount}</span>
          {status?.favorite === 'loading' ? (
            <span className={styles.icon}>
              <PiSpinnerBold className={styles.spinner} />
            </span>
          ) : (
            <span className={styles.icon}>{favorited ? <FcDislike /> : <FcLike />}</span>
          )}
        </button>
      </div>
      <div className={styles.post}>
        <Link onClick={handleSetArticleDetails} to={`/${author.username}/${slug}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.desc}>{description}</p>

        <div className={styles.tagList}>
          {tagList?.map((tag: string) => (
            <Link className={styles.tag} key={tag} to={`/tags/${tag}`}>
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.currentUser,
  }),
  {
    setArticleDetails,
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
  }
)(CardArticle)
