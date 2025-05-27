import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Delivery Personnel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Aynalem">Aynalem</SelectItem>
          <SelectItem value="Mengistu">Mengistu</SelectItem>
          <SelectItem value="Abebe">Abebe</SelectItem>
          <SelectItem value="Almaz">Almaz</SelectItem>
          <SelectItem value="Abel">Abel</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
