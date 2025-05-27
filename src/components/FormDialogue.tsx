// components/FormDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
  import { Button } from "../components/ui/button"
  import { ReactNode, useEffect, useState } from "react"
  
  interface FormDialogProps<T> {
    title: string
    description: string
    initialValues: T
    open: boolean
    setOpen: (open: boolean) => void
    onSubmit: (data: T) => void
    onCancel?: () => void
    children: (formData: T, handleChange: (e: any) => void) => ReactNode
  }
  
  export function FormDialog<T>({
    title,
    description,
    initialValues,
    open,
    setOpen,
    onSubmit,
    onCancel,
    children
  }: FormDialogProps<T>) {
    const [formData, setFormData] = useState<T>(initialValues)
  
    useEffect(() => {
      setFormData(initialValues)
    }, [initialValues])
  
    const handleChange = (e: any) => {
      const { name, value } = e.target
      setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = () => {
      onSubmit(formData)
      setOpen(false)
    }
  
    const handleDialogClose = () => {
      setOpen(false)
      onCancel?.()
    }
  
    return (
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) onCancel?.()
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
  
          <div className="grid gap-4 py-4 grid-cols-2">
            {children(formData, handleChange)}
          </div>
  
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogContent>
      </Dialog>
    )
  }
  