import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
  isAuthenticated: !!userFromStorage,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    authFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    updateProfile: (state, action) => {
      if (state.user) {
        const updatedUser = {
          ...state.user,
          ...action.payload
        };
        state.user = updatedUser;

        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }
  }
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;
