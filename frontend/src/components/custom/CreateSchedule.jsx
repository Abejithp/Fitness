'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import WorkoutSelection from './WorkoutSelection';
import { addWorkout } from '@/api/workout.mjs';
import { toast } from 'sonner';

import { TiDelete } from 'react-icons/ti';

export default function CreateSchedule({ muscle, update }) {

  const [schedule, setSchedule] = useState([
    { day: 'Sunday', exercise: [] },
    { day: 'Monday', exercise: [] },
    { day: 'Tuesday', exercise: [] },
    { day: 'Wednesday', exercise: [] },
    { day: 'Thursday', exercise: [] },
    { day: 'Friday', exercise: [] },
    { day: 'Saturday', exercise: [] },
  ]);

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(schedule[0]);
  const [name, setName] = useState('')


  const handleUpdate = (exercise) => {

    const updated = [...schedule]
    const workout = updated[index]

    const name = exercise.name
    const find = workout.exercise.findIndex((exercise) => exercise.name == name)

    if(find != -1) {
      return;
    }

    workout.exercise.push(exercise)

    setSchedule(updated)
  }

  const handleRemove = (name) => {
    const updated = [...schedule]
    const workout = updated[index];

    workout.exercise.splice(name, 1);
    setSchedule(updated)

  }

  const isValid = async () => {
    if (name.length < 0) {
      toast.error('Invalid')
      return;
    }

    await addWorkout(schedule, name);
    update()
    setName('')

    setSchedule([
      { day: 'Sunday', exercise: [] },
      { day: 'Monday', exercise: [] },
      { day: 'Tuesday', exercise: [] },
      { day: 'Wednesday', exercise: [] },
      { day: 'Thursday', exercise: [] },
      { day: 'Friday', exercise: [] },
      { day: 'Saturday', exercise: [] },
    ])

    setSelected(schedule[0])

  }

  return (
    <Dialog>
      <DialogTrigger className='uppercase text-indigo-500'>
        Create
      </DialogTrigger>

      <DialogContent className='w-[75vw] h-[70vh] rounded-lg p-0 border-0 text-white bg-neutral-950 
            flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>

        <div className="flex w-full bg-indigo-600 p-4 py-8 max-tablet:py-6 tablet:rounded-t-lg">
          <input type="text"
            className='bg-indigo-600 text-[2rem] font-satoshi uppercase w-[50%] pl-4 font-medium max-tablet:w-[80%] max-tablet:text-[1.3rem]'
            placeholder='Enter Schedule Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex relative flex-col h-full p-8">
          <div className="flex absolute top-8 left-8">
            <WorkoutSelection muscle={muscle} update={(exercise) => { handleUpdate(exercise); }} />
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 max-tablet:w-[80%] self-end">
            {schedule.map((workout, index) => {
              return (
                <button className={`flex text-white border-2 font-normal border-indigo-600 w-12 aspect-square rounded-full
                            justify-center items-center font-satoshi ${selected.day == workout.day ? 'bg-indigo-600' : 'bg-black'} 
                            transition-colors duration-300 ease-out`} key={index}
                  onClick={() => { setSelected(workout); setIndex(index) }}>
                  {workout.day[0]}
                </button>
              )
            })}
          </div>

          <div className="flex w-full h-full justify-center items-start pt-20">
            {selected.exercise.length == 0 ?
              <p className=' uppercase text-[3rem] font-satoshi font-normal'>Rest Day</p> :
              <div className="flex w-[40%] flex-wrap gap-2 justify-center max-tablet:w-full ">
                {selected.exercise.map((el, i) => {
                  return <div className="flex bg-indigo-600 p-4 rounded-full cursor-default uppercase gap-2 items-center " key={i}>
                    {el.name}
                    <button onClick={() => handleRemove(el.name)}>
                      <TiDelete  className='text-3xl'/>
                    </button>
                  </div>
                })}
              </div>
            }



          </div>

          <DialogClose className='absolute bottom-8 right-8 bg-black border-2 border-indigo-600 rounded-sm p-2'
            onClick={() => {
              isValid()
            }}>
            create
          </DialogClose>
        </div>

      </DialogContent>


    </Dialog>

  )
}
