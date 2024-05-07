import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function WorkoutCard({ muscle, bg }) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='min-w-[300px] w-[300px] bg-white  rounded-xl hover:cursor-pointer relative hover:scale-105 transition-transform ease-in-out duration-300'>
                    <img src={`/card/${bg}.png`} alt="background" className=' rounded-lg w-full' />
                    <p className=' absolute z-10 top-0 flex w-full justify-center items-center h-full text-black font-medium text-[2rem] uppercase'>{muscle}</p>
                </div>
            </DialogTrigger>

            <DialogContent className='w-[75vw] h-[60vh] rounded-lg p-0 border-0 bg-white flex flex-col gap-0 max-tablet:h-svh max-tablet:w-svw max-tablet:rounded-none'>
                <div className='flex relative h-fit w-full'>
                    <img src={`/card/${bg}.png`} alt="background" className='h-32 rounded-t-lg object-cover w-full max-tablet:rounded-none' />
                    <p className='absolute top-0 uppercase font-medium text-[5rem] ml-12 flex h-full items-center max-tablet:ml-6 max-tablet:text-[3rem] text-ellipsis w-[50%]'>{muscle}</p>
                </div>

                <div className="flex p-8 w-full h-full gap-4">
                    <div className="flex flex-col w-[50%]">
                        <input type="text" placeholder='Search for Exercise' className='px-2 p-1 bg-gray-300 rounded-sm font-satoshi h-fit w-fit' />
                    </div>
                    <div className="flex flex-col w-[50%] items-center gap-4 justify-center max-tablet:hidden">
                        <p>Favourite Exercise</p>
                        <div className="flex w-[300px] aspect-square bg-gray-300 rounded-full">

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
