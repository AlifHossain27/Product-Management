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

type SalesProps = {
    id: number,
    name: string
}

const SalesDataDelete = ({id, name}: SalesProps) => {
    const router = useRouter();
    const { toast } = useToast()
    const sales_id = id
    const sales_name = name
    const deleteSale = async() =>{
        const res = await fetch(`http://localhost:8000/api/product/${sales_id}`,{
          method: "DELETE",
          credentials: "include"
        })
        if (res.ok){
            toast({
                title: "Customer Deleted",
                description: "Successfully Deleted Sale",
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
        <DialogTitle>Are you sure you want to delete this sale?</DialogTitle>
        <DialogDescription className="pt-4">
            Customer Name: {sales_name}
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant= "destructive" onClick={() => deleteSale()}>Proceed</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default SalesDataDelete