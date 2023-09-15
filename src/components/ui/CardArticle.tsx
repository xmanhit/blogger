import { Link } from 'react-router-dom'
import { IArticleProps } from '../../models'
import { timeSince } from '../../utils'

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
}) => {
  return (
    <article>
      <header>
        <img src={author.image} alt={author.username} />
        <strong>{author.username}</strong>
      </header>
      <Link to={`/${slug}`}>
        <h3>{title}</h3>
      </Link>
      <div>
        {tagList.map((tag: string) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <div>
        {favorited ? (
          <button>{favoritesCount}</button>
        ) : (
          <button>{favoritesCount}</button>
        )}
        <time>{timeSince(new Date(createdAt))}</time>
      </div>
    </article>
  )
}

export default CardArticle
