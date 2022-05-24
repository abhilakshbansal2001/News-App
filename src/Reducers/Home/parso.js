import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {pastHeadline} from '../../api/news'
import dateFormat from "dateformat";
import {getYesterdayBeforeDate , getYesterdaysDate} from '../../utilities/Dates'


const parsoTo = dateFormat(getYesterdaysDate(), "isoDateTime").split("T")[0]
const parsoFrom = dateFormat(getYesterdayBeforeDate(), "isoDateTime").split("T")[0]

export const fetchParsoHeadlines = createAsyncThunk('parso/fetchParsoHeadlines', async () => {
    const data = await pastHeadline(parsoFrom,parsoTo,10 , "india" , "parso");
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  parsoHeadlines : [] , 
  status : 'idle' ,
  error : ""
}
export const ParsoHeadlineSlice = createSlice({
    name : 'parso',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchParsoHeadlines.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchParsoHeadlines.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.parsoHeadlines = state.parsoHeadlines.concat(payload)
          })
          .addCase(fetchParsoHeadlines.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default ParsoHeadlineSlice.reducer
export const selectParsoHeadlines = state => state.parso.parsoHeadlines