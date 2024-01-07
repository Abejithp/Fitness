'use client'

import Taskbar from "@/components/Taskbar/Taskbar"
import './dashboard.css'
import { useState } from "react"

import Dashboard from "@/pages/dashboard/Dashboard"
import Workout from "@/pages/workout/Workout"
import Progression from "@/pages/progression/Progression"


export default function dashboard() {
    const [tab, updateTab] = useState("Dashboard");
    const [active, updateWorkout] = useState("");

    return (<>
        <div className="main">
            <Taskbar updateTab={updateTab} />

            <div className="content">
                {(tab=="Dashboard" ? <Dashboard /> : tab =="Workout"? <Workout /> : <Progression />)}
            </div>
        </div>
    </>)
}