import styles from '../../styles/Loading.module.css'

const ArticlesLoading = () => {
  return (
    <>
      <article className={`${styles.article} ${styles.skeleton}`}>
        <div className={styles.author}>
          <div className={styles.link}>
            <div className={styles.avatar}></div>
            <div className={styles.wrapper}>
              <strong className={styles.name}></strong>
              <time className={styles.time}></time>
            </div>
          </div>
          <button className={styles.favorite}></button>
        </div>
        <div className={styles.post}>
          <h3 className={styles.title}>
            <div className={styles.line}></div>
            <div className={`${styles.line} ${styles.line3}`}></div>
          </h3>

          <div className={styles.desc}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={`${styles.line} ${styles.line1}`}></div>
          </div>

          <div className={styles.tagList}>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
          </div>
        </div>
      </article>
      <article className={`${styles.article} ${styles.skeleton}`}>
        <div className={styles.author}>
          <div className={styles.link}>
            <div className={styles.avatar}></div>
            <div className={styles.wrapper}>
              <strong className={styles.name}></strong>
              <time className={styles.time}></time>
            </div>
          </div>
          <button className={styles.favorite}></button>
        </div>
        <div className={styles.post}>
          <h3 className={styles.title}>
            <div className={styles.line}></div>
            <div className={`${styles.line} ${styles.line5}`}></div>
          </h3>

          <div className={styles.desc}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={`${styles.line} ${styles.line7}`}></div>
          </div>

          <div className={styles.tagList}>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
            <div className={styles.tag}></div>
          </div>
        </div>
      </article>
    </>
  )
}

export default ArticlesLoading
