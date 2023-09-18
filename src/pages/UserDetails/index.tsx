import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { currentUserRequest } from '../../store/slices/auth.slice';
import { setArticleFollowingUsersRequest, setArticlesRequest } from '../../store/slices/article.slice';

const UserDetails = ({
  user,
  articles,
  currentUserRequest,
  isAuthenticated,
  isActionLoading,
  isLoading,
  setArticleFollowingUsersRequest,
  setArticlesRequest,
}): JSX.Element => {
  useEffect(() => {
    currentUserRequest();
  }, []);

  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements
    setArticlesRequest({ author: user.username });
  }, [user]);

  return (
    <>
      <div>UserSetting</div>
      <h1>ABC</h1>
      <img src={user.image} alt="" />
      <p>{user.email}</p>

      <ul>
        {articles.articles ? (
          articles.articles.map((article) => (
            <li key={article.slug}>
              {article.author ? (
                <>
                  <h2>{article.author.username}</h2>
                  <h4>{article.description}</h4>
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
    articles: state.article, // Make sure this maps to the correct Redux state path
    isAuthenticated: state.auth.isAuthenticated,
    isActionLoading: state.auth.isActionLoading,
    isLoading: state.auth.isLoading,
  }),
  { currentUserRequest, setArticleFollowingUsersRequest, setArticlesRequest }
)(UserDetails);
