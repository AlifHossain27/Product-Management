'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LiaEditSolid } from "react-icons/lia";
import { DialogClose } from "@radix-ui/react-dialog"


interface Product {
  amount: number;
  quantity: number;
  product_name: string;
}

type SalesProps = {
    id: number,
    name: string,
    products:{
      data: Product[];
  };
    total: number,
    status:  string,
    pending: number,
}

const formSchema = z.object({
  customer_name: z.string(),
  totalAmount: z.coerce.number(),
  pending: z.string(),
  pendingAmount: z.coerce.number().optional(),
})

const SalesDataEdit = ({id, name, products, total, status, pending}: SalesProps) => {
    const router = useRouter();
    const { toast } = useToast()
    const sale_id = id
    const default_sale_name = name
    const default_products = products
    const default_sale_total = total
    const default_sale_status = status
    const default_sale_pending = pending

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        customer_name: default_sale_name,
        totalAmount: default_sale_total,
        pending: default_sale_status,
        pendingAmount: default_sale_pending
      },
    })
    const watch = form.watch('pending')

    async function onSubmit(values: z.infer<typeof formSchema>) {
      const customer_name = values.customer_name
      const total = values.totalAmount
      const status = values.pending
      let pending
      if (status === "Settled"){
        pending = 0
      }else{
        pending = values.pendingAmount
      }
      

      const res = await fetch(`http://localhost:8000/api/sale/${sale_id}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "customer_name": customer_name,
          "products": default_products,
          "total": total,
          "status": status,
          "pending": pending
        })
      });
      if (res.ok){
          toast({
              title: "Sale Updated",
              description: "Successfully Updated The Sale",
            })
            await router.refresh()
      }else{
          toast({
              variant: "destructive",
              title: `${res.status} oops`,
              description: "Something went wrong. Please Try again",
            })
      }
  }
  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant='ghost' size='sm'><LiaEditSolid size='20' /></Button>
      </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle className="text-3xl">Update Sale:</DialogTitle>
        </DialogHeader>
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
            {watch === 'Pending' &&
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
            
            <DialogClose asChild>
                <Button type="submit" className='h-12 w-full rounded-[9999px]'>Update</Button>
            </DialogClose>
        </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default SalesDataEdit