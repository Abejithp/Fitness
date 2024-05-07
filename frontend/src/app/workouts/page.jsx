import ActiveWorkout from "@/components/custom/ActiveWorkout";
import Menu from "@/components/custom/Menu";
import WorkoutCard from "@/components/custom/WorkoutCard";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function Workout() {
    return (
        <div className="flex min-h-svh bg-neutral-950 w-full font-satoshi flex-col">
            <Menu />
            <div className="flex p-16 flex-col">
                <div className="flex text-white uppercase font-bold text-lg w-full mb-4">My Workouts</div>
                <div className="flex w-full gap-8 h-[40vh]">
                    <div className="flex w-[65%] h-full max-tablet:hidden ">
                        <ActiveWorkout />
                    </div>
                    <div className="flex w-[40%] h-full  max-tablet:w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Activate</TableHead>
                                    <TableHead>View</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </div>
                </div>

            </div>
            <div className="flex h-full w-full flex-col px-16 gap-12 max-tablet:items-center max-tablet:px-8">
                <div className="flex text-white uppercase font-bold text-lg w-full">My Exercises</div>
                <div className="flex gap-6 max-tablet:flex-col w-fit max-tablet:gap-3">
                    <WorkoutCard muscle={'chest'} bg={'g1'} />
                    <WorkoutCard muscle={'Legs'} bg={'g2'} />
                    <WorkoutCard muscle={'back'} bg={'g3'} />
                </div>
            </div>


        </div>
    );
}

export default Workout;