import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  articles: [],
  articleDetails: {},
  tags: [],
  articleFollowingUsers: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleFollowingUsers: (state, action: PayloadAction<any>) => {},
    setArticles: (state, action: PayloadAction<any>) => {},
    setArticleDetails: (state, action: PayloadAction<any>) => {},
    createArticle: (state, action: PayloadAction<any>) => {},
    updateArticle: (state, action: PayloadAction<any>) => {},
    deleteArticle: (state, action: PayloadAction<any>) => {},
    createArticleFavorite: (state, action: PayloadAction<any>) => {},
    deleteArticleFavorite: (state, action: PayloadAction<any>) => {},
    setTags: (state, action: PayloadAction<any>) => {},
  },
});

export const {
  setArticleFollowingUsers,
  setArticles,
  setArticleDetails,
  createArticle,
  updateArticle,
  deleteArticle,
  setTags,
} = articleSlice.actions;

export default articleSlice.reducer;
