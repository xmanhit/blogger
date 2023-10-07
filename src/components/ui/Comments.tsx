import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ICommentProps } from '../../models'
import CommentForm from '../form/CommentForm'
import CommentList from './CommentList'
import { RootState } from '../../store'
import { countComments } from '../../store/selectors'
import styles from '../../styles/Comments.module.css'

const Comments: React.FC<ICommentProps> = ({ status, isAuthenticated, countComments }) => {
  return (
    <div className={styles.commentWrapper}>
      <h2 className={styles.title}>
        Comments {status.comment !== 'loading' && !!countComments && `(${countComments})`}
      </h2>
      {isAuthenticated ? (
        <CommentForm />
      ) : (
        <>
          <h3 className={styles.notLoggedIn}>
            Please{' '}
            <Link to='/login'>
              <strong>
                <u>login</u>
              </strong>
            </Link>{' '}
            to leave a comment
          </h3>
        </>
      )}
      <CommentList />
    </div>
  )
}

export default connect((state: RootState) => ({
  status: state.comment.status,
  isAuthenticated: state.auth.isAuthenticated,
  countComments: countComments(state),
}))(Comments)
