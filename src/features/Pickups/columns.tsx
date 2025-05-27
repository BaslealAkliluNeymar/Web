"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Vehicle } from "../../types"
import { Badge } from "../../components/ui/badge"
import Items from "../../components/Items"


export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "plate_number",
    header: () => <div className="text-base font-semibold text-muted-foreground">Plate Number</div>,
  },
  {
    accessorKey: "vehicle_type",
    header: () => <div className="text-base font-semibold text-muted-foreground">Vehicle Type</div>,
  },
  {
    accessorKey: "weight_capacity",
    header: () => <div className="text-base font-semibold text-muted-foreground">Weight (kg)</div>,
  },
  {
    accessorKey: "current_status",
    header: () => <div className="text-base font-semibold text-muted-foreground">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("current_status") as string

      switch (status) {
        case "active":
          return <Badge className="bg-green-600 hover:bg-green-600">Active</Badge>
        case "inactive":
          return <Badge className="bg-red-600 hover:bg-red-600">Inactive</Badge>
        case "maintenance":
          return <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">Maintenance</Badge>
        default:
          return <Badge variant="outline">Unknown</Badge>
      }
    },
  },
  {
    id: "actions",
    header: () => <div className="text-base font-semibold text-muted-foreground">Actions</div>,
    cell: () => {
      return <Items />
    },
  },
]