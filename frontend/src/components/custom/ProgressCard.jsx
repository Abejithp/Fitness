import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { LineChart } from '@mui/x-charts';

import { BsBoxArrowUpRight } from "react-icons/bs";
import { getActiveMuscle } from '@/api/exercise.mjs';
import { getProgress } from '@/api/progression.mjs';

export default function ProgressCard({ muscle }) {

    const [exercises, setExercises] = useState([]);
    const [active, setActive] = useState(null);

    const handleExercises = () => {
        getActiveMuscle(muscle._id).then((res) => {
            setExercises(res.data);
        })
    }

    const handleActive = (id) => {
        getProgress(id).then((res) => {
            setActive(res.data)
        })
    }

    console.log(active)

    return (
        <Dialog>
            <DialogTrigger className='bg-indigo-600 rounded-sm uppercase font-satoshi 
                                    font-medium w-full flex p-4 justify-between items-center tablet:bg-black tablet:border-2 
                                    tablet:border-indigo-600 tablet:w-[300px] tablet:h-[200px] tablet:justify-center' onClick={() => handleExercises(muscle._id)}>
                {muscle.group}
                <BsBoxArrowUpRight className='text-[1.5rem] tablet:hidden' />
            </DialogTrigger>

            <DialogContent className='w-[75vw] h-[60vh] rounded-lg p-0 border-0 text-white bg-neutral-950 flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>
                <p className='text-white bg-indigo-600 p-8 uppercase font-medium'>
                    {muscle.group}
                </p>

                <div className="flex flex-col gap-4 p-8">
                    <div className="flex text-white flex-col h-[35%] overflow-auto gap-2">
                        {exercises.map((exercise) => {
                            return <div className="flex text-white uppercase bg-indigo-600 rounded-sm p-4 font-medium w-fit" onClick={() => handleActive(exercise._id)}>
                                {exercise.name}
                            </div>
                        })}
                    </div>

                    <div className="flex text-white bg-indigo-500">
                        <LineChart

                            series={[
                                {
                                    data: active ? active : [] ,
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}
