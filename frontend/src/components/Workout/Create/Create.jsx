import { useRef, useState } from 'react'
import './create.css'
import { addExercise } from '../../../api/exercise.mjs'



export default function Create(props) {

    const { setExercise, list, rest, updateActive} = props

    const modalRef = useRef(null)
    const [name, updateName] = useState("")
    const [muscle, updateMuscle] = useState("")

    function handleSubmit() {
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
                <div className="create-modal">

                    <div className="section">
                        <div className="title">Create New Exercise</div>
                        <div className="input-modal">
                            <input type="text" placeholder='Name of Exercise' value={name} onChange={(e) => updateName(e.target.value)} />
                            <input type="text" placeholder='Muscle Group' value={muscle} onChange={(e) => updateMuscle(e.target.value)} />
                        </div>
                    </div>

                    <div className="section">
                        <div className="title">Existing Muscle Groups</div>
                        <div className="existing">
                            {list.map((muscle, index) => <div key={index} className='select' onClick={() => updateMuscle(muscle.group)}>{muscle.group}</div>)}
                        </div>
                    </div>



                    <div className="btn-container">
                        <button className='create-btn' onClick={handleSubmit}>Create!</button>
                        <button className='create-btn' onClick={() => modal(false)}>Close</button>
                    </div>
                </div>
            </dialog>
            <div className="all-exercise">
                {rest.map((exercise, index) => <div key={index} className='select' onClick={() => updateActive(exercise.group, exercise._id)}>{exercise.group}</div>)}
            </div>
        </div>
    </>)
}