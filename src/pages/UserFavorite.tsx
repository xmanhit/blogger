import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { useSearchParams, useParams, NavLink } from 'react-router-dom'
import { RootState } from '../store'
import { currentUserRequest } from '../store/slices/auth.slice'
import { setArticlesRequest } from '../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../models'
import { currentUser } from '../services'
import { CardArticle, Pagination } from '../components/ui'
import { setProfile, createProfileFollowUser, createProfileUnFollowUser } from '../store/slices/profile.slice'
import { IProfile } from '../models'
import ArticlesLoading from '../components/ui/ArticlesLoading'
import UserLoading from '../components/ui/UserLoading'
import styles from '../styles/User.module.css'
import global from '../styles/Global.module.css'

const UserFavorite: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
  setProfile,
  total,
  limit,
  isArticlesLoading,
  profile,
  isLoading,
  createProfileFollowUser,
  createProfileUnFollowUser,
}): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams()
  let [getProfile, setGetProfile] = useState<IProfile | undefined>(undefined)

  const isFavorites = window.location.pathname.includes('/favorites')

  const page: number = Number(searchParams.get('page')) || 1
  const param = useParams()
  useEffect(() => {
    document.title = 'Blogger | Favorites'
    if (!user) {
      currentUserRequest()
    }
  }, [])

  useLayoutEffect(() => {
    setGetProfile(undefined)
    profile = undefined
  }, [param])

  let author = ''

  if (param?.username) {
    author = param.username
  } else if (user?.username) {
    author = user.username
  }

  useLayoutEffect(() => {
    setProfile({
      username: author,
      profile: {
        username: author,
      },
    })
  }, [author])

  useEffect(() => {
    setGetProfile((prevProfile) => (profile as IProfile) ?? prevProfile)
  }, [profile])

  useEffect(() => {
    const offset = (page - 1) * limit
    const favorited = author

    if (isFavorites) {
      author && setArticlesRequest({ favorited, limit, offset })
    } else {
      author && setArticlesRequest({ author, limit, offset })
    }
  }, [user?.username, page, isFavorites])

  const username = profile?.username

  const handleFollow = () => {
    createProfileFollowUser({
      username,
      profile: {},
    })
  }

  const handleUnFollow = () => {
    createProfileUnFollowUser({
      username,
      profile: {},
    })
  }

  return (
    <div className={styles.userBg}>
      {getProfile ? (
        <div className={styles.userLayout}>
          <div className={styles.userContainer}>
            <div className={styles.userTop}>
              <span className={styles.userAvatar}>
                {!isLoading && profile && getProfile['image'] ? (
                  <img className={styles.userAvatarImg} width={128} height={128} src={getProfile['image']} alt='' />
                ) : (
                  <div></div>
                )}
              </span>
              <div className={styles.userAction}>
                {!isLoading &&
                  user &&
                  getProfile['username'] !== user['username'] &&
                  (getProfile?.profile?.following ? (
                    <button onClick={handleUnFollow} className={styles.userFollow}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={handleFollow} className={styles.userFollow}>
                      Follow
                    </button>
                  ))}
              </div>
            </div>
            <div className={styles.userDetail} data-status-checked='true'>
              <div className={styles.userUserName}>
                <h1 className={styles.userUserNameText}>{getProfile['username']}</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UserLoading />
      )}
      <nav className={global.nav}>
        {user && getProfile && (
          <ul className={global.list}>
            <li className={global.item}>
              {getProfile['username'] !== user['username'] ? (
                <NavLink
                  className={({ isActive, isPending }) =>
                    (isPending ? global.pending : isActive ? '' : global.active) + ' ' + global.link
                  }
                  to={getProfile['username'] !== user['username'] ? `/${author}` : `/me`}
                >
                  My Articles
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive, isPending }) =>
                    (isPending ? global.pending : isActive ? global.active : '') + ' ' + global.link
                  }
                  to={getProfile['username'] !== user['username'] ? `/${author}` : `/me`}
                >
                  My Articles
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                onClick={(e) => {
                  e.preventDefault()
                }}
                className={({ isActive, isPending }) =>
                  (isPending ? global.pending : isActive ? global.active : '') + ' ' + global.link
                }
                to={`/${author}/favorites`}
              >
                Favorited Articles
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
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
    limit: state.article.limit,
    isArticlesLoading: state.article.status.articles === 'loading',
    // profile: state.profile.profile,
    // isLoading: state.profile.isLoading
    profile: state.profile.profile || {},
    isLoading: state.profile.isLoading || false,
  }),
  { currentUserRequest, setArticlesRequest, setProfile, createProfileFollowUser, createProfileUnFollowUser }
)(UserFavorite)
