import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userRegisterInfo: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  },
  token: "",
  isLogin: false,
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
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { saveToken, getRegisterInfo, restartRegisterInfo, isLogin } =
  registerReducer.actions;

export default registerReducer.reducer;
