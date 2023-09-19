import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { currentUserRequest } from '../../store/slices/auth.slice';
import { setArticleFollowingUsersRequest, setArticlesRequest } from '../../store/slices/article.slice';
import { setProfile, createProfileFollowUser, createProfileUnFollowUser} from '../../store/slices/profile.slice';
import { useParams, Link } from 'react-router-dom';
const UserDetails = ({
  user,
  articles,
  currentUserRequest,
  isAuthenticated,
  isActionLoading,
  isLoading,
  setArticleFollowingUsersRequest,
  setArticlesRequest,
  setProfile,
  profile,
  createProfileFollowUser,
  createProfileUnFollowUser,
}): JSX.Element => {
  useEffect(() => {
    console.log(profile)

  }, []);
  const param = useParams()
  useEffect(() => {
    // setArticlesRequest({ author: user.username });
    setArticlesRequest({ author: param.username })
    setProfile(param)
  }, [param]);

  const handleFollow = () => {
    createProfileFollowUser({username: profile.username})
    console.log(profile.following)
  }

  const handleUnFollow = () => {
    createProfileUnFollowUser({username: profile.username})
    console.log(profile.following)
  }
  // console.log('profile', profile)
  return (
    <>
      <div>UserSetting</div>
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
                  <Link to={`../article/${article.slug}`}>
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
  }),
  { currentUserRequest, setArticleFollowingUsersRequest, setArticlesRequest, setProfile, createProfileFollowUser, createProfileUnFollowUser }
)(UserDetails);
