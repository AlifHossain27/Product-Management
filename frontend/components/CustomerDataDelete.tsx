'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

type CustomerProps = {
    id: number,
    name: string
}

const CustomerDataDelete = ({id, name}: CustomerProps) => {
    const router = useRouter();
    const { toast } = useToast()
    const customer_id = id
    const customer_name = name
    const deleteCustomer = async() =>{
        const res = await fetch(`http://localhost:8000/api/customer/${customer_id}`,{
          method: "DELETE",
          credentials: "include"
        })
        if (res.ok){
            toast({
                title: "Customer Deleted",
                description: "Successfully Deleted Customer",
              })
            await router.refresh();
        }else{
            toast({
                variant: "destructive",
                title: `${res.status} oops`,
                description: "Something went wrong. Please Try again",
              })
            await router.refresh();
        }
      }
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='ghost' size='sm'><RiDeleteBin5Line size='20' /></Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you sure you want to delete this customer?</DialogTitle>
        <DialogDescription className="pt-4">
            Customer Name: {customer_name}
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant= "destructive" onClick={() => deleteCustomer()}>Proceed</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default CustomerDataDelete