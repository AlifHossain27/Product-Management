"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import SalesDataEdit from "./SalesDataEdit"
import SalesDataDelete from "./SalesDataDelete"

export type Sales = {
    id: number,
    customer_name: string,
    total: number,
    status:  "Pending" | "Settled",
    pending: number,
    created_at: string
}


export const columns: ColumnDef<Sales>[] = [
    {
      accessorKey: "customer_name",
      header: "Customer",
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "pending",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pending
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const sale = row.original
        return (
          <div>
          <SalesDataEdit id = {sale.id} name = {sale.customer_name} total = {sale.total} status = {sale.status} pending = {sale.pending}/>
          <SalesDataDelete id = {sale.id} name = {sale.customer_name}/>
          </div>
        )
      },
    },
  ]