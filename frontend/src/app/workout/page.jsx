'use client'

import Navi from "@/components/Navigation/Navigation"
import Sidebar from "@/components/Sidebar/Sidebars"
import { Planner } from "@/components/Workout/Planner"

import './workout.css'
import { useState } from "react"
import Create from "@/components/Workout/Create"

export default function workout() {

    const [tab, updateTab] = useState('home')

    return (<>
        <div className="main">
            <Sidebar />

            <div className="workout-content">
                <Navi updateTab = {updateTab}/>
                {tab == 'home' ? <Planner /> : <Create />}
                
            </div>
        </div>
    </>)
}