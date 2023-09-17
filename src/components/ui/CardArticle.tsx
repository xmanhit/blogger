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
  article: {
    slug,
    title,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    author,
  },
  isAuthenticated,
  isActionLoading,
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
      <header>
        <img src={author.image} alt={author.username} />
        <strong>{author.username}</strong>
      </header>
      <Link to={`/article/${slug}`}>
        <h3>{title}</h3>
      </Link>
      <div>
        {tagList.map((tag: string) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <div>
        <button onClick={handleFavorite} disabled={isActionLoading === slug}>
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
    isActionLoading: state.article.isActionLoading,
  }),
  {
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
  }
)(CardArticle)
