"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ProductDataEdit from "./ProductDataEdit"
import ProductDataDelete from "./ProductDataDelete";

export type Products = {
  id: number,
  product_name: string,
  price: number,
  status:  "In Stock" | "Stock Out",
  amount: number
}
 
export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          In Stock
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div>
        <ProductDataEdit id = {product.id} name = {product.product_name} price = {product.price} status = {product.status} amount = {product.amount}/>
        <ProductDataDelete id ={product.id} name = {product.product_name} />
        </div>
      )
    },
  },
]