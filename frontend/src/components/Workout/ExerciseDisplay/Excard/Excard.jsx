import './excard.css'

export default function Excard(props) {
    const { group, id, active, updateActive } = props


    return (<>
        {(active.name == "") ?

            (id == -1) ?
                (<div className="excard empty">
                    {group}
                </div>) :
                (<div className="excard" onClick={() => updateActive(group, id, "main")}>
                    {group}
                </div>) :

            (active.name == group) ?

                <div className='excard extend' onClick={() => updateActive("", -1, "")}>
                    <div className="title">Muscle Group: {group}</div>
                    <div className="exercises">
                        {active.muscle.map((exercise, index) => <div key={index} className="exercise">{exercise.name}</div>)}
                    </div>
                </div> :

                <></>


        }


    </>)
}