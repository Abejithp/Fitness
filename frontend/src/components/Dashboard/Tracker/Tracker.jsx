import { useState } from 'react'
import './tracker.css'

export default function Tracker(props) {

    const { exercise, active, update } = props

    const [set, updateSet] = useState(0)
    const [rep, updateRep] = useState(0)
    const [weight, updateWeight] = useState(0)

    return (<>
        {active == "" ?
            exercise == "empty" ?
                <div className="tracker none">
                    no workout
                </div>
                : <div className="tracker" onClick={() => update(exercise)}>
                    {exercise}
                </div> :
            active == exercise ?
                <div className="tracker extend">
                    <div className="muscle">Exercise: {exercise}</div>
                    <div className="input-container">
                        <div className="button-container">

                            <input type="number"
                                min={0}
                                value={set}
                                onChange={(e) => {
                                    updateSet(e.target.value);
                                    update(exercise, Number(rep), e.target.value, Number(weight));
                                }}
                            />
                            <div className="title">Sets </div>
                        </div>
                        <div className="button-container">

                            <input type="number"
                                min={0}
                                value={rep}
                                onChange={(e) => {
                                    updateRep(e.target.value);
                                    update(exercise, e.target.value, Number(set), Number(weight));
                                }}
                            />
                            <div className="title">Reps </div>
                        </div>
                        <div className="button-container">

                            <input type="number"
                                min={0}
                                value={weight}
                                onChange={(e) => {
                                    updateWeight(e.target.value);
                                    update(exercise, Number(rep), Number(set), e.target.value);
                                }}
                            />
                            <div className="title">Weight</div>
                        </div>
                    </div>
                    <div className="tip">
                        click to record information
                    </div>
                    <div className="cancel" onClick={() => update("")}>
                        X
                    </div>
                </div> :
                <></>
        }
    </>)
}