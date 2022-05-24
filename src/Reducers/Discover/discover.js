import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {discoverNews} from '../../api/news'


const category = JSON.parse(localStorage.getItem("genre") ) || ["general"];
const lang = JSON.parse(localStorage.getItem("lang")) || ["en"];

export const fetchDiscoverHeadlines = createAsyncThunk('discover/fetchDiscoverHeadlines', async () => {
    const data = await discoverNews("in" , lang , category)
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  discoverHeadlines : [] , 
  status : 'idle' ,
  error : ""
}
export const discoverHeadlineSlice = createSlice({

    name : 'discover',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchDiscoverHeadlines.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchDiscoverHeadlines.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.discoverHeadlines = state.discoverHeadlines.concat(payload)
          })
          .addCase(fetchDiscoverHeadlines.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default discoverHeadlineSlice.reducer
export const selectDiscoverHeadlines = state => state.discover.discoverHeadlines