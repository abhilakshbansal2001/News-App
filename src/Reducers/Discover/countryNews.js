import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { countryNews} from  "../../api/news";



export const fetchCountryNews = createAsyncThunk('discover/fetchCountryNews', async () => {
    const data = await countryNews()
    // console.log(data , "Data is here")
    if(!Array.isArray(data))throw new Error("Please Try Again")
    return data;
    
})
const initialState = {
  countryNews : [] , 
  status : 'idle' ,
  error : ""
}
export const CountryNewsSlice = createSlice({

    name : 'CountryNews',
    initialState ,
    extraReducers(builder) {
        builder
          .addCase(fetchCountryNews.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchCountryNews.fulfilled, (state, {payload}) => {
            state.status = 'completed'
            // Add any fetched posts to the array
            state.countryNews = state.countryNews.concat(payload)
          })
          .addCase(fetchCountryNews.rejected, (state, {error}) => {
            state.status = 'failed'
            state.error = error.message
          })
      }

})

export default CountryNewsSlice.reducer
export const selectCountryNews = state => state.countryNews.countryNews