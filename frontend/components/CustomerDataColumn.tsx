"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";


export type Customers = {
    customerName: string,
    email: string,
    phone:  number,
    address: string,
}

export const columns: ColumnDef<Customers>[] = [
    {
        accessorKey: "customerName",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Customer
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const products = row.original
          return (
            <div>
            <Button variant='ghost' size='sm' ><LiaEditSolid size='20' /></Button>
            <Button variant='ghost' size='sm' ><RiDeleteBin5Line size='20' /></Button>
            </div>
          )
        },
    },
]