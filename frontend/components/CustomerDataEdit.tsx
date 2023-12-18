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

type CustomerProps = {
    id: number,
    name: string,
    email: string,
    phone:  number,
    address: string,
}

const CustomerDataEdit = ({id, name, email, phone, address}: CustomerProps) => {
    const customer_id = id
    const customer_name = name
    const customer_email = email
    const customer_phone = phone
    const customer_address = address
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='ghost' size='sm'><LiaEditSolid size='20' /></Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Customer Data ID:</DialogTitle>
        <DialogDescription>
            This is the customer ID: {customer_id}
            This is the customer name: {customer_name}
            This is the customer  email: {customer_email}
            This is the customer phone: {customer_phone}
            This is the customer address: {customer_address}
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default CustomerDataEdit