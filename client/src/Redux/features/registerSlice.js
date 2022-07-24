import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userRegisterInfo: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  },
  token: {
    token: "",
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
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { saveToken, getRegisterInfo, restartRegisterInfo } =
  registerReducer.actions;

export default registerReducer.reducer;
