import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes/myComments`;

const initialState = {
  comments: [],
  username: "",
  refreshComments: false,
  selectedComment: "",
  isEditDone: false,
};

export const getComments = createAsyncThunk(
  "recipes/getComments",
  async (name, thunkAPI) => {
    try {
      const token = thunkAPI.getState().registerReducer.token;
      const data = await axios({
        method: "get",
        url: `${URL}`,
        headers: {
          Authorization: token,
        },
      });

      return data.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const commentsReducer = createSlice({
  name: "comments",
  initialState,
  reducers: {
    showAllComments: (state, action) => {
      state.comments = action.payload.comments;
      state.username = action.payload.username;
    },
    refreshComments: (state, action) => {
      state.refreshComments = action.payload;
    },
    setEditDone: (state, action) => {
      state.isEditDone = action.payload;
    },
    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload;
    },
  },
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  setEditDone,
  refreshComments,
  showAllComments,
  setSelectedComment,
} = commentsReducer.actions;

export default commentsReducer.reducer;
