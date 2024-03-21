'use client'

import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { SlGraph } from "react-icons/sl";
function Sidebar() {

    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className="flex flex-col gap-4 w-[400px] h-screen p-8 sticky top-0 max-laptop:h-[150px] max-laptop:w-full max-tablet:h-[120px] flex-shrink-0 z-50">
            <div className="flex flex-col h-full w-full bg-slate-500 rounded-2xl p-8 max-laptop:w-full max-laptop:flex-row
                            max-laptop:items-center max-laptop:justify-between">
                <div className="flex text-white font-satoshi font-medium text-[2.5rem] ml-4 w-fit max-laptop:m-0
                                max-laptop:text-[2rem] max-tablet:text-[1.3rem]">
                    Inspire
                </div>


                <IoIosMenu className="text-white text-[2.5rem] hidden max-laptop:flex max-tablet:text-[1.6rem]" onClick={() => setIsOpened(!isOpened)} />

                <div className="flex flex-col font-satoshi ml-8 mt-12 gap-4 max-laptop:hidden">
                    <Link href="/dashboard" className="text-white text-[1.5rem] flex items-center gap-3">
                        <MdDashboard />
                        Dashboard
                    </Link>
                    <Link href="/workouts" className="text-white text-[1.5rem] flex items-center gap-3">
                        <CgGym />
                        Workouts
                    </Link>
                    <Link href="/progression" className="text-white text-[1.5rem] flex items-center gap-3">
                        <SlGraph />
                        Progression
                    </Link>
                </div>

            </div>
            <div className={`flex flex-col bg-slate-700 w-full font-satoshi rounded-2xl gap-4 p-8 z-50
                           laptop:hidden
                            ${isOpened ? 'flex' : 'hidden'}`}>
                <Link href="/dashboard" className="text-white text-[1.5rem] flex items-center gap-3 max-tablet:text-[1rem]">
                    <MdDashboard />
                    Dashboard
                </Link>
                <Link href="/workouts" className="text-white text-[1.5rem] flex items-center gap-3 max-tablet:text-[1rem]">
                    <CgGym />
                    Workouts
                </Link>
                <Link href="/progression" className="text-white text-[1.5rem] flex items-center gap-3 max-tablet:text-[1rem]">
                    <SlGraph />
                    Progression
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;