import './dashboard.css'

import { useState, useEffect } from 'react';

import Tracker from '@/components/Dashboard/Tracker/Tracker';
import { getActive } from '@/api/progression.mjs';

export default function Dashboard() {

    const date = new Date();


    const [arr, updateArr] = useState([])
    const [active, updateActive] = useState("")
    const [filter, updateFilter] = useState([])

    const [pageNum, updatePage] = useState(0)

    const style = active != "" ? "display flex" : "display"


    useEffect(() => {
        getActive().then((res) => {
            updateArr(res.data.exercise)
            updateFilter(res.data.exercise.slice(0, 4))
        })

    }, [])

    useEffect(() => {
        updateFilter(arr.slice(pageNum * 4, pageNum * 4 + 4))
    }, [pageNum])


    return (<>
        <div className="content-dash">

            <div className="container-dash">
                <div className="date">
                    {date.toDateString()}
                </div>

                <div className={style}>
                    {filter.map((exercise, i) =>
                        <Tracker
                            key={i}
                            exercise={exercise.name}
                            active={active}
                            update={updateActive}
                        />)}
                    {Array.from({ length: 4 - filter.length }, (_, i) => <Tracker key={i} exercise={"empty"} active={active} update={updateActive} />)}
                </div>
                <div className="pagination dash">
                    <div className="btn" onClick={() => {
                        if (pageNum - 1 >= 0) {
                            updatePage(pageNum - 1)
                        }

                    }}><img src='./arrow.png' className='left' /></div>
                    <div className="btn" onClick={() => {
                        console.log(arr)
                        if ((pageNum + 1) * 4 < arr.length) {
                            updatePage(pageNum + 1)
                        }
                    }}><img src='./arrow.png' /></div>
                </div>
            </div>


        </div>

    </>)
}