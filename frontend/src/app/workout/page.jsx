import Sidebar from "@/components/Sidebar/Sidebars"
import { Planner } from "@/components/Workout/Planner"
import Workout from "@/components/Workout/Workout"

export default function dashboard() {
    return (<>
        <div className="main">
            <Sidebar />
            <Planner />
        </div>
    </>)
}