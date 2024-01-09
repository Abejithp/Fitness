import { useState } from 'react'
import './tracker.css'
import { update } from '@/api/progression.mjs'

export default function Tracker(props) {

    const { exercise } = props

    const [set, updateSet] = useState(0)
    const [rep, updateRep] = useState(0)
    const [weight, updateWeight] = useState(0)

    return (<>
        <div className="tracker">
            <div className="muscle">{exercise.name}</div>
            <div className="button-container">
                <div className="title">Sets: </div>
                <input type="number"
                    min={0}
                    value={set}
                    onChange={(e) => {
                        updateSet(e.target.value);
                        update(exercise.name, Number(rep), e.target.value, Number(weight));
                    }}
                />
            </div>
            <div className="button-container">
                <div className="title">Reps: </div>
                <input type="number"
                    min={0}
                    value={rep}
                    onChange={(e) => {
                        updateRep(e.target.value);
                        update(exercise.name, e.target.value, Number(set), Number(weight));
                    }}
                />
            </div>
            <div className="button-container">
                <div className="title">Weight: </div>
                <input type="number"
                    min={0}
                    value={weight}
                    onChange={(e) => {
                        updateWeight(e.target.value);
                        update(exercise.name, Number(rep), Number(set), e.target.value);
                    }}
                />
            </div>
        </div>
    </>)
}