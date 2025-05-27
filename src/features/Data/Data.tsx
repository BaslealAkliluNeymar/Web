
import { Suspense, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import {  fetchVehicles } from "../../store/vehicleSlice"
import { generateUserAsync } from "../../store/authSlice"
import { selectPermission } from "../../utils/selector"
import { Input } from "../../components/ui/input"


export default  function Data() {
  const dispatch = useDispatch<AppDispatch>()
  // const _ = useSelector((state:any) =>state.vehicle.vehicles)
  const [data, _ ] = useState<any[]>([])
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
    
   console.log("Data",data)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return;

    if (file.type !== "text/csv") {
      console.error("Please upload a valid CSV file.");
      return;
    }
    // Papa.parse(file, {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: (results:any) => {
    //     setData(results.data);
    //     console.log(results.data);
    //   },
    // });
  }
  return (
    <div className="container mx-auto py-10">
      {/* <VehicleDialogue perm_dict={perm_dict}/> */}
      <Input type="file" accept=".csv" onChange={handleFileUpload} className="w-1/4"/>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={data || []} perm_dict={perm_dict}/>
      </Suspense>
    </div>
  )
}