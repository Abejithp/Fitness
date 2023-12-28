'use client'

import './dashboard.css'
export default function Dashboard() {

    const date = new Date();

    return (<>
        <div className="content-dash">
            <div className="date">
                {date.toUTCString().slice(0, 16)+" :"}
            </div>
            <div className="display">

            </div>
        </div>

    </>)
}