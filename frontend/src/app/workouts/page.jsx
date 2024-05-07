import Menu from "@/components/custom/Menu";
import WorkoutCard from "@/components/custom/WorkoutCard";

function Workout() {
    return (
        <div className="flex min-h-screen bg-neutral-950 w-full font-satoshi flex-col">
            <Menu />
            <div className="flex h-full w-full flex-col p-10 gap-10">
            <div className="flex text-white">My Exercises</div>
            <div className="flex gap-8">
                <WorkoutCard muscle={'chest'} bg={'g1'} />
                <WorkoutCard muscle={'Legs'} bg={'g2'} />
                <WorkoutCard muscle={'back'} bg={'g3'} />
            </div>
            </div>
        
            
        </div>
    );
}

export default Workout;