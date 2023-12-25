import { useRef, useState } from 'react'
import './create.css'
import { addExercise } from '../../../api/exercise.mjs'



export default function Create(props) {

    const {setExercise} = props

    const modalRef = useRef(null)
    const [name, updateName] = useState("")
    const [muscle, updateMuscle] = useState("")

    function handleSubmit(){
        addExercise(name, muscle).then((res) => setExercise(res))

        updateName("");
        updateMuscle("");
        modal(false);
    }

    function modal(option) {
        const modal = modalRef.current;

        if (option) {
            return modal.showModal()
        }

        return modal.close()
    }

    return (<>
        <div className="content">
            <div className="section">Workouts</div>
            <button className='create-btn' onClick={() => modal(true)}>Create Exercise</button>

            <dialog className="modal" ref={modalRef}>
                <input type="text" placeholder='Name of Exercise' value={name} onChange={(e) => updateName(e.target.value)} />
                <input type="text" placeholder='Muscle Group' value={muscle} onChange={(e) => updateMuscle(e.target.value)} />
                <button onClick={handleSubmit}>Create!</button>
                <button className='create-btn' onClick={() => modal(false)}>Close</button>
            </dialog>

            <div className="list">
                {name}
                {muscle}
            </div>
        </div>
    </>)
}