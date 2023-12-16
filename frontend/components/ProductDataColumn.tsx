"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";

export type Products = {
  id: number,
  product_name: string,
  price: number,
  status:  "In Stock" | "Stock Out",
  amount: number
}

const deleteProduct = async(product:any) =>{
  const id = product.id
  const res = await fetch(`http://localhost:8000/api/product/${id}`,{
    method: "DELETE",
    credentials: "include"
  })
  window.location.reload()
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
        <Button variant='ghost' size='sm' ><LiaEditSolid size='20' /></Button>
        <Button variant='ghost' size='sm' onClick={() => deleteProduct(product)}><RiDeleteBin5Line size='20' /></Button>
        </div>
      )
    },
  },
]