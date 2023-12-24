'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addList } from "@/redux/features/product-slice"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'


const formSchema = z.object({
    product_name: z.string().min(2, {
        message: "Product Name Must be of four Characters long.",
      }),
    quantity: z.coerce.number(),
    amount: z.coerce.number(),
})

interface ProductData {
    product_name: string;
    quantity: number;
    amount: number;
}

interface AddProductProps {
    refreshTable: boolean;
    onRefresh: () => void;
}

const AddProduct = ({ refreshTable, onRefresh }: AddProductProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const [dataArray, setDataArray] = useState<ProductData[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_name: '',
            quantity: 0,
            amount: 0
        },
      })
    const appendToJsonArray = (jsonData: ProductData) => {
        setDataArray((prevData) => [...prevData, jsonData]);
    };

    useEffect(() => {
        if (refreshTable) {
          setDataArray([]);
          onRefresh();
        }
      }, [refreshTable, onRefresh]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
            appendToJsonArray(values);
            await form.reset();
    }

    const addProduct = () => {
        dispatch(addList(dataArray))
        console.log('ok');
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='outline' className="rounded-none w-full" > Add Products</Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle className="border-b-2">Products List</DialogTitle>
        </DialogHeader>
        <div>
            <div className="border-2 rounded-sm">
            <ScrollArea className="h-[200px]">
            <table className="w-full text-center">
                <thead className="border-b-2">
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                </thead>
                
                <tbody>
                {dataArray.map((product, index) => (
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
                <h1 className="border-b-2">Add Product</h1>
            <Form {...form}>
            <form className="space-y-8">
            <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-48 text-md pt-4'>Product Name:</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-48 text-md pt-4'>Quantity:</FormLabel>
                <FormControl>
                    <Input type="number" autoComplete='off' placeholder="Quantity" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-48 text-md pt-4'>Amount:</FormLabel>
                <FormControl>
                    <Input type="number" autoComplete='off' placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className='pb-5'>
                <Button className='w-full rounded-[9999px]' onClick={form.handleSubmit(onSubmit)}>Add</Button>
            </div>
            </form>
            </Form>
            </div>
        </div>
        <DialogClose asChild>
          <Button className="w-full" onClick={() => addProduct()} >Proceed</Button>
        </DialogClose>
    </DialogContent>
    </Dialog>
    

  )
}

export default AddProduct