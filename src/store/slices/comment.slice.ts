import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  comments: [],
};

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setArticleComment: (state, action: PayloadAction<any>) => {},
    createArticleComment: (state, action: PayloadAction<any>) => {},
    deleteArticleComment: (state, action: PayloadAction<any>) => {},
  },
});

export const { setArticleComment, createArticleComment, deleteArticleComment } =
  comment.actions;

export default comment.reducer;
