import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TiDelete } from "react-icons/ti";

import { getActiveMuscle } from '@/api/exercise.mjs'


export default function WorkoutCard({ muscle, id }) {

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
                                transition-transform ease-out duration-300 max-tablet:w-fit max-tablet:h-[70px]
                                bg-black border-2 border-indigo-600 h-[200px] rounded-lg max-tablet:rounded-sm '>
                    <p className='text-white absolute z-10 top-0 flex w-full justify-center items-center h-full font-bold text-[1.5rem] max-tablet:font-medium uppercase'>{muscle}</p>
                </div>
            </DialogTrigger>

            <DialogContent className='w-[75vw] h-[60vh] rounded-lg p-0 border-0 text-white bg-neutral-950 flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>
                <div className='flex relative h-fit w-full'>
                    <p className=' bg-indigo-700 rounded-t-lg py-4 uppercase font-medium text-[4rem] pl-12 flex h-full items-center 
                                    max-tablet:pl-6 max-tablet:text-[3rem] w-full max-tablet:rounded-none'>{muscle}</p>
                </div>

                <div className="flex p-8 w-full h-full gap-4" >
                    <div className="flex flex-col w-[50%] max-tablet:w-full">
                        <div className="flex w-full justify-between">
                            <input type="text" placeholder='Search for Exercise' className='pl-4 p-1 bg-neutral-900 placeholder:text-neutral-500 rounded-sm font-satoshi h-fit w-fit' autoFocus={false} />
                            <button className='p-1 px-4 rounded-sm bg-indigo-600 text-white'>create</button>
                        </div>

                        <div className="flex flex-col border-t-2 border-neutral-800 mt-5 h-full">
                            {exercises.length == 0 ? <div className='mt-4 w-full h-full items-center flex justify-center text-[2rem] font-medium font-satoshi max-tablet:text-2xl'>
                                Start by Creating an Exercise
                            </div> : exercises.map((el, index) => {
                                return <div className="flex items-center uppercase font-semibold border-b-2 justify-between border-neutral-800 p-4" key={index}>
                                    <p>{el.name}</p>
                                    <button>
                                        <TiDelete className='text-3xl hover:cursor-pointer text-indigo-500' />
                                    </button>
                                </div>
                            })}

                        </div>
                    </div>
                    <div className="flex flex-col w-[50%] items-center gap-4 justify-start max-tablet:hidden">

                        <div className="flex w-[300px] aspect-square bg-neutral-300 rounded-full">

                        </div>
                        <p className='font-bold'>Exercise Usage</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
