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
        <div className="border rounded-sm">
            <ScrollArea className="h-[200px]">
                    <table className="w-full text-center">
                        <thead className="border-b-2">
                        <tr>
                            <th>Serial No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.data.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </ScrollArea>
        </div>
        <div className="pt-5 flex flex-col gap-5">
            <div className="flex-row flex justify-between">
                <h1 className="w-full font-bold">Customer Name:</h1> <h1 className="w-full">{customer_name}</h1>
            </div>
            <div className="flex-row flex justify-between">
                <h1 className="w-full font-bold">Total Amount:</h1> <h1 className="w-full">{totalAmount}</h1>
            </div>
            <div className="flex-row flex justify-between">
                <h1 className="w-full font-bold">Status:</h1> <h1 className="w-full">{pending}</h1>
            </div>
            <div className="flex-row flex justify-between">
                <h1 className="w-full font-bold">Pending Amount:</h1> <h1 className="w-full">{pendingAmount}</h1>
            </div>
        </div>
    </div>
    </DialogContent>
    </Dialog>
  )
}

export default SalesDetails