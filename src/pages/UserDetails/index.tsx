import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../services'
import CardArticle from '../../components/ui/CardArticle'

const UserDetails: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
}): JSX.Element => {
  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])

  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements
    user?.username && setArticlesRequest({ author: user.username })
  }, [user?.username])

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
          <p>No articles available</p>
        )}
      </ul>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    articles: state.article.articles, // Make sure this maps to the correct Redux state path
  }),
  { currentUserRequest, setArticlesRequest }
)(UserDetails)
