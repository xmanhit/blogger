import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  deleteArticleCommentRequest,
  setArticleCommentRequest,
} from '../../store/slices/comment.slice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CommentList = ({
  username,
  setArticleCommentRequest,
  deleteArticleCommentRequest,
  comments,
}: any) => {
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
        {comments.map((comment: any) => (
          <li key={comment.id}>
            {comment.author.username} - {comment.body} - {comment.createdAt}
            <br />
            {username === comment.author.username && (
              <button
                disabled={comment.status?.delete === 'loading'}
                onClick={() =>
                  deleteArticleCommentRequest({ commentId: comment.id })
                }
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
    username: state.auth.user?.username,
    comments: state.comment.comments,
  }),
  { setArticleCommentRequest, deleteArticleCommentRequest }
)(CommentList)
