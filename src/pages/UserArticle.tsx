import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSearchParams, useParams, useLocation } from 'react-router-dom'
import { RootState } from '../store'
import { setArticlesRequest } from '../store/slices/article.slice'
import { ArticlesLoading, CardArticle, Pagination } from '../components/ui'
import styles from '../styles/Global.module.css'
import { IArticle } from '../models'
import NotFound from './NotFound'

const UserArticle: React.FC<any> = ({ isArticlesLoading, user, articles, limit, total, setArticlesRequest }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const page: number = Number(searchParams.get('page')) || 1
  const maxPage: number = Math.ceil(total / limit)
  const { username } = useParams()

  useEffect(() => {
    document.title = 'Blogger | My Articles'
  }, [])

  useEffect(() => {
    if (!username && !user?.username) {
      return
    }
    const offset = (page - 1) * limit
    const tmp = location.pathname.split('/').pop()
    let author = username || user.username
    const isFavoritePage = tmp === 'favorites'

    if (isFavoritePage) {
      setArticlesRequest({ favorited: author, limit, offset })
    } else {
      setArticlesRequest({ author, limit, offset })
    }
  }, [username, user?.username, location.pathname, page])

  if (!isArticlesLoading && page > maxPage && maxPage > limit) {
    return <NotFound />
  }

  return (
    <div className={styles.articleWrapper}>
      {isArticlesLoading && <ArticlesLoading />}
      {articles.length <= 0 && !isArticlesLoading && <div>No articles yet</div>}
      {articles?.map((article: IArticle) => (
        <CardArticle key={article.slug} article={article} />
      ))}
      <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    user: state.auth.currentUser,
    isArticlesLoading: state.article.status.articles === 'loading' || state.auth.status.currentUser === 'loading',
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
  }),
  { setArticlesRequest }
)(UserArticle)
