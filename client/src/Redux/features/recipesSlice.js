import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes`;

const initialState = {
  recipes: [],
  isLoading: true,
  rating: 0,
  views: 0,
  comments: null,
  username: "",
  refreshComments: false,
};

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (name, thunkAPI) => {
    try {
      const id = thunkAPI.getState().feelingSlice.selectedFeeling;
      const token = thunkAPI.getState().registerReducer.token;
      //In thunkAPI we have bunch of methods especially access to any state in the store
      const data = await axios({
        method: "GET",
        url: URL,
        headers: {
          Authorization: token,
          id,
        },
      });
      return data.data;
    } catch (err) {
      console.log(err);
      //By this way we can get the custom rejected message in the payload
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const recipesReducer = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    selectedRecipe: (state, action) => {
      state.recipes = action.payload;
    },
    recipeViews: (state, action) => {
      state.views = action.payload;
    },
    ratingAvg: (state, action) => {
      state.rating = action.payload;
    },
    showAllComments: (state, action) => {
      state.comments = action.payload.comments;
      state.username = action.payload.username;
    },
    refreshComments: (state, action) => {
      state.refreshComments = action.payload;
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipes.fulfilled]: (state, action) => {
      //The payload in the action is the data that we returning from getFeelings func
      state.isLoading = false;
      state.recipes = action.payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  ratingAvg,
  selectedRecipe,
  recipeViews,
  showAllComments,
  refreshComments,
} = recipesReducer.actions;

export default recipesReducer.reducer;
