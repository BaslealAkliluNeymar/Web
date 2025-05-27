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
import { useEffect, useState } from "react"
import { AppDispatch } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { addVehicle, fetchVehicles } from "../../store/vehicleSlice"
import { Vehicle } from "../../types"
import { closeDialog } from "../../store/dialogueSlice"


export default  function VehicleDialogue () {
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
    const dialogue = useSelector((state:any) => state.dialogue)

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({ ...prev, [name]: value }));
    };

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
      if(dialogue.type === 'edit'){
        setFormData(dialogue.vehicle)
        setOpen(dialogue.isOpen)
      }
      else if(dialogue.type === 'view'){
        setFormData(dialogue.vehicle)
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
      <DialogTrigger>
        <Button variant="outline" className="align-self-center mb-4">
          <Plus />
            Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogDescription>Add the Details of the New Vehicle.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 grid-cols-2">
          <Input name="plate_number" value={formData.plate_number} onChange={handleChange} placeholder="Plate Number" 
          disabled = {dialogue.type === 'view'? true : false}
          />
          <Input name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} placeholder="Vehicle Type" 
          disabled = {dialogue.type === 'view'? true : false}
          />
          <Input name="weight_capacity" type="number" value={formData.weight_capacity} onChange={handleChange} placeholder="Weight Capacity" 
          disabled = {dialogue.type === 'view'? true : false}
          />
          <Input name="volume_capacity" type="number" value={formData.volume_capacity} onChange={handleChange} placeholder="Volume Capacity" 
          disabled = {dialogue.type === 'view'? true : false}
          />
          <Input name="current_status" value={formData.current_status} onChange={handleChange} placeholder="Status (active/inactive/maintenance)" 
          disabled = {dialogue.type === 'view'? true : false}
          />
            <Select>
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
       
          
        <Button onClick={handleSubmit}>Save Changes</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogContent>
    </Dialog>
  )
}

