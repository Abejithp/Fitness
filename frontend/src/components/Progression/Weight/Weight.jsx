import { useState } from 'react'
import './weight.css'
import { addWeight } from '@/api/progression.mjs'
import Chart from '../Chart/Chart'

import './weight.css'
export default function Weight() {
    
    const [weight, setWeight] = useState(0)

    return (<>
        <div className="weight-container">
            <div className="title">Weight Progress</div>
            <Chart />
            <div className="btn-container">
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <button onClick={() => addWeight(weight)}>Add Weight</button>
            </div>
        </div>

    </>)
}