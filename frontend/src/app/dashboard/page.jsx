import Sidebar from "@/components/Sidebar/Sidebars"
import { Planner } from "@/components/Workout/Planner"
import Workout from "@/components/Workout/Workout"


export default function dashboard() {
    return (<>
        {/* <Planner /> */}
        <div className="main">
            <Sidebar />
            <Workout name="bench" muscle="chest" />
        </div>
    </>)
}