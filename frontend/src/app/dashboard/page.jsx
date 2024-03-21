'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import { Tracker } from "../../components/tracker";
import { Calendar } from "@/components/ui/calendar";
import {useState} from "react";
import Inspiration from "@/components/inspiration";
function Dashboard() {

    const date = new Date().toISOString().split('T')[0];
    const [calendar, setDate] = useState(new Date());
    
    return (
        <div className="flex min-h-screen bg-neutral-900 max-laptop:flex-col w-full h-fit ">
            <Sidebar />
            <div className="flex flex-col mt-8 mx-8 max-laptop:m-0 max-laptop:px-8 w-full h-full">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex text-neutral-500 gap-5 text-[5rem] font-satoshi font-light max-tablet:text-[1.8rem] max-tablet:gap-2 h-auto break-words">
                        Welcome, <span className="text-white font-normal">ABE</span>
                    </div>
                    <div className="flex text-white text-[1.5rem] ml-4 mb-6  font-satoshi font-light max-tablet:text-[1rem]">
                        {date}
                    </div>
                </div>
                <div className="flex justify-between w-full gap-4">
                    <Calendar 
                        mode="single"
                        selected={calendar}
                        onSelect={(date) => setDate(date)}

                        className={"bg-white rounded-lg" }
                        
                    />
                    <div className="flex w-full items-center justify-center bg-neutral-800 rounded-lg">
                        <Inspiration />
                    </div>
                  
                    
                </div>
                <Tracker />
            </div>
        </div>

    );
}

export default Dashboard;