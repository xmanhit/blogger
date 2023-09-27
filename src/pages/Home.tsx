import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../store'
import { setArticleFollowingRequest, setArticlesRequest, setTagsRequest } from '../store/slices/article.slice'
import { LoaderFunction, NavLink, redirect, useLoaderData, useSearchParams } from 'react-router-dom'
import { IArticle, IHomeProps } from '../models'
import { CardArticle, Pagination } from '../components/ui'
import { isAuthenticated } from '../services'
import TagList from '../components/ui/TagList'
import styles from '../styles/Global.module.css'
import ArticlesLoading from '../components/ui/ArticlesLoading'

export const homeLoader: LoaderFunction = ({ request }) => {
  const url: URL = new URL(request.url)
  const isFollowing: boolean = url.pathname === '/following'
  if (!isAuthenticated() && isFollowing) {
    return redirect('/login')
  }
  return { isFollowing }
}

const Home: React.FC<IHomeProps> = ({
  isAuthenticated,
  setTagsRequest,
  setArticlesRequest,
  setArticleFollowingRequest,
  isTagsLoading,
  isArticlesLoading,
  tagList,
  articles,
  limit,
  total,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  let { isFollowing } = useLoaderData() as { isFollowing: boolean }
  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
  }, [])

  useEffect(() => {
    const offset = (page - 1) * limit

    if (isAuthenticated && isFollowing) {
      setArticleFollowingRequest({
        limit,
        offset,
      })
    } else {
      setArticlesRequest({
        limit,
        offset,
      })
    }
  }, [isAuthenticated, page, isFollowing])

  return (
    <div>
      <TagList isTagsLoading={isTagsLoading} tagList={tagList} />
      {isAuthenticated && (
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink
                className={({ isActive, isPending }) =>
                  (isPending ? styles.pending : isActive ? styles.active : '') + ' ' + styles.link
                }
                to='/'
              >
                Latest
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  (isPending ? styles.pending : isActive ? styles.active : '') + ' ' + styles.link
                }
                to='/following'
              >
                Following
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className={styles.articleWrapper}>
        {isArticlesLoading && <ArticlesLoading />}
        {articles.length <= 0 && !isArticlesLoading && <div>No articles yet</div>}
        {articles?.map((article: IArticle) => (
          <CardArticle key={article.slug} article={article} />
        ))}
      </div>

      <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    isArticlesLoading: state.article.status.articles === 'loading',
    isTagsLoading: state.article.status.tagList === 'loading',
    tagList: state.article.tagList,
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
  }),
  {
    setTagsRequest,
    setArticlesRequest,
    setArticleFollowingRequest,
  }
)(Home)
