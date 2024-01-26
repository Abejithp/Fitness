import { useRef, useState } from 'react'
import './create.css'
import { addExercise } from '../../../api/exercise.mjs'



export default function Create(props) {

    const {setExercise, list} = props

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
            <div className='create' onClick={() => modal(true)}>Create Exercise</div>

            <dialog className="modal" ref={modalRef}>
                <input type="text" placeholder='Name of Exercise' value={name} onChange={(e) => updateName(e.target.value)} />
                <input type="text" placeholder='Muscle Group' value={muscle} onChange={(e) => updateMuscle(e.target.value)} />

                {list.map((muscle, index) => <div key={index} className='select' onClick={()=> updateMuscle(muscle.group)}>{muscle.group}</div>)}

                <button onClick={handleSubmit}>Create!</button>
                <button className='create-btn' onClick={() => modal(false)}>Close</button>
            </dialog>
            <div className="all-exercise">
                
            </div>
        </div>
    </>)
}