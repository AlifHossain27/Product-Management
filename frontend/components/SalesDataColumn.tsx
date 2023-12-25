"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import SalesDataEdit from "./SalesDataEdit"
import SalesDataDelete from "./SalesDataDelete"
import SalesDetails from "./SalesDetails"


interface Product {
  amount: number;
  quantity: number;
  product_name: string;
}
export type Sales = {
    id: number,
    created_at: string
    customer_name: string,
    products: {
      data: Product[];
  },
    total: number,
    status:  "Pending" | "Settled",
    pending: number
}


export const columns: ColumnDef<Sales>[] = [
    {
      accessorKey: "created_at",
      header: "Date",
    },
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
      accessorKey: "Details",
      cell: ({ row }) => {
        const detail = row.original
        return (
          <div>
            <SalesDetails id= {detail.id} name= {detail.customer_name} products= {detail.products} total= {detail.total} status= {detail.status} amount= {detail.pending}/>
          </div>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const sale = row.original
        return (
          <div>
          <SalesDataEdit id = {sale.id} name = {sale.customer_name} products = {sale.products} total = {sale.total} status = {sale.status} pending = {sale.pending}/>
          <SalesDataDelete id = {sale.id} name = {sale.customer_name}/>
          </div>
        )
      },
    },
  ]