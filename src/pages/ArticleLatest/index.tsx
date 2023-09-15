import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { getPagination } from '../../store/selectors'

export const articleLatestLoader = ({ request }) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page')
  return page
}

const ArticleLatest = ({
  isAuthenticated,
  setArticlesRequest,
  isLoading,
  articles,
  limit,
  total,
  pagination,
}): JSX.Element => {
  let page = Number(useLoaderData())

  useEffect(() => {
    if (page === 0) page = 1
    const offset = (page - 1) * limit

    setArticlesRequest({
      limit,
      offset,
    })
  }, [page])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isAuthenticated && (
        <div>
          <Link to='/'>Following</Link>
          <Link to='/latest'>Latest</Link>
        </div>
      )}

      {articles.map((article: any) => (
        <div key={article.slug}>{article.title}</div>
      ))}

      <div>
        {total > limit &&
          pagination.map((pageNumber: number) => (
            <Link
              className={pageNumber === page ? 'active' : ''}
              key={pageNumber}
              to={`/latest?page=${pageNumber}`}
            >
              {pageNumber}
            </Link>
          ))}
      </div>
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
  { setArticlesRequest }
)(ArticleLatest)
