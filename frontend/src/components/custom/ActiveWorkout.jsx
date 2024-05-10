export default function ActiveWorkout({ schedule }) {

    return (
        <div className='flex w-full relative py-6 px-4 gap-2 rounded-sm bg-indigo-100 z-10'>
            <img src="/card/bg2.png" alt="background" className=' absolute right-0 bottom-0 rounded-br-sm ' />
            <img src="/card/bg3.png" alt="background" className=' absolute -left-[59px] -bottom-12 rounded-bl-sm scale-75' />

            {schedule.length == 0 ? <p className="w-full h-full flex justify-center items-center text-[3rem] lowercase z-40">
                    Create a Schedule
            </p> :

                schedule.map((workout, index) => <div className='w-full flex flex-col text-center font-bold font-satoshi gap-4 z-10 overflow-hidden' key={index}>
                    <p>{workout.day[0]}</p>
                    {workout.exercise.map((el) => {
                        return (
                            <div className="flex border-2  bg-black border-indigo-600 justify-center items-center p-2 text-white font-normal rounded-sm" >
                                {el.name}
                            </div>)
                    })}
                </div>)}

        </div>
    )
}
