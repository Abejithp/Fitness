import './taskbar.css'

export default function Taskbar(props) {
    const { updateTab } = props;

    return (<>
        <div className="taskbar">
            <div className="link-container">
                <div className="link" onClick={() => updateTab("Dashboard")}>Dashboard</div>
                <div className="link" onClick={() => updateTab("Workout")}>Workout</div>
                <div className="link" onClick={() => updateTab("Progression")}>Progression</div>
            </div>
        </div>
    </>)
}