import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    activeArticle : 0,
    newsArticles : []
};
export const Alan = createSlice({
    name : 'article',
    initialState ,
    reducers : {
        setActiveArticle : (state , {payload}) => {
            state.activeArticle = payload;
        },
        decrementActiveArticle : (state , {payload}) => {
            state.activeArticle -= payload;
        },
        incrementActiveArticle : (state , {payload}) => {
            state.activeArticle += payload;
        },
        setNewsArticles : (state , {payload}) => {
            state.newsArticles = payload
        }

    }

})

export default Alan.reducer
export const { setActiveArticle , decrementActiveArticle , incrementActiveArticle , setNewsArticles } = Alan.actions
export const selectActiveArticle = state => state.alan.activeArticle
export const selectNewsArticles = state => state.alan.newsArticles