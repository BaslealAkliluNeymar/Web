"use server"
import { Suspense, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import {  fetchVehicles } from "../../store/vehicleSlice"
import VehicleDialogue from "./VehicleDialogue"
import { generateUserAsync } from "../../store/authSlice"
import { selectPermission } from "../../utils/selector"
import { SonnerDemo } from "../../components/SonnerDemo"
import { toast } from "sonner"


export default  function Pickup() {
  const dispatch = useDispatch<AppDispatch>()
  const final = useSelector((state:any) =>state.vehicle.vehicles)
  
  const view = selectPermission('vehicle','view')
  const update = selectPermission('vehicle','update')
  const read = selectPermission('vehicle','read')
  const write = selectPermission('vehicle','write')
  const delete_ = selectPermission('vehicle','delete')
  
  const perm_dict = {
    read,
    write,
    update,
    delete:delete_,
    view
  }

  useEffect(() =>{
    dispatch(generateUserAsync())
    dispatch(fetchVehicles())
    
  },[dispatch])
    
    
  return (
    <div className="container mx-auto py-10">
      <VehicleDialogue perm_dict={perm_dict}/>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={final || []} perm_dict={perm_dict}/>
      </Suspense>
    </div>
  )
}