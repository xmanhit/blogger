import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useSearchParams, useParams, NavLink } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../services'
import { CardArticle, Pagination } from '../../components/ui'
import { setProfile, createProfileFollowUser, createProfileUnFollowUser } from '../../store/slices/profile.slice';
import ArticlesLoading from '../../components/ui/ArticlesLoading'
import UserLoading from '../../components/ui/UserLoading'
import styles from '../../styles/User.module.css'
import global from '../../styles/Global.module.css'

interface UserDetails extends IUserDetailsProps {
  user: IUser; // Add user prop
  favorites: 'Latest' | 'Following';
}

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
  let [getProfile, setGetProfile] = useState()
  const page: number = Number(searchParams.get('page')) || 1
  let param = useParams()
  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])

  useLayoutEffect(() => {
    setGetProfile(undefined)
    profile = undefined
  }, [param])
  
  let author = ''
  if (param && Object.keys(param).length !== 0) {
    author = param.username;
  } else {
    author = user.username;
  }

  useLayoutEffect(() => {
    setProfile({ username: author })
    
  }, [author])

  useEffect(() => {
    setGetProfile(profile)
  }, [profile])

  // useEffect(() => {
  //   // Assuming setArticlesRequest requires parameters like author or tags
  //   // Modify this accordingly based on your API requirements
  //   const offset = (page - 1) * limit
  //   const favorited = author
  //   author && setArticlesRequest({ favorited, limit, offset })
  // }, [user?.username, page])

  useEffect(() => {
    const offset = (page - 1) * limit;

    if (favorites === 'Latest') {
      setArticlesRequest({ favorited: user?.username, limit, offset });
    } else if (favorites === 'Following') {
      setArticlesRequest({ author: user?.username, limit, offset });
    }
  }, [user?.username, page, favorites]);

  const handleFollow = () => {
    createProfileFollowUser({ username: profile.username })
  }

  const handleUnFollow = () => {
    createProfileUnFollowUser({ username: profile.username })
    console.log(profile.following)
  }
  console.log('getProfile',getProfile)
  console.log('param',profile)
  return (
    <div className={styles.userBg}>
      {getProfile ? (<div className={styles.userLayout}>
        <div className={styles.userContainer}>
          <div className={styles.userTop}>
            <span className={styles.userAvatar}>
              {getProfile.image ? <img className={styles.userAvatarImg} width={128} height={128} src={getProfile.image} alt="" /> : 
              <div></div>}
              
            </span>
            <div className={styles.userAction}>
      {!isLoading && user && (getProfile.username !== user.username) && (
        getProfile.following ? (
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
                {getProfile.username}
              </h1>
            </div>
          </div>
        </div>
      </div>) : (
        <UserLoading/>
      )}
      {/* <nav className={global.nav}>
          <ul className={global.list}>
            <li className={global.item}>
              <NavLink
                className={({ isActive, isPending }) =>
                  (isPending ? global.pending : isActive ? global.active : '') + ' ' + global.link
                }
                to='.'
              >
                Latest
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  (isPending ? global.pending : isActive ? global.active : '') + ' ' + global.link
                }
                to='./favorites'
              >
                Following
              </NavLink>
            </li>
          </ul>
        </nav> */}
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