'use client'

import { addProgress, getProgress, updateProgress } from "@/api/progression.mjs";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { IoAdd } from "react-icons/io5";
import { RiDeleteBack2Line } from "react-icons/ri";

import { LineChart } from '@mui/x-charts';

import { useState } from "react";



function Popup({ data }) {

    const [sets, updateSets] = useState([])
    const [progress, setProgress] = useState(null)

    const populateData = () => {
        addProgress(data._id).then((res) => {
            updateSets(res.data)
        })

        getProgress(data._id).then((res) => {
            setProgress(res.data)
        })
        
    }

    const handleUpdate = (index, reps, weight) => {
        const update = [...sets]
        update[index] = { reps: reps, weight: weight }
        updateSets(update);
    }

    const addSet = () => {
        const [last] = sets.slice(-1)
        if (!last) {
            return updateSets([{ reps: 0, weight: 0 }])
        }

        const { reps, weight } = last
        updateSets([...sets, { reps: reps, weight: weight }])
    }

    const removeSet = (index) => {
        updateSets(
            sets.filter((_, i) => i !== index)
        )
    }

    return (
        <Sheet onOpenChange={() => updateProgress(data._id, sets)}>
            <SheetTrigger onClick={() => populateData()} >
                <IoAdd className="text-xl text-white" />
            </SheetTrigger>
            <SheetContent side={'bottom'} className=" p-0 border-0 flex w-full flex-col h-[60dvh] max-tablet:h-[70dvh] bg-neutral-950">
                <p className="text-white w-full bg-indigo-600 px-8 p-6 uppercase font-medium text-xl">
                    {data.name}
                </p>
                <div className="flex w-full px-8 pb-8 pt-4 gap-4 h-full">
                    <div className="flex min-w-[50%] max-tablet:min-w-[100%] relative flex-col">
                        <div className="text-white px-10 pt-2 uppercase font-medium laptop:pt-6 text-xl mb-5">My sets</div>
                        <div className="flex flex-col p-8 font-satoshi h-[55%] overflow-auto pt-2 flex-wrap ">
                            <div className="flex flex-col gap-3 ">
                                {sets.map((set, i) => {
                                    return <div key={i} className="flex text-white gap-2 w-full bg-indigo-600 rounded-full justify-evenly py-2">
                                        
                                        <div className="flex">
                                            <input type="number" inputMode="numeric" min={"0"} pattern="[0-9]*" className="bg-inherit w-[4ch] text-center" value={set.weight} onChange={(e) => handleUpdate(i, set.reps, e.target.value)} />
                                            <p>lbs</p>
                                        </div>
                                        
                                        <div className="flex">
                                            <input type="number" inputMode="numeric" min={"0"} pattern="[0-9]*" className="bg-inherit w-[4ch] text-center" value={set.reps} onChange={(e) => handleUpdate(i, e.target.value, set.weight)} />
                                            <p>reps</p>
                                        </div>

                                        <button onClick={() => removeSet(i)} >
                                            <RiDeleteBack2Line className="text-white text-[1.5rem]" />
                                        </button>
                                    </div>
                                })}
                            </div>

                        </div>
                        <button className="text-white w-full absolute bottom-8 flex justify-center">
                            <IoAdd className="text-white bg-indigo-600 w-12 h-12 p-2  rounded-full" onClick={() => addSet()} />
                        </button>

                    </div>
                    <div className="flex w-[50%] min-h-[100%] max-tablet:hidden">
                        <div className="flex flex-col gap-4 p-8 w-full h-full">
                            <div className="flex text-white bg-indigo-500 rounded-sm" autoFocus>
                                <LineChart
                                    series={[
                                        {
                                            data: [],
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

    );
}

export default Popup;