import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import registerReducer from "./features/registerSlice.js";
import feelingSlice from "./features/feelingSlice.js";
import recipesSlice from "./features/recipesSlice.js";
import commentSlice from "./features/commentSlice.js";

// const myLogger = (store) => (next) => (action) => {
//   console.log(store.getState());
//   next(action);
//   console.log(store.getState());
// };
const store = configureStore({
  reducer: {
    registerReducer,
    feelingSlice,
    recipesSlice,
    commentSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  //With the syntax below we can't using createAsyncThunk because you will have to do all of the process of thunk too- to create it customize like the logger that we have created
  // middleware: [myLogger],
});

export default store;
