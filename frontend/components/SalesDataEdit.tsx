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

type SalesProps = {
    id: number,
    name: string,
    total: number,
    status:  string,
    pending: number,
}

const SalesDataEdit = ({id, name, total, status, pending}: SalesProps) => {
    const sale_id = id
    const sale_name = name
    const sale_total = total
    const sale_status = status
    const sale_pending = pending
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='ghost' size='sm'><LiaEditSolid size='20' /></Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Sale Data ID:</DialogTitle>
        <DialogDescription>
            This is the sale ID: {sale_id}
            This is the sale name: {sale_name}
            This is the sale  total: {sale_total}
            This is the sale status: {sale_status}
            This is the sale pending: {sale_pending}
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default SalesDataEdit