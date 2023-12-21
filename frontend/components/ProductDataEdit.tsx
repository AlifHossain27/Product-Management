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

type ProductProps = {
    id: number,
    name: string,
    price: number,
    status:  string,
    amount: number,
}

const formSchema = z.object({
  product_name: z.string(),
  price: z.coerce.number(),
  inStock: z.string(),
  amount: z.coerce.number().optional(),
})

const ProductDataEdit = ({id, name, price, status, amount}: ProductProps) => {
    const router = useRouter();
    const { toast } = useToast()
    
    const product_id = id
    const default_product_name = name
    const default_product_price = price
    const default_product_status = status
    const default_product_amount = amount

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        product_name: default_product_name,
        price: default_product_price,
        inStock: default_product_status,
        amount: default_product_amount,
      },
    })

    const watch = form.watch("inStock")
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const product_name = values.product_name
      const price = values.price
      const inStock = values.inStock
      const amount = values.amount

      const res = await fetch(`http://localhost:8000/api/product/${product_id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "product_name": product_name,
          "price": price,
          "status": inStock,
          "amount": amount
        })
      });
      if (res.ok){
          toast({
              title: "Product Updated",
              description: "Successfully Updated The Product",
            })
            await router.refresh();
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
        <DialogTitle className="text-3xl">Update Product :</DialogTitle>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Product :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Price :</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <FormField
            control={form.control}
            name="inStock"
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
                    <SelectItem className='rounded-none' value='In Stock'>In Stock</SelectItem>
                    <SelectItem className='rounded-none'value='Stock Out'>Stock Out</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            {watch === 'In Stock' && 
            <FormField
            control={form.control}
            name="amount"
            render={({ field,  }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Amount :</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Amount" {...field} />
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

export default ProductDataEdit