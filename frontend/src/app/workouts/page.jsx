'use client'

import ActiveWorkout from "@/components/custom/ActiveWorkout";
import WorkoutCard from "@/components/custom/WorkoutCard";

import { HiLightningBolt } from "react-icons/hi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getMuscles } from "@/api/exercise.mjs";
import { getSchedule, getWorkout, updateActiveWorkout } from "@/api/workout.mjs";
import Navbar from "@/components/custom/Navbar";



function Workout() {

    const [muscleGroups, setGroups] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [schedule, setSchedule] = useState([]);
    const [scheduleName, setName] = useState('');


    const updateSchedule = () =>{
        getSchedule().then((res)=>{
            if(!res.success){
                return;
            }
            const {workoutName, workout } = res.data
            setSchedule(workout);
            setName(workoutName);
        })
    }

    useEffect(() => {
        getMuscles().then((res) => {
            setGroups(res.data)
        })

        getWorkout().then((res) => {
            setWorkouts(res.data)
        })

        updateSchedule();
   
    }, [])

    return (
        <div className="flex min-h-dvh bg-neutral-950 w-full font-satoshi flex-col z-20 relative">
            <Navbar />
            <div className="flex p-16 pt-32 flex-col max-tablet:p-8 max-tablet:pt-28">
                <div className="flex text-white uppercase font-bold text-lg w-full mb-4">My Workouts</div>
                <div className="flex w-full gap-8 h-[40vh] max-laptop:flex-col items-end z-20">
                    <div className="flex w-[65%] h-full max-laptop:hidden ">
                        <ActiveWorkout schedule={schedule}/>
                    </div>
                    <div className="text-white hidden max-laptop:flex w-full bg-indigo-600 p-4 font-medium rounded-sm justify-between items-center">
                        <p className="text-[1.2rem] uppercase">{scheduleName}</p>
                        <BsBoxArrowUpRight className=" text-[1.5rem]" />
                    </div>
                    <div className="flex w-[40%] h-fit overflow-y-hidden max-laptop:w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Activate</TableHead>
                  
                                    <TableHead className="max-laptop:hidden">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className=" overflow-hidden">
                                {workouts.map((data, i) => (
                                    <TableRow key={i} className="text-white">
                                        <TableCell>{data.workoutName}</TableCell>
                                        <TableCell className=" text-indigo-500 text-lg">
                                            <button onClick={ async () => {
                                                await updateActiveWorkout(data._id);
                                                updateSchedule();
                                            }}>
                                                <HiLightningBolt className=" hover:cursor-pointer text-center ml-4" />
                                            </button>
                                           
                                        </TableCell>
                                        <TableCell className="text-indigo-500 text-2xl  max-laptop:hidden">
                                            <TiDelete className=" hover:cursor-pointer ml-2"/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
            <div className="flex h-full w-full flex-col p-16 pt-0 gap-4 max-tablet:items-center max-tablet:p-8">
                <div className="flex text-white uppercase font-bold text-lg w-full">My Exercises</div>
                <div className="flex gap-6 max-tablet:flex-col w-fit max-tablet:gap-3 flex-wrap">
                    {muscleGroups.map((muscle, index) => {
                        return <WorkoutCard muscle={muscle.group} key={index} id={muscle._id} />
                    })}
                </div>
            </div>

        </div>
    );
}

export default Workout;