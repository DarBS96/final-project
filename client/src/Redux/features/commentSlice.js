import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  username: "",
  refreshComments: false,
};

const commentsReducer = createSlice({
  name: "comments",
  initialState,
  reducers: {
    showAllComments: (state, action) => {
      console.log(action);
      state.comments = action.payload.comments;
      state.username = action.payload.username;
    },
    refreshComments: (state, action) => {
      state.refreshComments = action.payload;
    },
  },
});

export const { refreshComments, showAllComments } = commentsReducer.actions;

export default commentsReducer.reducer;
