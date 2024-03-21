'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import Popup from "../../components/popup";
import { Tracker } from "../../components/tracker";
import { Calendar } from "@/components/ui/calendar";
import {useState} from "react";
function Dashboard() {

    const date = new Date().toISOString().split('T')[0];
    const [calendar, setDate] = useState(new Date());
    
    return (
        <div className="flex min-h-screen bg-neutral-900 max-laptop:flex-col w-full">
            <Sidebar />
            <div className="flex flex-col mt-8 mx-8 max-laptop:m-0 max-laptop:px-8 w-full">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex text-neutral-500 gap-5 text-[5rem] font-satoshi font-light max-tablet:text-[1.8rem] max-tablet:gap-2 h-auto break-words">
                        Welcome, <span className="text-white font-normal">ABE</span>
                    </div>
                    <div className="flex text-white text-[1.5rem] ml-4 font-satoshi font-light max-tablet:text-[1rem]">
                        {date}
                    </div>
                </div>
                <div className="flex">
                    <Calendar 
                        mode="single"
                        selected={calendar}
                        onSelect={(date) => setDate(date)}
                        className={"bg-neutral-300 rounded-lg"}
                        
                    />
                </div>
                <Tracker />
            </div>
        </div>

    );
}

export default Dashboard;