import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useSearchParams, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../services'
import { CardArticle, Pagination } from '../../components/ui'
import { getPagination } from '../../store/selectors'

const UserDetails: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
  total,
  limit,
  pagination,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])
  
  const author = useParams().username
  console.log(user.username)
  console.log('author', author)
  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements
    const offset = (page - 1) * limit
    author && setArticlesRequest({ author, limit, offset })
  }, [user?.username, page])

  return (
    <>
      <div>User Details</div>
      {author == user.username ? <Link to='/me/settings'>Setting</Link> : <></>}
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
        <Pagination pagination={pagination} total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
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
    pagination: getPagination(state.article),
  }),
  { currentUserRequest, setArticlesRequest }
)(UserDetails)
