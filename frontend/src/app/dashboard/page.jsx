'use client'

import { Tracker } from "../../components/custom/tracker";
import { useEffect, useState } from "react";

import Navbar from "@/components/custom/Navbar";
import { getAllRoutines } from "@/api/workout.mjs";

function Dashboard() {

    const dateObj = new Date();
    const offset = dateObj.getTimezoneOffset();
    const date = new Date(Date.now() - (offset * 60 * 1000)).toJSON().split('T')[0];


    const [name, setName] = useState('')
    const [routines, setRoutines] = useState([])
    const [routineId, setRoutineId] = useState(null);

    useEffect(() => {
        const name = JSON.parse(localStorage.getItem('username'))
        setName(name)

        getAllRoutines().then((res) => {
            setRoutines(res.data)
            if(res.data.length == 0){
                return;
            }

            setRoutineId(res.data[0]._id)
        });

    }, [])

    return (
        <div className="flex min-h-screen bg-neutral-950 w-full h-fit ">
            <Navbar />
            <div className="flex flex-col w-full h-full max-laptop:px-8 p-16 pt-32 max-tablet:p-8 max-tablet:pt-32">
                <div className="flex flex-col justify-between w-full ">
                    <div className="flex text-neutral-500 gap-5 text-[5rem] font-satoshi font-normal max-tablet:text-[1.8rem] max-tablet:gap-2 h-auto break-words">
                        Welcome, <span className="text-white font-normal">{name}</span>
                    </div>
                    <div className="flex text-white text-[1.5rem] mb-6  font-satoshi font-light max-tablet:text-[1rem]">
                        {date}
                    </div>
                </div>
                {routines.length != 0 && 
                <div className="flex flex-col gap-4">
                    <p className="text-white uppercase font-medium text-lg">My Routines</p>
                    <div className="flex flex-wrap mb-8">
                        {routines.map((exercise) => {
                           return  <button className="flex text-white w-[300px] border-4 bg-black 
                           border-indigo-600 rounded-md font-satoshi h-[200px] uppercase font-medium items-center 
                           justify-center cursor-pointer">
                                {exercise.workoutName}
                            </button>
                        })}
                    </div>
                </div> }
                <Tracker routineId={routineId} isRoutine={true} />
         

                <p className="text-white uppercase font-medium text-lg">My Schedule</p>
                <Tracker routineId={null} isRoutine={false} />
            </div>
        </div>

    );
}

export default Dashboard;