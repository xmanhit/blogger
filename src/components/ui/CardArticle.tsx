import { Link, useNavigate } from 'react-router-dom'
import { IArticleProps } from '../../models'
import { timeSince } from '../../utils'
import { connect } from 'react-redux'
import { createArticleFavoriteRequest, deleteArticleFavoriteRequest } from '../../store/slices/article.slice'
import { currentUser, isAuthenticated } from '../../services'
import styles from '../../styles/Global.module.css'
import { PiSpinnerBold } from 'react-icons/pi'

const CardArticle: React.FC<IArticleProps> = ({
  user,
  isAuthenticated,
  article: { slug, title, description, tagList, createdAt, favorited, favoritesCount, author, status },
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
}) => {
  const navigate = useNavigate()

  const handleFavorite = () => {
    if (!isAuthenticated) {
      console.warn('not authenticated')
      return navigate('/login')
    }

    if (!favorited) {
      createArticleFavoriteRequest(slug)
    } else {
      deleteArticleFavoriteRequest(slug)
    }
  }
  return (
    <article className={styles.article}>
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
            <PiSpinnerBold className={styles.spinner} />
          ) : (
            <span className={styles.icon}>{favorited ? '💔' : '❤️‍🔥'}</span>
          )}
        </button>
      </div>
      <div className={styles.post}>
        <Link to={`/${author.username}/${slug}`}>
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
  () => ({
    isAuthenticated: isAuthenticated(),
    user: currentUser(),
  }),
  {
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
  }
)(CardArticle)
