import { Link } from 'react-router-dom'
import { IArticleProps } from '../../models'
import { timeSince } from '../../utils'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
} from '../../store/slices/article.slice'

const CardArticle: React.FC<IArticleProps> = ({
  currentUsername,
  article: {
    slug,
    title,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    author,
    status,
  },
  isAuthenticated,
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
}) => {
  const handleFavorite = () => {
    if (!isAuthenticated) {
      console.log('not authenticated')
    }

    if (!favorited) {
      createArticleFavoriteRequest(slug)
    } else {
      deleteArticleFavoriteRequest(slug)
    }
  }
  return (
    <article>
      <div>
        <Link
          to={
            currentUsername === author.username
              ? '/me'
              : `/${author.username}`
          }
        >
          <img src={author.image} alt={author.username} />
          <strong>{author.username}</strong>
        </Link>
      </div>
      <Link to={`/${author.username}/${slug}`}>
        <h3>{title}</h3>
      </Link>
      <div>
        {tagList?.map((tag: string) => (
          <Link key={tag} to={`/tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={handleFavorite}
          disabled={status?.favorite === 'loading'}
        >
          {favoritesCount} | {favorited ? 'Remove' : 'Add'}
        </button>
        <time>{timeSince(new Date(createdAt))}</time>
      </div>
    </article>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    currentUsername: state.auth.user?.username,
  }),
  {
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
  }
)(CardArticle)
