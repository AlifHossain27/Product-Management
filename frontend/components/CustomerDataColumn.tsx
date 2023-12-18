"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import CustomerDataEdit from "./CustomerDataEdit";
import CustomerDataDelete from "./CustomerDataDelete";


export type Customers = {
    id: number,
    customer_name: string,
    email: string,
    phone:  number,
    address: string,
}

export const columns: ColumnDef<Customers>[] = [
    {
        accessorKey: "customer_name",
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
          const customer = row.original
          return (
            <div>
            <CustomerDataEdit id = {customer.id} name ={customer.customer_name} email = {customer.email} phone = {customer.phone} address = {customer.address}/>
            <CustomerDataDelete id = {customer.id} name = {customer.customer_name}/>
            </div>
          )
        },
    },
]