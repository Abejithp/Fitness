import './navigation.css'

export default function Navi(props){
    const {updateTab} = props
    return(<>
        <div className="navigation">
            <div className="title" onClick={() => updateTab('home')}>home</div>
            <div className="title" onClick={() => updateTab('create')}>create</div>
        </div>
    </>)
}