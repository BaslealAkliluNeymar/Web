import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { AppDispatch, RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { addVehicle, fetchVehicles } from "../../store/vehicleSlice"
import { Vehicle } from "../../types"
import { closeDialog } from "../../store/dialogueSlice"


export default  function VehicleDialogue ({ perm_dict }:{
perm_dict: {
  view:boolean
  read:boolean;
  write:boolean;
  delete:boolean;
 }
}) {
    

    console.log(`This is the perm_dict`,perm_dict)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const [formData, setFormData] = useState<Vehicle>({
        vehicle_id: "",
        plate_number: "",
        vehicle_type: "",
        weight_capacity: 0,
        volume_capacity: 0,
        current_status: "active"
    });
    const dialogue = useSelector((state:RootState) => state.dialogue)
    
    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev:Vehicle) => ({ ...prev, [name]: value }));
    },[]);

    const handleSubmit = () => {
        dispatch(addVehicle(formData));
        setOpen(false)
        dispatch(fetchVehicles())
    };


    const handleCancel = () =>{
      setOpen(false)
      dispatch(closeDialog())
    }


    useEffect(() =>{
          if(dialogue.type === 'edit' && dialogue.vehicle){
            setFormData(dialogue.vehicle as Vehicle)
            setOpen(dialogue.isOpen)
          }
          else if(dialogue.type === 'view' && dialogue.vehicle){
            setFormData(dialogue.vehicle as Vehicle)
            setOpen(dialogue.isOpen)
          }
          else{
            setFormData({
              vehicle_id: "",
              plate_number: "",
              vehicle_type: "",
              weight_capacity: 0,
              volume_capacity: 0,
              current_status: "active"
            })
            setOpen(dialogue.isOpen)
          }
        },[dialogue])



  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        dispatch(closeDialog()); 
      }
    }}>
      {
         perm_dict.write && 
          <DialogTrigger>
              <Button variant="outline" className="align-self-center mb-4">
                <Plus />
                  Add Vehicle
              </Button>    
        </DialogTrigger>
      } 
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            { dialogue.type === 'edit' ? 'Edit Vehicle' : dialogue.type === 'view' ? 'View Vehicle' : 'Add Vehicle'}
          </DialogTitle>
          <DialogDescription>{
            dialogue.type === 'edit' ? 'Edit Vehicle Details' : dialogue.type === 'view' ? 'View Vehicle Details' : 'Add New Vehicle'
          }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 grid-cols-2">
          <Input name="plate_number" value={formData.plate_number} onChange={handleChange} placeholder="Plate Number" 
          disabled = {dialogue.type === 'view'}
          />
          <Input name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} placeholder="Vehicle Type" 
          disabled = {dialogue.type === 'view'}
          />
          <Input name="weight_capacity" type="number" value={formData.weight_capacity} onChange={handleChange} placeholder="Weight Capacity" 
          disabled = {dialogue.type === 'view'}
          />
          <Input name="volume_capacity" type="number" value={formData.volume_capacity} onChange={handleChange} placeholder="Volume Capacity" 
          disabled = {dialogue.type === 'view'}
          />
          <Select name="current_status" value={formData.current_status} onValueChange={(value) => setFormData((prev:Vehicle) => ({ ...prev, current_status: value as Vehicle["current_status"] }))} disabled = {dialogue.type === 'view'? true : false}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="flex justify-end space-x-2 py-4">
          <Button onClick={handleCancel} className="border-2 border-accent">Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

