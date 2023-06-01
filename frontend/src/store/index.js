const { configureStore, createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

exports.authActions = authSlice.actions;

exports.store = configureStore({
  reducer: authSlice.reducer,
});
