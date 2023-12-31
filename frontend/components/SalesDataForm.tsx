'use client'
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import * as z from "zod"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import AddProduct from './AddProduct'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { resetList } from "@/redux/features/product-slice"
import { useAppSelector } from '@/redux/store';

const formSchema = z.object({
    customer_name: z.string(),
    totalAmount: z.coerce.number(),
    pending: z.enum(['Pending','Settled']),
    pendingAmount: z.coerce.number().optional(),
})


const SalesDataForm = () => {
    const productList = useAppSelector((state) => state.productsReducer.value.productList)
    const dispatch = useDispatch<AppDispatch>()
    const [refreshTable, setRefreshTable] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customer_name: '',
          totalAmount: 0,
          pending: 'Settled',
          pendingAmount: 0
        },
      })
    
    const status = form.watch('pending')
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const customer_name = values.customer_name
        const total = values.totalAmount
        const status = values.pending
        let pending
        if (status === "Settled"){
            pending = 0
        } else {
            pending = values.pendingAmount
        }
        

        const res = await fetch("http://localhost:8000/api/sale/",{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            "customer_name": customer_name,
            "products": {
                "data": productList
            },
            "total": total,
            "status": status,
            "pending": pending
          })
        });
        if (res.ok){
            console.log(productList)
            toast({
                title: "New Sale Added",
                description: "Successfully added a new Sale",
              })
              await router.refresh()
              await form.reset();
              dispatch(resetList())
              setRefreshTable(true);
        }else{
            toast({
                variant: "destructive",
                title: `${res.status} oops`,
                description: "Something went wrong. Please Try again",
              })
        }
    }

  return (
    <Card className='col-span-1 pt-5 h-max w-auto border-2 '>
        <CardHeader>
            <CardTitle className='pt-5 text-3xl'>Add Sale</CardTitle>
            
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Customer:</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Customer Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className='flex pt-5 gap-5 text-lg font-medium'>
                <h1 className='pt-2'>Products: </h1> <AddProduct refreshTable={refreshTable} onRefresh={() => setRefreshTable(false)}/>
            </div>


            <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Amount :</FormLabel>
                <FormControl>
                    <Input type="number" autoComplete='off' placeholder="Total Amount" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="pending"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Status :</FormLabel>
                <Select onValueChange={field.onChange}>
                <FormControl>
                <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                </FormControl>
                <SelectContent className='rounded-none'>
                    <SelectItem className='rounded-none' value="Pending">Pending</SelectItem>
                    <SelectItem className='rounded-none' value="Settled">Settled</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            {status === 'Pending' &&
            <FormField
            control={form.control}
            name="pendingAmount"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Pending :</FormLabel>
                <FormControl>
                    <Input type='number' autoComplete='off' placeholder="Pending Amount" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            }
            
            <div className='pb-10'>
                <Button type="submit" className='h-12 w-full rounded-[9999px]'>Submit</Button>
            </div>
        </form>
        </Form>
        </CardContent>
        </Card>
  )
}

export default SalesDataForm