import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


import { addExercise, delExercise, getActiveMuscle } from '@/api/exercise.mjs'
import DataTable from './DataTable';


export default function WorkoutCard({ muscle, id }) {

    const [exercises, setExercises] = useState([]);

    const handleEx = (id) => {
        getActiveMuscle(id).then((res) => {
            setExercises(res.data)
        })
    }

    return (
        <Dialog>
            <DialogTrigger onClick={() => handleEx(id)}>
                <div className='min-w-[335px] w-[300px] flex-wrap hover:cursor-pointer relative hover:scale-105 
                                transition-transform ease-out duration-300 max-tablet:w-[325px] max-laptop:h-[70px]
                                bg-black border-2 border-indigo-600 h-[200px] rounded-lg max-tablet:rounded-sm '>
                    <p className='text-white absolute z-10 top-0 flex w-full justify-center items-center h-full font-bold text-[1.5rem] max-tablet:font-medium uppercase'>{muscle}</p>
                </div>
            </DialogTrigger>

            <DialogContent className='w-[50vw] h-[70vh] rounded-lg p-0 border-0 text-white bg-neutral-950 flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>
                <div className='flex relative h-fit w-full'>
                    <p className=' bg-indigo-700 rounded-t-lg py-4 uppercase font-medium text-[4rem] pl-12 flex h-full items-center 
                                    max-tablet:pl-6 max-tablet:text-[3rem] w-full max-tablet:rounded-none'>{muscle}</p>
                </div>

                <div className="flex p-8 w-full h-full gap-4" >
                    <div className="flex flex-col w-full max-tablet:w-full">

                        <DataTable
                            data={exercises}
                            deletion={(exId) => delExercise(exId).then(() => handleEx(id))}
                            add={(name) => addExercise(name, id).then(() => handleEx(id))}
                        />

                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}
