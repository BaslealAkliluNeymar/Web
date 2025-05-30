import { EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Button } from "./button"
import { openDialog } from "../../store/dialogueSlice"
import { AppDispatch } from "../../store/store"
import { useDispatch } from "react-redux"
import { Vehicle } from "../../types"
import { selectPermission } from "../../utils/selector"



const ActionComponent =({ vehicle } :{ vehicle:Vehicle }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleEdit = (type:string) =>{
      dispatch(openDialog({type, vehicle}))
  }

  const write = selectPermission('vehicle','write')
  const view = selectPermission('vehicle','view')
  const update = selectPermission('vehicle','update')
  const delete_ = selectPermission('vehicle','delete')
  
  const handleView = (type:string) =>{
    dispatch(openDialog({type, vehicle}))
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-center font-bold flex items-center justify-center">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          (update || write) &&(
            <DropdownMenuItem onClick={() => handleEdit('edit')}>Edit</DropdownMenuItem> 

          )
        }
        {/* <DropdownMenuSeparator /> */}
        {
          view && 
          <DropdownMenuItem onClick={() => handleView('view')}>View</DropdownMenuItem>
          }
        {
          delete_ && 
          (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </>
            
          )
        }
      </DropdownMenuContent>
  </DropdownMenu>
   
  )
}

export default ActionComponent