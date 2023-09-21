import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { currentUserRequest } from '../../store/slices/auth.slice';
import { setArticleFollowingRequest, setArticlesRequest } from '../../store/slices/article.slice';
import { setProfile, createProfileFollowUser, createProfileUnFollowUser} from '../../store/slices/profile.slice';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { getPagination } from '../../store/selectors'

const UserDetails = ({
  user,
  articles,
  currentUserRequest,
  isAuthenticated,
  isActionLoading,
  isLoading,
  setArticleFollowingRequest,
  setArticlesRequest,
  setProfile,
  profile,
  createProfileFollowUser,
  createProfileUnFollowUser,
  limit,
  total,
  pagination,
}): JSX.Element => {
  const param = useParams()

  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  // useEffect(() => {
    
  // })
  useEffect(() => {
    setArticlesRequest({ author: param.username })
    setProfile(param)
    const offset = (page - 1) * limit
  }, [param, page]);

  

  const handleFollow = () => {
    createProfileFollowUser({username: profile.username, limit,
      offset,})
  }

  const handleUnFollow = () => {
    createProfileUnFollowUser({username: profile.username})
    console.log(profile.following)
  }
  return (
    <>
      <Link to={'./settings'}>UserSetting</Link>
      <h1>ABC</h1>
      <img src={profile.image} alt="" />
      <p>{profile.username}</p>
      {!profile.following ? <button onClick={handleFollow}>Follow</button> : <button onClick={handleUnFollow}>UnFollow</button>}
      <ul>
        {articles.articles ? (
          articles.articles.map((article) => (
            <li key={article.slug}>
              {article.author ? (
                <>
                  <h2>{article.author.username}</h2>
                  <Link to={`../${article.author.username}/${article.slug}`}>
                    <h4>{article.description}</h4>
                  </Link>
                  <hr />
                </>
              ) : (
                <p>No author information available</p>
              )}
            </li>
          ))
        ) : (
          <p>No articles available</p>
        )}

      </ul>
      {total > limit && (
        <div>
          {pagination.map((pageNumber: number) => (
            <button
              className={pageNumber === page ? 'active' : ''}
              key={pageNumber}
              onClick={() => {
                setSearchParams({ page: pageNumber.toString() })
              }}
            >
              {pageNumber === page ? 'Current' : ''} {pageNumber}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default connect(
  (state: RootState) => ({
    user: state.auth.user,
    profile: state.profile.profile,
    articles: state.article, // Make sure this maps to the correct Redux state path
    isAuthenticated: state.auth.isAuthenticated,
    isActionLoading: state.auth.isActionLoading,
    isLoading: state.auth.isLoading,
    limit: state.article.limit,
    total: state.article.total,
    pagination: getPagination(state),
  }),
  { currentUserRequest, setArticleFollowingRequest, setArticlesRequest, setProfile, createProfileFollowUser, createProfileUnFollowUser }
)(UserDetails);
