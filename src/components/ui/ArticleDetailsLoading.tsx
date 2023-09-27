import { TbHeartPlus } from 'react-icons/tb'
import { isAuthenticated } from '../../services'
import styles from '../../styles/Loading.module.css'
import { FaRegComment } from 'react-icons/fa'

const ArticleDetailsLoading = () => {
  return (
    <div className={styles.layout}>
      {isAuthenticated() && (
        <aside className={`${styles.aside} ${styles.actions}`}>
          <button className={`${styles.action} ${styles.btnFavorite}`} type='button' disabled={true} title='Favorite'>
            <span className={styles.icon}>
              <TbHeartPlus className={styles.icon} />
            </span>
          </button>
          <a className={`${styles.action} ${styles.comment}`} title='Comments'>
            <span className={styles.icon}>
              <FaRegComment className={styles.icon} />
            </span>
          </a>
        </aside>
      )}
      <div className={styles.articleDetail}>
        <div className={styles.contentWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.author}>
              <div className={styles.avatar}></div>
              <div className={styles.info}>
                <strong className={styles.name}>
                  <div className={styles.line}></div>
                </strong>
                <time className={styles.date}>
                  <div className={styles.line}></div>
                </time>
              </div>
            </div>
            <div className={styles.favorites}>
              <span className={styles.favorite}>
                <span className={styles.count}></span>
                <span className={styles.icon}></span>
              </span>
            </div>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              <div className={styles.line}></div>
              <div className={`${styles.line} ${styles.line3}`}></div>
            </h1>
            <div className={styles.tagList}>
              <div className={styles.tag}>
                <div className={styles.line}></div>
              </div>
              <div className={styles.tag}>
                <div className={styles.line}></div>
              </div>
              <div className={styles.tag}>
                <div className={styles.line}></div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.line}></div>
              <div className={`${styles.line} ${styles.line7}`}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={`${styles.line} ${styles.line5}`}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={`${styles.line} ${styles.line9}`}></div>
            </div>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.commentWrapper}>
          <h2 className={styles.title}>Comments</h2>

          <div className={styles.commentForm}>
            <div className={styles.form}>
              <div className={styles.wrapper}>
                <div className={styles.avatar}></div>
                <div className={styles.formGroup}>
                  <div className={styles.formGroup}>
                    <div className={styles.formControl}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetailsLoading
