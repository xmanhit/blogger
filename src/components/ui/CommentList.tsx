import { connect } from 'react-redux'
import { RootState } from '../../store'
import { deleteArticleCommentRequest, setArticleCommentRequest } from '../../store/slices/comment.slice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { currentUser } from '../../services'
import { IComment, ICommentListProps } from '../../models'

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
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment: IComment) => (
          <li key={comment.id}>
            {comment.author.username} - {comment.body} - {comment.createdAt}
            <br />
            {user?.username === comment.author.username && (
              <button
                disabled={comment.status?.delete === 'loading'}
                onClick={() => slug && deleteArticleCommentRequest({ slug, commentId: comment.id })}
              >
                Delete
              </button>
            )}
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
