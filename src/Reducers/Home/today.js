import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {topHeadline} from '../../api/news'

export const fetchTodayHeadlines = createAsyncThunk('today/fetchTodayHeadlines', async () => {
    const data = await topHeadline();
    console.log(data ,  " : data")
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  todayHeadlines : [] , 
  status : 'idle' ,
  error : ""
}
export const TodayHeadlineSlice = createSlice({
    name : 'today',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchTodayHeadlines.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchTodayHeadlines.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.todayHeadlines = state.todayHeadlines.concat(payload)
          })
          .addCase(fetchTodayHeadlines.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default TodayHeadlineSlice.reducer
export const selectTodayHeadlines = state => state.today.todayHeadlines