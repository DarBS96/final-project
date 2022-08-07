import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `${process.env.REACT_APP_URL}/feelingEat/recipes`;

const initialState = {
  recipes: [],
  isLoading: true,
  rating: 0,
  views: 0,
  customRecipe: {
    ingredients: [],
    preparation: [],
  },
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
    addRecipeFields: (state, action) => {
      for (let [field, value] of Object.entries(action.payload.fields)) {
        state.customRecipe[field] = value;
      }
    },
    addIngredients: (state, action) => {
      state.customRecipe.ingredients = state.customRecipe.ingredients.concat(
        action.payload.ingredients
      );
    },
    addPreparation: (state, action) => {
      state.customRecipe.preparation = state.customRecipe.preparation.concat(
        action.payload.preparation
      );
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipes.fulfilled]: (state, action) => {
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
  addRecipeFields,
  addIngredients,
  addPreparation,
} = recipesReducer.actions;

export default recipesReducer.reducer;
