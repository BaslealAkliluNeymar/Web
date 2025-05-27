import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    loading:true,
    pickups:[],
    error:""
}


export const fetchPickups = createAsyncThunk('pickups/fetchPickups', async () => {
    try{
        const pickups = await axios.get('https://web-server-vyw2.onrender.com/api/pickups')
        return pickups
    }
    catch(err){
        return err
    }
})
const pickupSlice = createSlice({
    name:'pickup',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchPickups.pending, (state) =>{
           state.loading = true
           state.pickups = []
        })
        .addCase(fetchPickups.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "An error occurred";
        })
        .addCase(fetchPickups.fulfilled, (state,action:PayloadAction<any>) =>{
            state.loading = false
            state!.pickups = action.payload
        })
    }
})


export default pickupSlice.reducer