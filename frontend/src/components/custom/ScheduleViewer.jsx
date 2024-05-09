import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { BsBoxArrowUpRight } from "react-icons/bs";

export default function ScheduleViewer({name, schedule}) {

  const [selected, setSelected] = useState(schedule[0])
  
  return (
    <Dialog>
      <DialogTrigger>
        <BsBoxArrowUpRight className='text-[1.5rem]'/>
      </DialogTrigger>
      <DialogContent className="w-full h-full flex bg-neutral-950 p-0 gap-4 flex-col border-0">
        <p className='text-white w-full h-fit p-8 bg-indigo-600'>{name}</p>

        <div className="flex flex-wrap gap-2 w-full justify-center p-6 mt-4">
          {schedule.map((workout, index) => {
            return (
              <button className="flex text-white border-4 font-bold border-indigo-600 p-2
                      justify-center items-center font-satoshi rounded-lg" key={index}
                        
                      onClick={()=> setSelected(workout)}>
                {workout.day}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 w-full items-center">
          {selected?.exercise.map((exercise) => {
            return <div className="flex text-white bg-indigo-600 p-4 rounded-full uppercase px-6">
              {exercise.name}
            </div>
          })}
        </div>

      </DialogContent>

    </Dialog>
  )
}
