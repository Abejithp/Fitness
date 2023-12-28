import './card.css'

export default function Card(props){
    const {name, id, update} = props

    return (<>
        <div className="card" onClick={() => update(id, name)}>
            <div className="name">{name}</div>
        </div>
    </>)

}