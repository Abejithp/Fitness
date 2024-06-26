'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import WorkoutSelection from './WorkoutSelection';
import { Switch } from "@/components/ui/switch"

import { addRoutine, addWorkout } from '@/api/workout.mjs';
import { toast } from 'sonner';

import { TiDelete } from 'react-icons/ti';
import { MdAddBox } from "react-icons/md";
import { IoAdd } from 'react-icons/io5';

export default function CreateSchedule({ muscle, update}) {

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

  const [scheduleCreation, setCreation] = useState(true);

  const [routine, setRoutine] = useState([{ day: "", exercise: [] }])

  const handleUpdate = (exercise) => {

    const updated = scheduleCreation ? [...schedule] : [...routine]
    const workout = scheduleCreation ? updated[index] : updated[0]

    const name = exercise.name;
    const find = workout.exercise.findIndex((exercise) => exercise.name == name)

    if (find != -1) {
      return;
    }

    workout.exercise.push(exercise)

    if (scheduleCreation) {
      return setSchedule(updated);
    }

    return setRoutine(updated);

  }

  const handleRemove = (name) => {
    const updated = scheduleCreation ? [...schedule] : [...routine];
    const workout = scheduleCreation ? updated[index] : updated[0];

    workout.exercise.splice(name, 1);

    if(scheduleCreation){
      return setSchedule(updated)
    }

    return setRoutine(updated);

  }

  const isValid = async () => {
    if (name.length < 0) {
      toast.error('Invalid')
      return;
    }


    if(scheduleCreation){
      await addWorkout(schedule, name);
    } else {
      await addRoutine(routine, name)
    }
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

    setRoutine([{ day: "", exercise: [] }])
  }

  return (
    <Dialog>
      <DialogTrigger className='bg-indigo-600 w-[30px] tablet:px-4 tablet:w-fit tablet:h-fit gap-2 tablet:p-2 max-tablet:aspect-square flex justify-center rounded-md items-center'>
        <p className='text-xl max-tablet:hidden font-normal lowercase'>Create</p>
        <IoAdd className='text-xl text-white'/>
      </DialogTrigger>

      <DialogContent className='w-[75vw] h-[70vh] rounded-lg p-0 border-0 text-white bg-neutral-950 
            flex flex-col gap-0 max-tablet:h-dvh max-tablet:w-dvw max-tablet:rounded-none'>

        <div className="flex w-full bg-indigo-600 p-4 py-8 max-tablet:py-6 tablet:rounded-t-lg">
          <input type="text"
            className='bg-indigo-600 text-[2rem] font-satoshi uppercase w-[50%] pl-4 font-medium max-tablet:w-[80%] max-tablet:text-[1.3rem]'
            placeholder={scheduleCreation ? 'Enter Schedule Name' : 'Enter Routine Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex relative flex-col h-full p-8">
          <div className="flex absolute top-8 left-8">
            <WorkoutSelection muscle={muscle} update={(exercise) => { handleUpdate(exercise); }} />
          </div>
          {scheduleCreation && <div className="flex w-full flex-wrap justify-center gap-3 max-tablet:w-[80%] self-end">
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
          </div>}


          <Switch checked={scheduleCreation} onCheckedChange={() => setCreation(!scheduleCreation)} 
            className="absolute top-10 right-8 max-tablet:left-8 max-tablet:top-24" />

          <div className="flex w-full h-full justify-center items-start pt-20">

            {(scheduleCreation) &&
              <div className="flex w-[40%] flex-wrap gap-2 justify-center max-tablet:w-full ">
                {selected.exercise.map((el, i) => {
                  return <div className="flex bg-indigo-600 p-4 rounded-full cursor-default uppercase gap-2 items-center " key={i}>
                    {el.name}
                    <button onClick={() => handleRemove(el.name)}>
                      <TiDelete className='text-3xl' />
                    </button>
                  </div>
                })}
              </div>}


            {!scheduleCreation && <div className="flex flex-wrap  w-[60%] justify-center items-center gap-3 max-tablet:w-[80%] self-center">
              {routine[0].exercise.map((el, i) => {
                return <div className="flex bg-indigo-600 p-4 rounded-full cursor-default uppercase gap-2 items-center flex-shrink-0" key={i}>
                  {el.name}
                  <button onClick={() => handleRemove(el.name)}>
                    <TiDelete className='text-3xl' />
                  </button>
                </div>
              })}

            </div>}



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
