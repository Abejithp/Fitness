import { getExercise } from "@/api/exercise.mjs"
import { useEffect, useState } from "react"
import ProgressCard from "./ProgressCard/ProgressCard"

import "./exChart.css"

export default function Exchart() {

    const [exercises, setExercise] = useState([])
    const [filter, updateFilter] = useState("");

    useEffect(() => {
        getExercise().then((res) => setExercise(res))
    }, [])


    return (<>
        <div className="chart-container">
            <div className="title">Exercise Progress</div>
            <div className="chart-display">
                {exercises.map((exercise, index) => <ProgressCard key={index} name={exercise.name} />)}
                {Array.from({ length: 4 - exercises.length }, (_, i) => <ProgressCard key={i} name={"empty"}/>)}
            </div>
            <div className="navi-container">
                <input type="text" value={filter} onChange={(e) => updateFilter(e.target.value)} />
                <div className="pagination">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
            </div>
        </div>

    </>)
}