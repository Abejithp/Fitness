import { useRef, useState } from 'react'
import Card from '../Workout/Card/Card';
export default function Modal(props) {

    const { day, exercises, update} = props
    const modalRef = useRef(null)

    function handleSubmit() {
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

        <button className='create-btn' onClick={() => modal(true)}>{day}</button>

        <dialog className="modal" ref={modalRef}>
            <div className="exercises">
                {exercises.map((item, index) => <Card key={index} name={item.name} muscle={item.muscleGroup} id={item._id} update={update}/>)}
            </div>
            <button onClick={handleSubmit}>Create!</button>
            <button onClick={() => modal(false)}>Close</button>
        </dialog>

    </>)
}