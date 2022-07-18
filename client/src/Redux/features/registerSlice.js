import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userRegisterInfo: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  },
};

const registerReducer = createSlice({
  name: "register",
  initialState,
  reducers: {
    getRegisterInfo: (state, action) => {
      state.userRegisterInfo = action.payload;
    },

    restartRegisterInfo: (state, action) => {
      state.userRegisterInfo = initialState.userRegisterInfo;
    },
  },
});

export const { getRegisterInfo, restartRegisterInfo } = registerReducer.actions;

export default registerReducer.reducer;
