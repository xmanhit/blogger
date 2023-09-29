import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSearchParams, useParams } from 'react-router-dom'
import { RootState } from '../store'
import { currentUser } from '../services'
import { setArticlesRequest } from '../store/slices/article.slice'
import { ArticlesLoading, CardArticle, Pagination } from '../components/ui'
import styles from '../styles/Global.module.css'
import { IArticle } from '../models'

const UserArticle: React.FC<any> = ({ isArticlesLoading, user, articles, limit, total, setArticlesRequest }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1
  const { username } = useParams()

  useEffect(() => {
    const offset = (page - 1) * limit
    const author = username || user.username
    setArticlesRequest({ author, limit, offset })
  }, [username, page])

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
    user: currentUser(),
    isArticlesLoading: state.article.status.articles === 'loading',
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
  }),
  { setArticlesRequest }
)(UserArticle)
