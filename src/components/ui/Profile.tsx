import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { currentUser } from '../../services'
import {
  followUserRequest,
  setProfileRequest,
  setProfileSuccess,
  unFollowUserRequest,
} from '../../store/slices/profile.slice'
import styles from '../../styles/Profile.module.css'
import ProfileLoading from './ProfileLoading'
import { PiSpinnerBold } from 'react-icons/pi'
const Profile: React.FC<any> = ({
  status,
  user,
  profile,
  setProfileSuccess,
  setProfileRequest,
  followUserRequest,
  unFollowUserRequest,
}) => {
  const { username } = useParams()
  const isMe = !username
  useEffect(() => {
    if (isMe) {
      setProfileSuccess({ profile: user })
    } else {
      setProfileRequest({ username })
    }
  }, [username])

  if (status.profile === 'loading') {
    return <ProfileLoading />
  }

  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <div className={styles.profileHeader}>
          <span className={styles.avatar}>
            <img className={styles.img} src={profile?.image} width={128} height={128} loading='lazy' alt='Avatar' />
          </span>
          <div className={styles.actions}>
            {isMe ? (
              <Link className={`${styles.btn} ${styles.edit}`} to={'/me/settings'}>
                Edit Profile
              </Link>
            ) : profile?.following ? (
              <button
                disabled={status.unFollow === 'loading'}
                onClick={() => unFollowUserRequest({ username: profile?.username })}
                className={styles.btn}
              >
                UnFollow {status.unFollow === 'loading' && <PiSpinnerBold className={styles.spinner} />}
              </button>
            ) : (
              <button
                disabled={status.follow === 'loading'}
                onClick={() => followUserRequest({ username: profile?.username })}
                className={styles.btn}
              >
                Follow {status.follow === 'loading' && <PiSpinnerBold className={styles.spinner} />}
              </button>
            )}
          </div>
        </div>
        <div className={styles.details}>
          <h1 className={styles.name}>{profile?.username}</h1>
          {profile?.bio && <p className={styles.bio}>{profile.bio}</p>}
        </div>
      </header>
    </section>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    status: state.profile.status,
    profile: state.profile.profile,
  }),
  { setProfileRequest, setProfileSuccess, followUserRequest, unFollowUserRequest }
)(Profile)
