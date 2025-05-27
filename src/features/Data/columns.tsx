"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Vehicle } from "../../types"
import { Button } from "../../components/ui/button"
import PrintData  from '../../utils/PrintData'

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "age",
    header: () => <div className="text-base font-semibold text-muted-foreground">Delivery ID</div>,
  },
  {
    accessorKey: "class",
    header: () => <div className="text-base font-semibold text-muted-foreground">Order ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-base font-semibold text-muted-foreground">Health Facility</div>,
  },
  {
    id: "Print",
    header: () => <div className="text-base font-semibold">Print</div>,
    cell:({row}) =>{
      return (
        <Button  onClick={() =>{
          PrintData(row.original)
        }}>
          Print
        </Button>
      )
    }
  },
]