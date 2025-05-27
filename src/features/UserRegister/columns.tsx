"use client"
import { ColumnDef } from "@tanstack/react-table"
import ActionComponent from "../../components/ui/ActionComponent"
import { Vehicle } from "../../types"
import { Badge } from "../../components/ui/badge"


export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "plate_number",
    header: () =><div className="text-2xl">Plate Number</div>,
  },
  {
    accessorKey: "vehicle_type",
    header: () =><div className="text-2xl">Vehicle Type</div>,
  },
  {
    accessorKey: "weight_capacity",
    header: () => <div className="text-2xl">Weight</div>,
  },
  {
    accessorKey: "current_status",
    header: () => <div className="text-2xl">Status</div>,
    cell:({row}) =>{
      const status = row.getValue('current_status')
      if(status === "active"){
        return <Badge>Active</Badge>
      }
      else if(status === "inactive"){
        return <Badge  variant="destructive">Inactive</Badge>
      }
      else if(status === "maintenance"){
        return <Badge variant="secondary">Maintenance</Badge>
      }
    }
  },
  {
    accessorKey:"Action",
    header: () => <div className="text-2xl">Plate Number</div>,
    cell:({row}) =>{
      const vehicle = row.original
      return <ActionComponent vehicle={vehicle} />
    }
  }
]


