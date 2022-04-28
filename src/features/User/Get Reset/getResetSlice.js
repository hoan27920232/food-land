import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { getReset } from 'api/userApi.js'


export const getResetThunk = createAsyncThunk('/khachhangs/getReset', async(params, thunkAPI) => {
    const getResetAuth = await getReset(params)
    return getResetAuth
})



const getResetSlice = createSlice({
    name: 'getReset',
    initialState: {
        user: null,
        loading: false,
        success: false
    },
    reducers: {

        setToken: (state,action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        }
    },
    extraReducers:{
        [getResetThunk.pending]: (state,action) => {
            state.loading = true
        },
        [getResetThunk.fulfilled]: (state,action) => {
            
        },
        [getResetThunk.rejected]: (state,action) => {
            state.loading = false 
            console.log('Reject')
            state.success = false
        },
    }
})

const { reducer, actions } = getResetSlice
// export const { logout, loginSucces,setToken } = actions
export default reducer