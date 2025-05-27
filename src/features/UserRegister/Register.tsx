
import { useEffect } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import {  fetchVehicles } from "../../store/vehicleSlice"
import VehicleDialogue from "./VehicleDialogue"



export default  function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const final = useSelector((state:any) =>state.vehicle.vehicles)

  useEffect(() =>{
    dispatch(fetchVehicles())
  },[dispatch])
  
  return (
    <div className="container mx-auto py-10">
      <VehicleDialogue />
      <DataTable columns={columns} data={final || []} />
    </div>
  )
}