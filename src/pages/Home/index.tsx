import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  setArticleFollowingUsersRequest,
  setArticlesRequest,
} from '../../store/slices/article.slice'
import { Link, LoaderFunction, NavLink, useLoaderData } from 'react-router-dom'
import { getPagination } from '../../store/selectors'
import { IArticle, IHomeProps } from '../../models'
import CardArticle from '../../components/ui/CardArticle'

export const homeLoader: LoaderFunction = ({ request }) => {
  const url: URL = new URL(request.url)
  const page: number = Number(url.searchParams.get('page')) || 1
  let isLatest: boolean = url.pathname === '/latest'
  return { page, isLatest }
}

const Home: React.FC<IHomeProps> = ({
  isAuthenticated,
  setArticlesRequest,
  setArticleFollowingUsersRequest,
  isLoading,
  articles,
  limit,
  total,
  pagination,
}): JSX.Element => {
  let { page, isLatest } = useLoaderData() as {
    page: number
    isLatest: boolean
  }
  useEffect(() => {
    page = Number(page)
    const offset = (page - 1) * limit

    if (isAuthenticated && !isLatest) {
      setArticleFollowingUsersRequest({
        limit,
        offset,
      })
    } else {
      setArticlesRequest({
        limit,
        offset,
      })
    }
  }, [isAuthenticated, page, isLatest])

  return (
    <div>
      {isAuthenticated && (
        <div>
          <NavLink to='/'>Following</NavLink>
          <NavLink to='/latest'>Latest</NavLink>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
      {articles.length <= 0 && !isLoading && <div>No articles yet</div>}
      {articles?.map((article: IArticle) => (
        <CardArticle key={article.slug} article={article} />
      ))}

      {total > limit && (
        <div>
          {pagination.map((pageNumber: number) => (
            <Link
              className={pageNumber === page ? 'active' : ''}
              key={pageNumber}
              to={`/${isLatest ? 'latest' : ''}?page=${pageNumber}`}
            >
              [{pageNumber === page ? 'Current' : ''} {pageNumber}]
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.article.isLoading,
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
    pagination: getPagination(state),
  }),
  {
    setArticlesRequest,
    setArticleFollowingUsersRequest,
  }
)(Home)
