import { useState } from 'react'
import './weight.css'
import { addWeight } from '@/api/progression.mjs'

export default function Weight(){
    const [weight, setWeight] = useState(0)

    return (<>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value) } />
        <button onClick={() => addWeight(weight)}>Submit</button>
    </>)
}