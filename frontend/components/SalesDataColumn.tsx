"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";

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
        const sales = row.original
        return (
          <div>
          <Button variant='ghost' size='sm' ><LiaEditSolid size='20' /></Button>
          <Button variant='ghost' size='sm' ><RiDeleteBin5Line size='20' /></Button>
          </div>
        )
      },
    },
  ]