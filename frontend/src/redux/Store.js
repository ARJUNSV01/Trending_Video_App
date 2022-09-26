import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import videoReducer from "../features/videoSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video:videoReducer
  },
});
