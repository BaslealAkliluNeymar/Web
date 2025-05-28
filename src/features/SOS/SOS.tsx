
import { Suspense, useEffect } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import {  useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import {  fetchVehicles } from "../../store/vehicleSlice"
import VehicleDialogue from "./VehicleDialogue"
import { generateUserAsync } from "../../store/authSlice"
import { selectPermission } from "../../utils/selector"



export default  function Vehicle() {
  const dispatch = useDispatch<AppDispatch>()
  // const _ = useSelector((state:any) =>state.vehicle.vehicles)
  

  const data:any = [
    {
    vehicle_id: "veh_001",
    plate_number: "ABC-1234",
    vehicle_type: "Truck",
    weight_capacity: 8000,
    volume_capacity: 40,
    current_status: "active",
    createed_at: "2025-01-10T08:30:00Z",
    updated_at: "2025-04-25T10:45:00Z"
  }
  ]
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
        <DataTable columns={columns} data={data || []} perm_dict={perm_dict}/>
      </Suspense>
    </div>
  )
}