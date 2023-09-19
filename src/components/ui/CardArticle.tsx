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
<<<<<<< HEAD
      <header>
        <Link to={`./${author.username}`}>
          <img src={author.image} alt={author.username} />
          <strong>{author.username}</strong>
        </Link>
      </header>
      <Link to={`/article/${slug}`}>
=======
      <div>
        <img src={author.image} alt={author.username} />
        <strong>{author.username}</strong>
      </div>
      <Link to={`/${author.username}/${slug}`}>
>>>>>>> 47800eb0d776e95b6631a511f7cffd15c5db48d3
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
  }),
  {
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest,
  }
)(CardArticle)
