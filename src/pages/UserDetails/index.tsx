import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../services'
import { CardArticle, Pagination } from '../../components/ui'

const UserDetails: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
  total,
  limit,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])

  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements
    const offset = (page - 1) * limit
    const author = user?.username
    author && setArticlesRequest({ author, limit, offset })
  }, [user?.username, page])

  return (
    <>
      <div>User Details</div>
      <Link to='/me/settings'>Setting</Link>
      <h1>ABC</h1>
      <img src={user?.image} alt='' />
      <p>{user?.email}</p>

      <ul>
        {articles ? (
          articles.map((article: IArticle) => (
            <li key={article.slug}>
              {article.author ? <CardArticle article={article} /> : <p>No author information available</p>}
            </li>
          ))
        ) : (
          <li>No articles available</li>
        )}
        <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
      </ul>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    articles: state.article.articles,
    total: state.article.total,
    limit: state.article.limit,
  }),
  { currentUserRequest, setArticlesRequest }
)(UserDetails)
