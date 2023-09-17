import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IComment, ICommentState } from '../../models'

export const initialState: ICommentState = {
  isLoading: false,
  isActionLoading: '',
  comments: [],
  errors: {},
}

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setArticleCommentRequest: (
      state,
      _action: PayloadAction<{ slug: string }>
    ) => {
      state.isLoading = true
      state.errors = {}
    },
    setArticleCommentSuccess: (
      state,
      action: PayloadAction<{ comments: IComment[] }>
    ) => {
      state.isLoading = false
      state.comments = action.payload.comments
    },
    setArticleCommentError: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    createArticleCommentRequest: (
      state,
      action: PayloadAction<{
        action: string
        slug: string
        comment: { body: string }
      }>
    ) => {
      state.isActionLoading = action.payload.action
      state.errors = {}
    },
    createArticleCommentSuccess: (
      state,
      action: PayloadAction<{ comment: IComment }>
    ) => {
      state.isActionLoading = ''
      state.comments.push(action.payload.comment)
    },
    createArticleCommentError: (state, action: PayloadAction<any>) => {
      state.isActionLoading = ''
      state.errors = action.payload
    },
    deleteArticleCommentRequest: (state, action: PayloadAction<any>) => {
      state.isActionLoading = action.payload
      state.errors = {}
    },
    deleteArticleCommentSuccess: (state, action: PayloadAction<any>) => {
      state.isActionLoading = ''
      state.comments.find((comment) => comment.id === action.payload)
    },
    deleteArticleCommentError: (state, action: PayloadAction<any>) => {
      state.isActionLoading = ''
      state.errors = action.payload
    },
  },
})

export const {
  setArticleCommentRequest,
  setArticleCommentSuccess,
  setArticleCommentError,
  createArticleCommentRequest,
  createArticleCommentSuccess,
  createArticleCommentError,
  deleteArticleCommentRequest,
  deleteArticleCommentSuccess,
  deleteArticleCommentError,
} = comment.actions

export default comment.reducer
