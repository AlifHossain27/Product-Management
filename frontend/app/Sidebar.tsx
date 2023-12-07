'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button } from '../components/ui/button';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa"
import { BsPeopleFill } from "react-icons/bs"
import { TbMoneybag } from "react-icons/tb";
import { LuLogIn } from "react-icons/lu";
import { useToast } from "../components/ui/use-toast"


const Sidebar = () => {
    const menus = [
        { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
        { name: "Products", link: "/products", icon: FaList },
        { name: "Customers", link: "/customers", icon: BsPeopleFill },
        { name: "Sales", link: "/sales", icon: TbMoneybag },
        
      ];

    const [open, setOpen] =useState(true);


    const [auth, setAuth] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    let logoutBtn

    const logout = async() => {
      await fetch('http://localhost:8000/api/logout/',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include'
      })
      await router.push('/')
      toast({
        title: `Bye Bye`,
        description: "Hope we will meet again !!",
      })
      router.refresh()
    }

    useEffect(() => {
      (
        async () => {
          try {
          const resp = await fetch('http://localhost:8000/api/me/',{
            credentials: 'include'
          })
          if (resp.ok){
            setAuth(true)
          }else{
            setAuth(false)
          }
        } catch(e){
          console.log('connection failed')
        }
        }
      )()
    })
    

    if (auth === true){
      logoutBtn = (
        <div className='flex flex-col fixed bottom-1 '>
                  <Link href='#' className="group flex items-center p-1">
                    <Button variant='ghost' className={`${open ? 'w-72':'w-16'} text-2xl gap-3.5 justify-start rounded-none h-20`} onClick={logout}>
                    
                      <LuLogIn size="25"/>
                      <h2
                        className={
                        `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 hidden overflow-hidden"}`
                        }
                      >Logout</h2>
                    </Button>
                    </Link>
        </div>
      )
    }else {
      logoutBtn = (
        <div className='flex flex-col fixed bottom-1 '>
                    <Link href='/login' className="group flex items-center p-1">
                    <Button variant='ghost' className={`${open ? 'w-72':'w-16'} text-2xl gap-3.5 justify-start rounded-none h-20`}>
                      <LuLogIn size="25"/>
                      <h2
                        className={
                        `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 hidden overflow-hidden"}`
                        }
                      >Login</h2>
                    </Button>
                    </Link>
        </div>
      )
    }

  return (
    <div className="border-r-2 border-secondary">
        <div className={`min-h-screen ${open ? 'w-72':'w-16'} duration-500`}>
            <div className='py-5 px-5 flex justify-end'>
                <HiMenuAlt3 
                size='34'  
                onClick={()=>setOpen(!open)}/>
            </div>
            <div className="flex flex-col relative">
                    {menus?.map((menu, i) => (
                      <Link href={menu?.link} key={i} className="group flex items-center  p-1">
                      <Button variant= 'ghost' className={`${open ? 'w-72':'w-16'} text-2xl gap-3.5 justify-start rounded-none h-20`}>
                      <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                      <h2 
                      className={
                          `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 hidden overflow-hidden"}`
                          }>
                    {menu?.name}
                    </h2>
                    </Button>
                    </Link>
                      ))}
                
                { logoutBtn }
                </div>  
            </div>
            
    </div>

  )
}

export default Sidebar