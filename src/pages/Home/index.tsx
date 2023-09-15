import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { isLoading } from '../../store/selectors'
import {
  setArticleFollowingUsersRequest,
  setArticlesRequest,
} from '../../store/slices/article.slice'
import { Link } from 'react-router-dom'

const Home = ({
  isAuthenticated,
  setArticleFollowingUsersRequest,
  isLoading,
  page,
  limit,
  total,
}): JSX.Element => {
  console.log(isAuthenticated, isLoading, page, limit, total)
  useEffect(() => {
    const offset = (page - 1) * limit
    setArticleFollowingUsersRequest({
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
      <div>total: {total}</div>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.article.isLoading,
    page: state.article.page,
    limit: state.article.limit,
    total: state.article.total,
  }),
  { setArticleFollowingUsersRequest, setArticlesRequest }
)(Home)
