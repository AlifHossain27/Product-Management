'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { DialogClose } from "@radix-ui/react-dialog"

type ProductProps = {
    id: number,
    name: string
}

const ProductDataDelete = ({id, name}: ProductProps) => {
    const router = useRouter();
    const { toast } = useToast()
    const product_id = id
    const product_name = name
    const deleteProduct = async() =>{
        const res = await fetch(`http://localhost:8000/api/product/${product_id}`,{
          method: "DELETE",
          credentials: "include"
        })
        if (res.ok){
            toast({
                title: "Customer Deleted",
                description: "Successfully Deleted Product",
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
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogDescription className="pt-4">
            Product Name: {product_name}
        </DialogDescription>
        </DialogHeader>
        <DialogClose>
          <Button variant= "destructive" className="w-full" onClick={() => deleteProduct()}>Proceed</Button>
        </DialogClose>
    </DialogContent>
    </Dialog>
  )
}

export default ProductDataDelete