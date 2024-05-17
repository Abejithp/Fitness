'use client'

import { getMuscles } from "@/api/exercise.mjs";
import { getSummaryDate } from "@/api/progression.mjs";
import Navbar from "@/components/custom/Navbar";
import ProgressCard from "@/components/custom/ProgressCard";
import Summary from "@/components/custom/Summary";
import SummaryDate from "@/components/custom/SummaryDate";
import { Calendar } from "@/components/ui/calendar";

import { useEffect, useState } from "react";


function Progression() {

    const [muscles, setMuscles] = useState([]);
    const [date, setDate] = useState(new Date());
    const [progresses, setProgress] = useState([])


    const offset = new Date().getTimezoneOffset();
    const currentDate = new Date(Date.now() - (offset * 60 * 1000)).toJSON().split('T')[0];

    useEffect(() => {
        getMuscles().then((res) => {
            setMuscles(res.data);
        })
        getSummaryDate(currentDate).then((res) => {
            setProgress(res.data)
        })
    }, [])

    useEffect(() => {
        const findDate = date ? date.toJSON().split('T')[0] : new Date().toJSON().split('T')[0];

        getSummaryDate(findDate).then((res) => {
            setProgress(res.data)
        })
    }, [date ? date.toJSON() : ''])



    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Navbar />
            <div className="flex flex-col text-white font-satoshi pt-32 px-16 max-tablet:px-8 w-full">
                <div className="flex w-full max-laptop:flex-col gap-16 max-tablet:gap-6 items-baseline">
                    <div className="flex flex-col w-full laptop:w-[50%]">
                        <p className="font-medium uppercase text-lg">Weekly Summary</p>
                        <Summary />
                    </div>
                    <div className="flex flex-col max-tablet:w-full ">
                      
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className={"rounded-md max-tablet:w-full w-fit border-indigo-600 border-2"}
                        />
                    </div>
                    <div className="flex flex-col laptop:w-[25%] w-full">
                        {progresses.length > 0 ? progresses.map((progress, i) => {
                            return <SummaryDate progress={progress} key={i} />
                        }) : <div className="flex uppercase font-medium text-2xl text-white h-full w-full py-4  justify-center">No Workout on this day</div>}
                    </div>
                </div>





                <p className="font-medium uppercase text-lg mt-8">My Progress</p>
                <div className="flex flex-wrap max-tablet:flex-col w-full max-tablet:gap-4 max-tablet:mt-4 mt-8 gap-4">
                    {muscles.map((muscle, i) => {
                        return <ProgressCard key={i} muscle={muscle} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Progression;