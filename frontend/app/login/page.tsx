'use client'
import React from 'react'
import  {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "..//../components/ui/card"
import { IoPersonSharp } from "react-icons/io5";
import { Button } from '../../components/ui/button';


const LoginPage = () => {
  return (
        <div className='flex-auto flex justify-center py-36'>
        
        <Card className='rounded-sm border-4 h-max w-80'>
        
            <CardHeader>
                <CardTitle className='flex items-center justify-center gap-5 pt-12 text-3xl'>
                    <IoPersonSharp size='40'/>Login
                </CardTitle>
            </CardHeader>
            <CardContent className='pt-12'>
                <input type='text' className='text-left w-full h-12 font-bold border-b-[0.4px] bg-transparent outline-none outline-dashed' placeholder='Username'/>
            </CardContent>
            <CardContent>
                
                <input type='password' className='text-left w-full h-12 font-bold border-b-[0.4px] bg-transparent outline-none outline-dashed' placeholder='Password'/>
            </CardContent>
            <CardFooter className='pt-2 pb-12'>
                <Button className='text-center w-full h-12 text-lg'>Login</Button>
            </CardFooter>
            
        </Card>
        
        </div>
  )
}

export default LoginPage