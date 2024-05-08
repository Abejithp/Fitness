'use client'

import ActiveWorkout from "@/components/custom/ActiveWorkout";
import Menu from "@/components/custom/Menu";
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
import { getWorkout } from "@/api/workout.mjs";



function Workout() {

    const [muscleGroups, setGroups] = useState([])
    const [schedule, setSchedule] = useState([])


    useEffect(() => {
        getMuscles().then((res) => {
            setGroups(res.data)
            console.log(res.data)
        })

        getWorkout().then((res) => {
            setSchedule(res.data)
        })
    }, [])

    return (
        <div className="flex min-h-dvh bg-neutral-950 w-full font-satoshi flex-col z-20 relative">
            <Menu />
            <div className="flex p-16 flex-col max-tablet:p-8">
                <div className="flex text-white mb-8 gap-2 items-center">
                    <img src="logo.png" alt="logo" className="h-8" />
                    <p className="text-[2rem] font-bold">INSPIRE</p>
                </div>

                <div className="flex text-white uppercase font-bold text-lg w-full mb-4">My Workouts</div>
                <div className="flex w-full gap-8 h-[40vh] max-laptop:flex-col items-end z-20">
                    <div className="flex w-[65%] h-full max-laptop:hidden ">
                        <ActiveWorkout />
                    </div>
                    <div className="text-white hidden max-laptop:flex w-full bg-indigo-600 p-4 font-medium rounded-sm justify-between items-center">
                        <p className="text-[1.2rem] uppercase">Schedule NAME</p>
                        <BsBoxArrowUpRight className=" text-[1.5rem]" />
                    </div>
                    <div className="flex w-[40%] h-fit overflow-y-hidden max-laptop:w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead>View</TableHead>
                                    <TableHead className="max-laptop:hidden">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className=" overflow-hidden">
                                {schedule.map((data, i) => (
                                    <TableRow key={i} className="text-white">
                                        <TableCell>{data.workoutName}</TableCell>
                                        <TableCell className=" text-indigo-500 text-lg text-right">
                                            <HiLightningBolt className=" hover:cursor-pointer text-center " />
                                        </TableCell>
                                        <TableCell >
                                            <IoEyeSharp className="text-indigo-500 text-xl"/>
                                        </TableCell>
                                        <TableCell className="text-indigo-500 text-2xl align-middle max-laptop:hidden">
                                            <TiDelete className=" hover:cursor-pointer"/>
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
                        return <WorkoutCard muscle={muscle.group} key={index} bg={'g' + (index % 3)} id={muscle._id} />
                    })}
                </div>
            </div>

        </div>
    );
}

export default Workout;