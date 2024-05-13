'use client'

import { getMuscles } from "@/api/exercise.mjs";
import Navbar from "@/components/custom/Navbar";
import ProgressCard from "@/components/custom/ProgressCard";
import Summary from "@/components/custom/Summary";

import { useEffect, useState } from "react";


function Progression() {

    const [muscles, setMuscles] = useState([]);

    useEffect(() => {
        getMuscles().then((res) => {
            setMuscles(res.data);
        })
    }, [])

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Navbar />
            <div className="flex flex-col text-white font-satoshi pt-32 px-16 max-tablet:px-8 w-full">

                <p className="font-medium uppercase text-lg">Weekly Summary</p>
                <Summary />
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