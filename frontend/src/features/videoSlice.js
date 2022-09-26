import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../serverUrl";
import { toast } from "react-toastify";

const initialState = {
  videos: "",
  isLoading: false,
  isSuccess: false,
  isfailed: false,
  selectedPlayer:'',
  watchTime:''
};

export const fetchVideos = createAsyncThunk(
  "fetchvideo",
  async (data, thunkAPI) => {
    console.log("hey");
    try {
      const { data } = await axios.get(`${serverURL}/api/videos/fetchVideos`);
      return [...data];
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const videoSlice = createSlice({
  name: "user/video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
        state.selectedPlayer = action.payload
      },
      setWatchTime:(state,action)=>{
          state.watchTime = action.payload;
      }
  },
  extraReducers: {
    [fetchVideos.fulfilled]: (state, action) => {
      state.videos = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isfailed = false;
    },
    [fetchVideos.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isfailed = false;
    },
    [fetchVideos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isfailed = true;
    },
  },
});
export const { setVideo,setWatchTime } = videoSlice.actions;
export default videoSlice.reducer;
