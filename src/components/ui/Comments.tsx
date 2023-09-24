import { connect } from 'react-redux'
import CommentForm from '../form/CommentForm'
import CommentList from './CommentList'
import { RootState } from '../../store'
import { countComments } from '../../store/selectors'
import styles from '../../styles/Global.module.css'
import { isAuthenticated } from '../../services'
import { Link } from 'react-router-dom'

const Comments: React.FC<{ countComments?: number; isAuthenticated: boolean }> = ({
  isAuthenticated,
  countComments,
}) => {
  return (
    <div className={styles.commentWrapper}>
      <h2 className={styles.title}>Comments {!!countComments && `(${countComments})`}</h2>
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
  isAuthenticated: isAuthenticated(),
  countComments: countComments(state),
}))(Comments)
