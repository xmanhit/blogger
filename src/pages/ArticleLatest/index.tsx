import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { getOffset, getPagination } from '../../store/selectors'

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
  const pageNumber = useLoaderData()

  useEffect(() => {
    const newOffset = (Number(pageNumber) - 1 || 0) * limit
    setArticlesRequest({
      limit,
      offset: newOffset,
    })
  }, [pageNumber])

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
            <Link key={pageNumber} to={`/latest?page=${pageNumber}`}>
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
    page: state.article.page,
    limit: state.article.limit,
    total: state.article.total,
    offset: getOffset(state),
    pagination: getPagination(state),
  }),
  { setArticlesRequest }
)(ArticleLatest)
