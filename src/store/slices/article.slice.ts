import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IArticleFollowingUsersParams, IArticlesParams } from '../../models'

export const initialState = {
  tags: [],
  articles: [],
  articleDetails: {},
  articleFollowingUsers: [],
  isLoading: false,
  limit: 10,
  offset: 0,
  total: 0,
  errors: {},
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleFollowingUsersRequest: (
      state,
      _action: PayloadAction<IArticleFollowingUsersParams>
    ) => {
      state.isLoading = true
      state.errors = {}
    },
    setArticleFollowingUsersSuccess: (state, action: PayloadAction<any>) => {
      state.articleFollowingUsers = action.payload.data.articles
      state.total = action.payload.data.articlesCount
      state.offset = action.payload.params.offset
      state.isLoading = false
    },
    setArticlesRequest: (state, _action: PayloadAction<IArticlesParams>) => {
      state.isLoading = true
      state.errors = {}
    },
    setArticlesSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)

      state.articles = action.payload.data.articles
      state.total = action.payload.data.articlesCount
      state.isLoading = false
    },
    setArticlesFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.isLoading = false
    },
    setArticleDetails: (state, action: PayloadAction<any>) => {},
    createArticle: (state, action: PayloadAction<any>) => {},
    updateArticle: (state, action: PayloadAction<any>) => {},
    deleteArticle: (state, action: PayloadAction<any>) => {},
    createArticleFavorite: (state, action: PayloadAction<any>) => {},
    deleteArticleFavorite: (state, action: PayloadAction<any>) => {},
    setTags: (state, action: PayloadAction<any>) => {},
  },
})

export const {
  setArticleFollowingUsersRequest,
  setArticleFollowingUsersSuccess,
  setArticlesRequest,
  setArticlesSuccess,
  setArticlesFailure,
  setArticleDetails,
  createArticle,
  updateArticle,
  deleteArticle,
  setTags,
} = articleSlice.actions

export default articleSlice.reducer
