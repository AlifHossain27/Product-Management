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
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LiaEditSolid } from "react-icons/lia";
import { DialogClose } from "@radix-ui/react-dialog"

type CustomerProps = {
    id: number,
    name: string,
    email: string,
    phone:  number,
    address: string,
}

const formSchema = z.object({
  customer_name: z.string(),
  email: z.string().optional(),
  phone: z.coerce.number(),
  address: z.string().optional()
})

const CustomerDataEdit = ({id, name, email, phone, address}: CustomerProps) => {

    const router = useRouter()
    const { toast } = useToast()

    const customer_id = id
    const default_customer_name = name
    const default_customer_email = email
    const default_customer_phone = phone
    const default_customer_address = address

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        customer_name: default_customer_name,
        email: default_customer_email,
        phone: default_customer_phone,
        address: default_customer_address
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      const customer_name = values.customer_name
      const email = values.email
      const phone = values.phone
      const address = values.address
      const res = await fetch(`http://localhost:8000/api/customer/${customer_id}`,{
        method: 'PUT',
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            "customer_name": customer_name,
            "email": email,
            "phone": phone,
            "address": address
        })
        });
        if (res.ok){
          toast({
              title: "Customer Updated",
              description: "Successfully Updated The Customer",
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
        <DialogTitle className="text-3xl">Update Customer :</DialogTitle>
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
                    <Input autoComplete='off' placeholder="Customer" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Email :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Phone :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Address :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <DialogClose asChild>
                <Button type="submit" className='h-12 w-full rounded-[9999px]'>Update</Button>
            </DialogClose>
        </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default CustomerDataEdit