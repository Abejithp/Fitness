'use client'

import ActiveWorkout from "@/components/custom/ActiveWorkout";
import WorkoutCard from "@/components/custom/WorkoutCard";

import { Toaster } from "@/components/ui/sonner";

import { HiLightningBolt } from "react-icons/hi";
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
import { delWorkout, getSchedule, getWorkout, updateActiveWorkout } from "@/api/workout.mjs";
import Navbar from "@/components/custom/Navbar";
import ScheduleViewer from "@/components/custom/ScheduleViewer";
import CreateSchedule from "@/components/custom/CreateSchedule";



function Workout() {

    const [muscleGroups, setGroups] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [schedule, setSchedule] = useState([]);
    const [scheduleName, setName] = useState('');


    const updateSchedule = () => {
        getSchedule().then((res) => {
            if (!res.success) {
                return;
            }
            if (res.data === null) {
                return;
            }

            const { workoutName, workout } = res.data
            setSchedule(workout);
            setName(workoutName);
        });

        getWorkout().then((res) => {
            setWorkouts(res.data)
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
            <Toaster />
            <div className="flex p-16 pt-32 flex-col max-laptop:p-8 max-laptop:pt-36">
                <div className="flex text-white uppercase font-bold text-lg w-full mb-4 justify-between">
                    My Workouts
                    <CreateSchedule muscle={muscleGroups} update={updateSchedule}/>
                </div>
                <div className={`flex w-full gap-8 h-[40vh] max-laptop:flex-col items-end z-20 max-laptop:h-fit`}>
                    <div className="flex w-[65%] h-full max-laptop:hidden ">
                        <ActiveWorkout schedule={schedule} />
                    </div>
                    <div className="text-white hidden max-laptop:flex w-full bg-indigo-600 p-4 font-medium rounded-sm justify-between items-center">
                        {scheduleName == '' ? <p className="text-[1.2rem] text-center w-full font-normal">
                            create a schedule
                        </p> : <>
                            <p className="text-[1.2rem] uppercase">
                                {scheduleName}
                            </p>
                            <ScheduleViewer name={scheduleName} schedule={schedule} />
                        </>
                        }


                    </div>
                    <div className={`flex w-[40%] h-full overflow-y-hidden max-laptop:w-full max-laptop:${scheduleName == ''? 'hidden': ''}`}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="max-laptop:text-right">Activate</TableHead>

                                    <TableHead className="max-laptop:hidden">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className=" overflow-hidden">
                                {workouts.map((data, i) => (
                                    <TableRow key={i} className="text-white">
                                        <TableCell>{data.workoutName}</TableCell>
                                        <TableCell className=" text-indigo-500 text-lg max-laptop:text-right">
                                            <button onClick={async () => {
                                                await updateActiveWorkout(data._id);
                                                updateSchedule();
                                            }}>
                                                <HiLightningBolt className=" hover:cursor-pointer text-center ml-4 max-laptop:mr-4" />
                                            </button>

                                        </TableCell>
                                        <TableCell className="text-indigo-500 text-2xl  max-laptop:hidden">
                                            <button onClick={() => delWorkout(data._id).then(() => {updateSchedule()})}>
                                                <TiDelete className=" hover:cursor-pointer ml-2" />
                                            </button>
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