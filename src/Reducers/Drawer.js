import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    drawerState : false
}
export const DrawerSlice = createSlice({
    name : 'drawer',
    initialState ,
    reducers : {
        toggleDrawer : (state , action ) =>  {
            state.drawerState = action.payload
        },
    }

})

export default DrawerSlice.reducer
export const { toggleDrawer }  = DrawerSlice.actions
export const selectDrawerState = state => state.drawer.drawerState