import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
// import {discoverNews} from '../../api/news'
import {Sources} from  "../../api/source";


const category = JSON.parse(localStorage.getItem("genre") ) || ["general"];
const lang = JSON.parse(localStorage.getItem("lang")) || ["en"];

export const fetchSource = createAsyncThunk('discover/fetchSource', async () => {
    const data = await Sources()
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  source : [] , 
  status : 'idle' ,
  error : ""
}
export const Sourcelice = createSlice({

    name : 'source',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchSource.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchSource.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.source = state.source.concat(payload)
          })
          .addCase(fetchSource.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default Sourcelice.reducer
export const selectSource = state => state.sources.source