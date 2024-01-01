'use client'
import React from 'react'
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
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'

const formSchema = z.object({
    customer_name: z.string(),
    email: z.string().optional(),
    phone: z.string(),
    address: z.string().optional()
})

const CustomersDataForm = () => {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customer_name: '',
          email: '',
          phone: '',
          address: ''
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const customer_name = values.customer_name
        const email = values.email
        const phone = values.phone
        const address = values.address

        const res = await fetch('http://localhost:8000/api/customer/',{
        method: 'POST',
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
                title: "New Customer Added",
                description: "Successfully added a new Customer",
              })
            await form.reset();
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
    <Card className='col-span-1 pt-5 h-max w-auto border-2'>
        <CardHeader>
            <CardTitle className='pt-5 text-3xl'>Add Customer</CardTitle>
            
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
            
            <div className='pb-10'>
                <Button type="submit" className='h-12 w-full rounded-[9999px]'>Submit</Button>
            </div>
        </form>
        </Form>
        </CardContent>
        </Card>
  )
}

export default CustomersDataForm