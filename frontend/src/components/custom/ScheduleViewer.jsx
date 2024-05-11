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
        <p className='text-white w-full h-fit p-8 bg-indigo-600 text-[1.5rem] uppercase'>{name}</p>

        <div className="flex flex-wrap gap-2 w-[80%] self-center justify-center p-6 mt-4">
          {schedule.map((workout, index) => {
            return (
              <button className={`flex text-white border-2 font-bold border-indigo-600 w-12 aspect-square
                      justify-center items-center font-satoshi rounded-full ${selected.day == workout.day ? 'bg-indigo-600' : 'bg-black'}
                       transition-colors duration-300 ease-out
                      `} key={index}
                        
                      onClick={()=> setSelected(workout)}>
                {workout.day[0]}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2 w-[70%] self-center justify-center">
          {}

          {selected.exercise.map((exercise) => {
            return <div className="flex text-white bg-indigo-600 p-3 px-5 rounded-full uppercase ">
              {exercise.name}
            </div>
          })}
        </div>

      </DialogContent>

    </Dialog>
  )
}
