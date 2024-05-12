'use client'

import { addProgress, updateProgress } from "@/api/progression.mjs";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";



function Popup({ data }) {

    const date = new Date();
    const time = date.toLocaleDateString()

    const [sets, updateSets] = useState([])

    const getProgress = () => {
        addProgress(data._id).then((res) => {
            updateSets(res.data)
        })
    }

    const handleUpdate = (index, reps, weight) => {
        const update = [...sets]
        update[index] = {reps: reps, weight: weight}
        updateSets(update);
    }

    const addSet = () => {
        updateSets([...sets, {reps: 0, weight: 0}])
    }

    const removeSet = (index) => {
        updateSets(
            sets.filter((_, i) => i !== index)
        )
    }

    return (
        <Sheet onOpenChange={() => updateProgress(data._id, sets)}>
            <SheetTrigger onClick={() => getProgress()} >track</SheetTrigger>
            <SheetContent side={'bottom'} className=" p-0 border-0 flex flex-col h-[60vh] bg-neutral-950">
                <p className="text-white">{time}</p>
                {sets.map((set, i) => {
                    return <div key={i} className="flex text-white gap-2">
                        <input type="number" className="bg-neutral-950" value={set.reps} onChange={(e) => handleUpdate(i, e.target.value, set.weight)} />
                        <input type="number" className="bg-neutral-950" value={set.weight} onChange={(e) => handleUpdate(i, set.reps, e.target.value)} />
                        <button onClick={() => removeSet(i)} >delete</button>
                    </div>
                })}
                <button onClick={() => addSet()} className="text-white w-fit">
                    add set
                </button>
            </SheetContent>
        </Sheet>

    );
}

export default Popup;