'use client'

import React, { useEffect } from 'react'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import DaySchedule from './DaySchedule';
import WorkoutSelection from './WorkoutSelection';
import { addWorkout } from '@/api/workout.mjs';

export default function CreateSchedule({ muscle }) {

  const [schedule, setSchedule] = useState([
    { day: 'Monday', exercise: [] },
    { day: 'Tuesday', exercise: [] },
    { day: 'Wednesday', exercise: [] },
    { day: 'Thursday', exercise: [] },
    { day: 'Friday', exercise: [] },
    { day: 'Saturday', exercise: [] },
    { day: 'Sunday', exercise: [] }
  ]);

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(schedule[0]);


  const handleUpdate = (id) => {
    const update = schedule[index];
    const temp = schedule;

    update.exercise.push(id);
    temp[index] = update;

    setSchedule(temp);

  }

  return (
    <Dialog>
      <DialogTrigger className='uppercase text-indigo-500'>
        Create
      </DialogTrigger>

      <DialogContent className='w-[75vw] h-[60vh] rounded-lg p-0 border-0 text-white bg-neutral-950 
            flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>
        <div className="flex">
          <WorkoutSelection muscle={muscle} update={(exercise) => handleUpdate(exercise)} />
        </div>
        <div className="flex w-full flex-wrap justify-center">
          {schedule.map((workout, index) => {
            return (
              <button className="flex text-white border-4 font-bold border-indigo-600 p-2
                            justify-center items-center font-satoshi rounded-lg" key={index}
                onClick={() => { setSelected(workout); setIndex(index) }}>
                {workout.day}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap">
          {selected.exercise.map((el) =>{
            return <div className="flex">
              {el}
            </div>
          })}
        </div>

        <button onClick={() => addWorkout(schedule, "TEST")}>
          submit
        </button>
      </DialogContent>
    </Dialog>

  )
}
