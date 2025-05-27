import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vehicle, VehicleState } from "../types";
import axios from "axios";


const initialState:VehicleState ={
    selectedVehicle:null,
    loading:false,
    vehicles:[],
    error:null,
    success:false,
}

export const fetchVehicles  = createAsyncThunk(
    'vehicle/fetchVehicles',
    async () =>{
        try{
            const token = localStorage.getItem('token')
            const response = await axios.get('https://web-server-vyw2.onrender.com/api/vehicles', {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Basic ${token}`
                }
                // query:{
                //     page:pageNumber
                // }
            })
            return response.data
        }
        catch(err:Error | any){
            return err.message || 'An unknown error occurred'
        }
    }
)


export const addVehicle = createAsyncThunk(
    'vehicle/addVehicle',
    async(Vehicle:Vehicle) =>{
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post('https://web-server-vyw2.onrender.com/api/vehicles', Vehicle, {
                headers:{ 
                    'Content-Type': 'application/json',
                    Authorization:`Basic ${token}`
                }
            })
            if(response.status !== 201){
                throw new Error('Failed to add Vehicle')
            }
            return response.data
        }catch(err){
            return (err instanceof Error) ? err.message : 'An unknown error occurred'
        }
        
    }
 )

export const editVehicle  = createAsyncThunk(
    'vehicle/editVehicle',
    async (Vehicle:Vehicle) =>{
       const token = localStorage.getItem('token')
       const response = await axios.put('https://web-server-vyw2.onrender.com/api/vehicles', Vehicle, {
        headers:{   
            'Content-Type': 'application/json',
            'Authorization':`Basic ${token}`
        }
       })
       return response.data
    }
)

export const deleteVehicle  = createAsyncThunk(
    'vehicle/deleteVehicle',
    async (Vehicle:Vehicle) =>{
       const response = await axios.delete('https://web-server-vyw2.onrender.com/api/vehicles', {
         params:Vehicle.vehicle_id
       })
       return response.data
    }
)
const vehicleSlice = createSlice({
    name:"vehicle",
    initialState,
    reducers:{
        setSelectedVehicle:(state, action)=>{
            state.selectedVehicle = action.payload
        }
    },
    extraReducers:((builder) =>{
        builder
        .addCase(fetchVehicles.rejected,(state, action)=>{
            state.loading = false,
            state.error = action.error.message || "Unable to fetch Vehicles"
        })
        .addCase(fetchVehicles.pending,(state) =>{
            state.loading = true
            state.vehicles = []
        })
        .addCase(fetchVehicles.fulfilled,(state, action) =>{
            state.loading = false
            state.vehicles = action.payload
            state.success = true
        })
        .addCase(editVehicle.fulfilled,(state, action)=>{
            state.loading =false
            state.vehicles = state.vehicles.map((vehicles =>{
                if(vehicles.vehicle_id === action.payload.vehicle_id){
                    return action.payload
                }
                return vehicles
            }))
        })
        .addCase(editVehicle.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(editVehicle.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message || "Unable to Edit Vehicle"
        })
        .addCase(addVehicle.pending, (state) =>{
            state.loading = true
            state.error = null
            state.success = false
        })
        .addCase(addVehicle.fulfilled,(state, action) =>{
            state.loading = false
            state.vehicles.push(action.payload)
            state.success = true
        })
        .addCase(addVehicle.rejected,(state,action) =>{
            state.loading = false
            state.error = action.error.message || 'Unable to Register Vehicle'
            state.success = false
        })
        .addCase(deleteVehicle.rejected,(state, action)=>{
            state.loading = false,
            state.error = action.error.message || "Unable to Delete Vehicle"
        })
        
        .addCase(deleteVehicle.fulfilled,(state, action) =>{
            state.loading = false
            state.vehicles = state.vehicles.filter(((vehicles) => vehicles.vehicle_id !== action.payload.vehicle_id))
            state.success = true
        })
       
    })
})


export const { setSelectedVehicle } = vehicleSlice.actions
export default vehicleSlice.reducer