import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { GoTrash } from "react-icons/go";

import { getActiveMuscle } from '@/api/exercise.mjs'


export default function WorkoutCard({ muscle, bg, id }) {

    const [exercises, setExercises] = useState([])

    const handleEx = (id) => {
        getActiveMuscle(id).then((res) => {
            setExercises(res.data)
        })
    }

    return (
        <Dialog>
            <DialogTrigger onClick={() => handleEx(id)}>
                <div className='min-w-[300px] w-[300px] hover:cursor-pointer relative hover:scale-105 
                                transition-transform ease-in-out duration-300 max-tablet:w-fit max-tablet:h-[60px] '>
                    <img src={`/card/${bg}.png`} alt="background" className=' rounded-lg w-full h-full max-tablet:rounded-sm' />
                    <p className=' absolute z-10 top-0 flex w-full justify-center items-center h-full text-black font-bold text-[2rem] uppercase'>{muscle}</p>
                </div>
            </DialogTrigger>

            <DialogContent className='w-[75vw] h-[60vh] rounded-lg p-0 border-0 bg-white flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>
                <div className='flex relative h-fit w-full'>
                    <img src={`/card/${bg}.png`} alt="background" className='h-32 rounded-t-lg object-cover w-full max-tablet:rounded-none' />
                    <p className='absolute top-0 uppercase font-medium text-[5rem] ml-12 flex h-full items-center max-tablet:ml-6 max-tablet:text-[3rem] text-ellipsis w-[50%]'>{muscle}</p>
                </div>

                <div className="flex p-8 w-full h-full gap-4" >
                    <div className="flex flex-col w-[50%] max-tablet:w-full">
                        <div className="flex w-full justify-between">
                            <input type="text" placeholder='Search for Exercise' className='px-2 p-1 bg-gray-300 rounded-sm font-satoshi h-fit w-fit' autoFocus={false} />
                            <button className='p-1 px-4 rounded-sm bg-indigo-600 text-white'>create</button>
                        </div>

                        <div className="flex flex-col border-t-2 border-gray-300 mt-5 h-full">
                            {exercises.length == 0 ? <div className='mt-4 w-full h-full items-center flex justify-center text-[2rem] font-medium'>
                                Start by Creating an Exercise 
                            </div> : exercises.map((el, index) => {
                                return <div className="flex uppercase font-semibold border-b-2 justify-between border-gray-300 p-4" key={index}>
                                    <p>{el.name}</p>
                                    <GoTrash className='text-[1.4rem] hover:cursor-pointer' />
                                </div>
                            })}

                        </div>
                    </div>
                    <div className="flex flex-col w-[50%] items-center gap-4 justify-start max-tablet:hidden">

                        <div className="flex w-[300px] aspect-square bg-gray-300 rounded-full">

                        </div>
                        <p className='font-bold'>Favourite Exercise</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
