import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:true,
    pickups:[],
    error:""
}


export const fetchDeliveries = createAsyncThunk('pickups/fetchPickups', async () => {
    try{
        const delivery =await axios.get('https://web-server-vyw2.onrender.com/api/deliveries')
        // return pickups
        console.log(delivery.data)
    }
    catch(err){
        return err
    }
})
const deliverySlice = createSlice({
    name:'delivery',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchDeliveries.pending, (state) =>{
           state.loading = true
           state.pickups = []
        })
        .addCase(fetchDeliveries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "An error occurred";
        })
        .addCase(fetchDeliveries.fulfilled, (state,action:PayloadAction<any>) =>{
            state.loading = false
            state!.pickups = action.payload
        })
    }
})


export default deliverySlice.reducer