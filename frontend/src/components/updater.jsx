import { FaArrowUp } from "react-icons/fa";

function Updater({name, update}) {
    return ( <>
     <div className="flex text-neutral-500 font-satoshi gap-5 items-center w-full justify-between">
        <button onMouseDown={()=> { update(1)}} className="bg-neutral-500 w-[40px] h-[40px] rounded-full">
            <FaArrowUp className="text-neutral-900 w-full text-[1.5rem]"/>
        </button>
        <div className="flex text-[2rem]">{name}</div>
        <button onClick={()=>update(-1)} className="bg-neutral-500 w-[40px] h-[40px] rounded-full">
            <FaArrowUp className="text-neutral-900 w-full text-[1.5rem] transform rotate-180"/>
        </button>
     </div>
    </> );
}

export default Updater;