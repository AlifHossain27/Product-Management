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
import { LiaEditSolid } from "react-icons/lia";

type ProductProps = {
    id: number,
    name: string,
    price: number,
    status:  string,
    amount: number,
}

const ProductDataEdit = ({id, name, price, status, amount}: ProductProps) => {
    const product_id = id
    const product_name = name
    const product_price = price
    const product_status = status
    const product_amount = amount
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='ghost' size='sm'><LiaEditSolid size='20' /></Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Product Data ID:</DialogTitle>
        <DialogDescription>
            This is the product ID: {product_id}
            This is the product name: {product_name}
            This is the product  price: {product_price}
            This is the product status: {product_status}
            This is the product amount: {product_amount}
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default ProductDataEdit