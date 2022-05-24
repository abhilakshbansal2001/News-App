import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    article : {}
};
export const ArticleSlice = createSlice({
    name : 'article',
    initialState ,
    reducers : {
        addArticle : (state , {payload}) => {
            state.article = payload;
        },

    }

})

export default ArticleSlice.reducer
export const { addArticle } = ArticleSlice.actions
export const selectArticle = state => state.article.article