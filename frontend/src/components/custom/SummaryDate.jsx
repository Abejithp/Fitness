import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function SummaryDate({ progress }) {

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="uppercase" >{progress.exerciseRef.name}</AccordionTrigger>
                <AccordionContent className="">
                    {progress.sets.map((set, i) => {
                        return <div key={i} className="flex w-full justify-evenly gap-16 font-bold text-indigo-500 text-lg  p-2 px-8">
                            <span>{set.weight} lbs</span>
                            <span>{set.reps} reps</span>
                        </div>
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
