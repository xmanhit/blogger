import { connect } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PiSpinnerBold } from 'react-icons/pi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { IComment, ICommentListProps } from '../../models'
import { currentUser } from '../../services'
import { RootState } from '../../store'
import { deleteArticleCommentRequest, setArticleCommentRequest } from '../../store/slices/comment.slice'
import { formatDate, formatFullDate } from '../../utils'
import styles from '../../styles/Comments.module.css'

const CommentList: React.FC<ICommentListProps> = ({
  user,
  setArticleCommentRequest,
  deleteArticleCommentRequest,
  comments,
}) => {
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      setArticleCommentRequest({ slug })
    }
  }, [])

  return (
    <div className={styles.commentListWrapper}>
      <ul className={styles.commentList}>
        {comments.map((comment: IComment) => (
          <li className={styles.comment} key={comment.id}>
            <div className={styles.author}>
              <Link
                className={styles.link}
                to={comment.author.username === user?.username ? '/me' : `/${comment.author.username}`}
              >
                <img className={styles.avatar} src={comment.author.image} alt='Author' />
              </Link>
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <div className={styles.nameWrapper}>
                  <Link
                    className={styles.name}
                    to={comment.author.username === user?.username ? '/me' : `/${comment.author.username}`}
                  >
                    {comment.author.username}
                  </Link>
                  <span className={styles.dot}>•</span>
                  <time className={styles.date} title={formatFullDate(new Date(comment.createdAt))}>
                    {formatDate(new Date(comment.createdAt))}
                  </time>
                </div>

                {user?.username === comment.author.username && (
                  <button
                    className={styles.deleteButton}
                    disabled={comment.status?.delete === 'loading'}
                    onClick={() => slug && deleteArticleCommentRequest({ slug, commentId: comment.id })}
                  >
                    {comment.status?.delete === 'loading' ? (
                      <PiSpinnerBold className={styles.spinner} />
                    ) : (
                      <MdOutlineDeleteOutline />
                    )}
                  </button>
                )}
              </div>
              <p className={styles.body}>{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    comments: state.comment.comments,
  }),
  { setArticleCommentRequest, deleteArticleCommentRequest }
)(CommentList)
