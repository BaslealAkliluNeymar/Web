"use client"
import { ColumnDef } from "@tanstack/react-table"
import ActionComponent from "../../components/ui/ActionComponent"
import { Vehicle } from "../../types"
import { useState } from "react"
import { Button } from "../../components/ui/button"


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
    accessorKey: "status",
    header: () => <div className="text-base font-semibold text-muted-foreground">Status</div>,
    cell: ({ row }) => {
      const status:string = row.getValue("status");
      const [currentStatus, setStatus] = useState(status);
  
      return (
        <div className="flex gap-2">
         
          {currentStatus !== "Approved" && (
            <Button
              onClick={() => setStatus("Approved")}
              variant={'ghost'}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Approve
            </Button>
          )}
          <Button
            onClick={() => alert(`Viewing ${row.original.current_status}`)}
            variant={'secondary'}
          >
            Revise
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-base font-semibold text-muted-foreground">Actions</div>,
    cell: ({ row }) => {
      const vehicle = row.original
      return <ActionComponent vehicle={vehicle} />
    },
  },
]