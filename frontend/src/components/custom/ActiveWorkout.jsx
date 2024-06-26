import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ScheduleViewer from "./ScheduleViewer";


export default function ActiveWorkout({ schedule, id, muscle, update }) {

    const limit = 4;


    const trigger = (count) => {
        return (
            <div className="flex w-full bg-white p-2 rounded-md font-bold lowercase border-2 border-indigo-600 shadow-lg justify-around">
                <p className=" truncate ... overflow-hidden">view more</p>
                <span className="text-white bg-indigo-600 rounded-full justify-center items-center flex flex-shrink-0 w-6 h-6 text-sm font-medium">{count}</span>
            </div>
        )
    }

    return (
        <div className='flex w-full justify-evenly relative py-6 px-4 gap-2 rounded-sm bg-indigo-100 z-0'>
            <img src="/card/bg2.png" alt="background" className=' absolute right-0 bottom-0 -z-10 rounded-br-sm ' />
            <img src="/card/bg3.png" alt="background" className=' absolute -left-[59px] -bottom-12 -z-10 rounded-bl-sm scale-75' />

            {schedule.length == 0 ? <p className="w-full h-full flex justify-center items-center text-[3rem] lowercase z-40">
                Create a Schedule
            </p> :

                schedule.map((workout, index) =>
                    <div className='w-full flex flex-col text-center font-bold font-satoshi gap-4  overflow-hidden' key={index}>
                        <p>{workout.day[0]}</p>
                        {workout.exercise.slice(0, limit).map((el, i) => {
                            return (

                                <TooltipProvider key={i} >
                                    <Tooltip >
                                        <TooltipTrigger>
                                            <div className="border-2 h-[2.5rem] bg-black border-indigo-600 shadow-lg justify-center items-center p-2 text-white 
                                     truncate ... overflow-hidden w-full font-normal rounded-sm" >
                                                {el.name}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent >
                                            <div className=" text-black rounded-md">
                                                <p>{el.name}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                        {workout.exercise.slice(limit).length > 0 &&
                            <TooltipProvider>
                                <Tooltip >
                                    <TooltipTrigger>
                                        <ScheduleViewer
                                            id={id}
                                            trigger={trigger(workout.exercise.slice(limit).length)}
                                            muscle={muscle}
                                            update={update}
                                            day={index}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        <div className=" text-black rounded-md">
                                            <p>View All Exercises</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        }
                    </div>)}

        </div>
    )
}
