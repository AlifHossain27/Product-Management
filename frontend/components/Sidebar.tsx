'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa"
import { BsPeopleFill } from "react-icons/bs"
import { TbMoneybag } from "react-icons/tb";
import { LuLogIn } from "react-icons/lu";

const Sidebar = () => {
    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "Products", link: "/", icon: FaList },
        { name: "Customers", link: "/", icon: BsPeopleFill },
        { name: "Sales", link: "/", icon: TbMoneybag },
        
      ];

      const [open, setOpen] =useState(true);
  return (
    <div className="border-r-2 border-secondary">
        <div className={`h-screen ${open ? 'w-72':'w-16'} duration-500`}>
            <div className='py-5 px-5 flex justify-end'>
                <HiMenuAlt3 
                size='34' c
                lassName='cursor-pointer' 
                onClick={()=>setOpen(!open)}/>
            </div>
            <div className="flex flex-col ">
                    {menus?.map((menu, i) => (
                    <Button variant='ghost' className='w-full justify-start rounded-none h-20'>
                    <Link href={menu?.link} key={i} className="group flex items-center text-2xl gap-3.5 p-1 relative">
                    <div>{React.createElement(menu.icon, { size: "25" })}</div>
                    <h2 
                    style={{
                        transitionDelay: `${i + 2}00ms`,
                      }}
                    className={
                        `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`
                        }>
                    {menu?.name}</h2>
                    </Link>
                    </Button>
                    ))}

            </div>
                <div className='flex flex-col fixed bottom-1 '>
                    <Button variant='ghost' className={`${open ? 'w-72':'w-16'} justify-start rounded-none h-20`}>
                    <Link href='/' className="group flex items-center text-2xl gap-3.5 p-1 relative">
                      <LuLogIn size="25"/>
                      <h2
                        className={
                        `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`
                        }
                      >Login</h2>
                    </Link>
                    </Button>
                  </div>

        </div>
    </div>

  )
}

export default Sidebar