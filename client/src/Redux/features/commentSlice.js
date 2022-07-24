import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const URL = `${process.env.REACT_APP_URL}/feelingEat`;

// const initialState = {
//   feelings: [],
//   isLoading: true,
//   selectedFeeling: "",
// };

// export const getFeelings = createAsyncThunk(
//   "feelings/getFeelings",
//   async (name, thunkAPI) => {
//     try {
//       //In thunkAPI we have bunch of methods especially access to any state in the store
//       //   console.log(thunkAPI);
//       const { data } = await axios(URL);
//       return data;
//     } catch (err) {
//       //By this way we can get the custom rejected message in the payload
//       return thunkAPI.rejectWithValue("something went wrong");
//     }
//   }
// );

// const feelingReducer = createSlice({
//   name: "feelings",
//   initialState,
//   reducers: {
//     selectedFeeling: (state, action) => {
//       state.selectedFeeling = action.payload;
//     },
//   },
//   extraReducers: {
//     [getFeelings.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getFeelings.fulfilled]: (state, action) => {
//       //The payload in the action is the data that we returning from getFeelings func
//       // console.log(action);
//       state.isLoading = false;
//       state.feelings = action.payload;
//     },
//     [getFeelings.rejected]: (state, action) => {
//       state.isLoading = false;
//     },
//   },
// });

// export const { selectedFeeling } = feelingReducer.actions;

// export default feelingReducer.reducer;
