import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {pastHeadline} from '../../api/news'
import dateFormat from "dateformat";
import { getYesterdaysDate} from '../../utilities/Dates'



const yestTo = dateFormat(new Date(), "isoDateTime").split("T")[0]
const yestFrom = dateFormat(getYesterdaysDate(), "isoDateTime").split("T")[0]

export const fetchYesterdayHeadlines = createAsyncThunk('yesterday/fetchYesterdayHeadlines', async () => {
    const data = await pastHeadline(yestFrom,yestTo,10 , "india" , "yesterday");
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  yesterdayHeadlines : [] , 
  status : 'idle' ,
  error : ""
}
export const YesterdayHeadlineSlice = createSlice({
    name : 'yesterday',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchYesterdayHeadlines.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchYesterdayHeadlines.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.yesterdayHeadlines = state.yesterdayHeadlines.concat(payload)
          })
          .addCase(fetchYesterdayHeadlines.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default YesterdayHeadlineSlice.reducer
export const selectYesterdayHeadlines = state => state.yesterday.yesterdayHeadlines