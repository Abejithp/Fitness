import './card.css'

export default function Card(props){
    const {name, muscle, id, update} = props

    return (<>
        <div className="card" onClick={() => update(id)}>
            <div className="name">{name}</div>
            <div className="muscle">{muscle}</div>
        </div>
    </>)

}