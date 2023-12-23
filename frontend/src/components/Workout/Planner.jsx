'use client'
import { addWorkout, getWorkout } from "@/api/workout.mjs";
import { useEffect, useRef, useState } from "react"
import './planner.css'

export function Planner() {

    const [workouts, setWorkout] = useState([]);

    useEffect(() => {
        getWorkout().then((res) => setWorkout(res))
    }, [])

    let key = 0;
    return (<>
    
        <div className="content">
            <div className="workout-section">
                <div className="title">My Workout Plans</div>
            </div>

            <div className="workout-section">
                <div className="title">Community Workouts</div>
            </div>
        </div>

    </>)
}