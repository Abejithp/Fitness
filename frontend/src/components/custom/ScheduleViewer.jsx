import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import { TiDelete } from 'react-icons/ti';

import WorkoutSelection from './WorkoutSelection';
import {  getWorkout, updateWorkout } from '@/api/workout.mjs';


export default function ScheduleViewer({id, trigger, muscle, update}) {

  const [schedule, setSchedule] = useState([]);
  const [name, setName] = useState("")
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState({day: '', exercise: []})

  const getSchedule = () => {
    getWorkout(id).then((res) => {

        if(!res.data){
          return;
        }

        const {workout, workoutName} = res.data;
        setSchedule(workout);
        setSelected(workout[0])
        setName(workoutName);
    })
  }

  const handleEdit = () => {
    updateWorkout(id, schedule, name).then((res) => {
      console.log(res)
    })
  }

  const handleRemove = (name) => {
    const update = [...schedule];
    const workout = update[index]

    workout.exercise.splice(name, 1);

    setSchedule(update);
  }

  const handleUpdate = (exercise) => {
    const update = [...schedule];
    const workout = update[index]

    workout.exercise.push(exercise);

    setSchedule(update);
  }

  return (
    <Dialog>
      <DialogTrigger className='uppercase text-indigo-500' onClick={() => getSchedule()}>
        {trigger}
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

            <div className="flex w-[40%] flex-wrap gap-2 justify-center max-tablet:w-full ">
              {selected.exercise.map((el, i) => {
                return <div className="flex bg-indigo-600 p-4 rounded-full cursor-default uppercase gap-2 items-center " key={i}>
                  {el.name}
                  <button onClick={() => handleRemove(el.name)}>
                    <TiDelete className='text-3xl' />
                  </button>
                </div>
              })}
            </div>


          </div>

          <DialogClose className='absolute bottom-8 right-8 bg-black border-2 border-indigo-600 rounded-sm p-2'
            onClick={() => {
              handleEdit();
              update();
            }}>
            edit
          </DialogClose>
        </div>

      </DialogContent>


    </Dialog>
  )
}
