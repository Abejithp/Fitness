'use client'

export default function Exercises({exercise}) {
    return (
        <div className='flex flex-col gap-2'>
            {exercise.map((el) =>{
                return  ( 
                <div className="flex border-2  bg-black border-indigo-600 justify-center items-center p-2 text-white font-normal rounded-sm" >
                    {el.name}
                </div>)
            })}
          
        </div>
    )
}
