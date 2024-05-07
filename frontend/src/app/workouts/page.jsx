import ActiveWorkout from "@/components/custom/ActiveWorkout";
import Menu from "@/components/custom/Menu";
import WorkoutCard from "@/components/custom/WorkoutCard";

import { BsBoxArrowUpRight } from "react-icons/bs";
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
                <div className="flex w-full gap-8 h-[40vh] max-tablet:flex-col">
                    <div className="flex w-[65%] h-full max-tablet:hidden ">
                        <ActiveWorkout />
                    </div>
                    <div className="text-white hidden max-tablet:flex w-full bg-indigo-600 p-4 font-medium rounded-sm justify-between items-center">
                        <p className="text-[1.2rem]">ACTIVE</p>
                        <BsBoxArrowUpRight className=" text-[1.5rem]" />
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
            <div className="flex h-full w-full flex-col p-16 pt-0 gap-12 max-tablet:items-center max-tablet:p-8">
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