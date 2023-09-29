import styles from '../../styles/Profile.module.css'
import loading from '../../styles/Loading.module.css'
import { isAuthenticated } from '../../services'

const ProfileLoading: React.FC = () => {
  return (
    <section className={`${styles.profile} ${loading.ProfileLoading} ${loading.skeleton}`}>
      <header className={styles.header}>
        <div className={styles.profileHeader}>
          <div className={`${styles.avatar} ${loading.avatar}`}>
            <div className={loading.line}></div>
          </div>
          <div className={`${styles.actions} ${loading.actions}`}>
            {isAuthenticated() && <div className={loading.line}></div>}
          </div>
        </div>
        <div className={styles.details}>
          <h1 className={`${styles.name} ${loading.name}`}>
            <div className={loading.line}></div>
          </h1>
          <div className={`${styles.bio} ${loading.bio}`}>
            <div className={loading.line}></div>
            <div className={`${loading.line} ${loading.line3}`}></div>
          </div>
        </div>
      </header>
    </section>
  )
}

export default ProfileLoading
