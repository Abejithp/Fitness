'use client'

import { addProgress, updateProgress } from "@/api/progression.mjs";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { IoAdd } from "react-icons/io5";
import { RiDeleteBack2Line } from "react-icons/ri";

import { useState } from "react";



function Popup({ data }) {

    const date = new Date().toLocaleDateString()

    const [sets, updateSets] = useState([])

    const getProgress = () => {
        addProgress(data._id, date).then((res) => {
            updateSets(res.data)
        })
    }

    const handleUpdate = (index, reps, weight) => {
        const update = [...sets]
        update[index] = { reps: reps, weight: weight }
        updateSets(update);
    }

    const addSet = () => {
        updateSets([...sets, { reps: 0, weight: 0 }])
    }

    const removeSet = (index) => {
        updateSets(
            sets.filter((_, i) => i !== index)
        )
    }

    return (
        <Sheet onOpenChange={() => updateProgress(data._id, sets, date)}>
            <SheetTrigger onClick={() => getProgress()} >TRACK</SheetTrigger>
            <SheetContent side={'bottom'} className=" p-0 border-0 flex flex-col h-[60vh] bg-neutral-950">
                <p className="text-white w-full bg-indigo-600 px-8 p-6 uppercase font-medium">
                    {data.name}
                </p>
                <div className="text-white px-10 pt-2 uppercase font-medium laptop:pt-6">My sets</div>
                <div className="flex flex-col p-8 font-satoshi h-[55%] overflow-auto pt-2 flex-wrap ">
                    <div className="flex flex-col gap-4 laptop:w-[600px]">
                        {sets.map((set, i) => {
                            return <div key={i} className="flex text-white gap-2 w-full bg-indigo-600 rounded-full justify-evenly py-2">
                                <div className="flex">
                                    <input type="number" min={0} className="bg-inherit w-[4ch] text-center" value={set.reps} onChange={(e) => handleUpdate(i, e.target.value, set.weight)} />
                                    <p>reps</p>
                                </div>

                                <div className="flex">
                                    <input type="number" className="bg-inherit w-[4ch] text-center" value={set.weight} onChange={(e) => handleUpdate(i, set.reps, e.target.value)} />
                                    <p>lbs</p>
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
            </SheetContent>
        </Sheet>

    );
}

export default Popup;