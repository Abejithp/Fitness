import { getExercise } from "@/api/exercise.mjs"
import { useEffect, useState } from "react"
import ProgressCard from "./ProgressCard/ProgressCard"

import "./exChart.css"

export default function Exchart() {

    const [exercises, setExercise] = useState([])
    const [search, updateSearch] = useState("");
    const [filter, udpateFilter] = useState([])
    const [pageNum, updatePage] = useState(0)


    useEffect(() => {
        getExercise().then((res) => {
            setExercise(res)
            udpateFilter(res.slice(pageNum * 4, pageNum * 4 + 4));
        })
    }, [])


    useEffect(() => {
        const filtered = exercises.filter(
            ({ name }) =>
                name.toLowerCase().includes(search.toLowerCase())
        );
        
        udpateFilter(filtered.slice(pageNum * 4, pageNum * 4 + 4));

    }, [search, pageNum])

    return (<>
        <div className="chart-container">
            <div className="title">Exercise Progress</div>
            <div className="chart-display">
                {filter.map((exercise, index) => <ProgressCard key={index} name={exercise.name} />)}
                {Array.from({ length: 4 - filter.length }, (_, i) => <ProgressCard key={i} name={"empty"}/>)}
            </div>
            <div className="navi-container">
                <input placeholder="Search for Exercise" type="text" value={search} onChange={(e) => updateSearch(e.target.value)} />
                <div className="pagination">
                    <div className="btn" onClick={() => {
                            if (pageNum - 1 >= 0) {
                                updatePage(pageNum - 1)
                            }
                        }}>
                        <img className="left" src="./arrow.png"  />
                    </div>
                    <div className="btn" onClick={() => {
                            if ((pageNum + 1) * 4 <= exercises.length) {
                                updatePage(pageNum + 1)
                            }
                        
                        }} >
                        <img src="./arrow.png"  />
                    </div>
                </div>
            </div>
        </div>

    </>)
}