import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useSearchParams, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../services'
import { CardArticle, Pagination } from '../../components/ui'
import { setProfile, createProfileFollowUser, createProfileUnFollowUser } from '../../store/slices/profile.slice';
import ArticlesLoading from '../../components/ui/ArticlesLoading'
import styles from '../../styles/User.module.css'

const UserDetails: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
  setProfile,
  total,
  limit,
  isArticlesLoading,
  pagination,
  profile,
  isLoading,
  createProfileFollowUser,
  createProfileUnFollowUser,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (!user) {
      currentUserRequest()
      // setProfile({username: user.username})
    }

  }, [])
  const param = useParams()
  let author = ''
  if (Object.keys(param).length != 0) {
    author = param.username
  } else {
    author = user.username
  }
  useEffect(() => {
    setProfile({ username: author })
  }, [author])
  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements
    const offset = (page - 1) * limit
    author && setArticlesRequest({ author, limit, offset })
  }, [user?.username, page])

  const handleFollow = () => {
    createProfileFollowUser({ username: profile.username })
  }

  const handleUnFollow = () => {
    createProfileUnFollowUser({ username: profile.username })
    console.log(profile.following)
  }
  console.log('isLoading',isLoading)
  return (
    <div className={styles.userBg}>
      {profile ? (<div className={styles.userLayout}>
        <div className={styles.userContainer}>
          <div className={styles.userTop}>
            <span className={styles.userAvatar}>
              {profile.image ? <img className={styles.userAvatarImg} width={128} height={128} src={profile.image} alt="" /> : 
              <div></div>}
              
            </span>
            <div className={styles.userAction}>
      {!isLoading && user && (profile.username !== user.username) && (
        profile.following ? (
          <button onClick={handleUnFollow} className={styles.userFollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow} className={styles.userFollow}>Follow</button>
        )
      )}
    </div>
          </div>
          <div className={styles.userDetail} data-status-checked="true">
            <div className={styles.userUserName}>
              <h1 className={styles.userUserNameText}>
                {profile.username}
              </h1>
            </div>
          </div>
        </div>
      </div>) : (
        <p>No articles available</p>
      )}
      <div className={styles.userList}>
      {isArticlesLoading && <ArticlesLoading />}
      {articles.length <= 0 && !isArticlesLoading && <div>No articles yet</div>}
        {articles ? (
          articles.map((article: IArticle) => (
            <div key={article.slug}>
              {article.author ? <CardArticle article={article} /> : <p>No author information available</p>}
            </div>
          ))
        ) : (
          <li>No articles available</li>
        )}
        <Pagination total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
      </div>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    articles: state.article.articles,
    total: state.article.total,
    isArticlesLoading: state.article.status.articles === 'loading',
    limit: state.article.limit,
    profile: state.profile.profile,
    isLoading: state.profile.isLoading
  }),
  { currentUserRequest, setArticlesRequest, setProfile, createProfileFollowUser, createProfileUnFollowUser }
)(UserDetails)
