'use client'

import { Tracker } from "../../components/custom/tracker";
import { useEffect, useState } from "react";

import Navbar from "@/components/custom/Navbar";

function Dashboard() {

    const date = new Date().toLocaleDateString()
    const [name, setName] = useState('')

    useEffect(()=>{
        const name = JSON.parse(localStorage.getItem('username')) 
        setName(name)
    }, [])
    
    return (
        <div className="flex min-h-screen bg-neutral-950 w-full h-fit ">
            <Navbar />
            <div className="flex flex-col w-full h-full p-16 pt-32 max-tablet:p-8 max-tablet:pt-32">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex text-neutral-500 gap-5 text-[5rem] font-satoshi font-normal max-tablet:text-[1.8rem] max-tablet:gap-2 h-auto break-words">
                        Welcome, <span className="text-white font-normal">{name}</span>
                    </div>
                    <div className="flex text-white text-[1.5rem] ml-4 mb-6  font-satoshi font-light max-tablet:text-[1rem]">
                        {/* {date} */}
                    </div>
                </div>
               
                <Tracker />
            </div>
        </div>

    );
}

export default Dashboard;