'use client'

import { Tracker } from "../../components/custom/tracker";
import { useEffect, useState } from "react";
import Menu from "@/components/custom/Menu";

function Dashboard() {

    const date = new Date().toISOString().split('T')[0];
    const [name, setName] = useState('')

    useEffect(()=>{
        const name = localStorage.getItem('user')
        setName(name)
    }, [])
    
    return (
        <div className="flex min-h-screen bg-neutral-950 max-laptop:flex-col w-full h-fit ">
            <Menu/>
            <div className="flex flex-col mt-8 mx-8 max-laptop:m-0 max-laptop:px-8 w-full h-full">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex text-neutral-500 gap-5 text-[5rem] font-satoshi font-light max-tablet:text-[1.8rem] max-tablet:gap-2 h-auto break-words">
                        Welcome, <span className="text-white font-normal">{name}</span>
                    </div>
                    <div className="flex text-white text-[1.5rem] ml-4 mb-6  font-satoshi font-light max-tablet:text-[1rem]">
                        {date}
                    </div>
                </div>
               
                <Tracker />
            </div>
        </div>

    );
}

export default Dashboard;