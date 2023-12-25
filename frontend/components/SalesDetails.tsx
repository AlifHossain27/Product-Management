'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TbViewportWide } from "react-icons/tb";
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
    amount: number;
    quantity: number;
    product_name: string;
}

type DetailProps = {
    id: number,
    name: string,
    products: {
        data: Product[];
    };
    total: number,
    status:  string,
    amount: number,
}

const SalesDetails = ({ id, name, products, total, status, amount}: DetailProps) => {
    const customer_name = name
    const totalAmount = total
    const pending = status
    const pendingAmount = amount
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button variant = "ghost">
            <TbViewportWide size="20" />
        </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle className="border-b-2">Sale Details: </DialogTitle>
        </DialogHeader>
    
    <div>
        <div className="border-2 rounded-sm">
            <ScrollArea className="h-[100px]">
                    <table className="w-full text-center">
                        <thead className="border-b-2">
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.data.map((product, index) => (
                            <tr key={index}>
                            <td>{product.product_name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </ScrollArea>
        </div>
        <div className="pt-5">
        <h1>Customer Name: {customer_name}</h1>
        <h1>Total Amount: {totalAmount}</h1>
        <h1>Status: {pending}</h1>
        <h1>Pending Amount: {pendingAmount}</h1>
        </div>
    </div>
    </DialogContent>
    </Dialog>
  )
}

export default SalesDetails