import './dashboard.css'

import { useState, useEffect } from 'react';

import Tracker from '@/components/Dashboard/Tracker/Tracker';
import { getActive } from '@/api/progression.mjs';

export default function Dashboard() {

    const date = new Date();


    const [arr, updateArr] = useState([])



    useEffect(() => {
        getActive().then((res) => updateArr(res.data.exercise))
    }, [])


    return (<>
        <div className="content-dash">

            <div className="container-dash">
                <div className="date">
                    {date.toUTCString().slice(0, 16)}
                </div>
                
                <div className="display">
                    {arr.map((exercise, i) => <Tracker key={i} exercise={exercise} />)}
                </div>
            </div>


        </div>

    </>)
}