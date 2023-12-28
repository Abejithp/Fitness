import './column.css'

export default function Column(props) {
    const {day, exercise} = props

    return (<>
        <div className="column">
            <div className="label">{day}</div>
            <div className="exercises">
                {exercise.length == 0 ? <div className='empty'>Rest Day</div> :  exercise.map((item, index) => <div key={index} className='card-work'> {item.name} </div>)}
               
            </div>
        </div>
    </>)
}