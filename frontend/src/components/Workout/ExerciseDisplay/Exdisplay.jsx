import { useState } from 'react'
import Create from '../Create/Create'
import Excard from './Excard/Excard'
import './exdisplay.css'
import { getActiveMuscle } from '@/api/exercise.mjs'

export default function Exdisplay(props) {

    const { muscle, rest, setExercise } = props
    const [active, updateActive] = useState({ name: "", muscle: [], type: ""})


    let style = active.name != "" ? "card-container flex" : "card-container"

    return (<>
        <div className="exercise-container">
            <div className="section">

                <div className="remaining">
                    <Create
                        setExercise={setExercise}
                        list={muscle}
                        rest={rest}
                        updateActive={(group, id) => getActiveMuscle(id).then((res) => { updateActive({ name: group, muscle: res.data, type: "rest" }) })}
                    />
                </div>
            </div>
            <div className="section">
                <div className="title">My Exercises</div>
                <div className={style}>
                    {muscle.map((muscle, index) =>
                        <Excard
                            key={index}
                            group={muscle.group}
                            id={muscle._id}
                            active={active}
                            updateActive={(group, id) => getActiveMuscle(id).then((res) => { updateActive({ name: group, muscle: res.data, type: "main" }) })}
                        />)}
                    {Array.from({ length: 6 - muscle.length }, (_, i) => <Excard key={i} group={"empty"} id={-1} active={active} />)}
                </div>
            </div>




        </div>
    </>)
}