'use client'
import React, { useEffect } from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosAdd } from "react-icons/io";
import { getActiveMuscle, getExercise } from '@/api/exercise.mjs';


const variants = {
    open: {
        width: 400,
        height: 500,
        top: "-10px",
        left: "-10px",
        padding: "2rem",
        paddingTop: '4rem',
        display: 'flex',
    },
    closed: {
        width: 30,
        height: 30,
        top: 5,
        left: 5,
        display: 'none',
        padding: '0rem',

    }
}

const variantsMenu = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            delay: 0.4,
        }
    },
    exit: {
        opacity: 0,
    }
}

export default function WorkoutSelection({ muscle, update}) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (!active) {
            return;
        }

        getActiveMuscle(active._id).then((res) => setExercises(res.data))

    }, [active]);


    return (

        <div className="flex relative h-fit items-center z-50">
            <div className={`flex text-[1.5rem] p-2 bg-black border-2 border-indigo-600 font-medium rounded-md  cursor-pointer text-white`}
                onClick={() => setOpen(!open)}>
                <IoIosAdd />
            </div>



            <motion.div
                initial={false}
                animate={open ? 'open' : 'closed'}
                variants={variants}
                transition={{ duration: 0.7, ease: [0.75, 0, 0.24, 1] }}
                className={`absolute bg-indigo-600 flex flex-col justify-center text-white shadow-md gap-4 -z-10 rounded-md p-4`}
            >
                <motion.div className={`flex min-h-[80%] items-center  ${!open ? 'hidden' : 'flex'}`}
                    variants={variantsMenu}
                    animate={open ? 'enter' : 'exit'}
                    exit={"exit"}
                    initial="initial">

                    {(!active) ? <div className="flex flex-col gap-2 w-full">
                        {muscle.map((el) =>
                            <button className="flex uppercase font-satoshi text-[2rem] py-2 font-medium 
                            border-b-2 w-full pl-4 cursor-pointer"
                                onClick={() => {setActive(el); setExercises([])}}
                            >
                                {el.group}
                            </button>
                        )}
                    </div> :

                        <div className="flex-col">
                            {active.group}
                            <div className="flex-col">
                                {exercises.map((exercise) => {
                                    return <button className="flex text-white" onClick={() => update(exercise._id)}>
                                        {exercise.name}
                                    </button>
                                })}
                            </div>
                            <button className="flex" onClick={() => setActive(null)}>
                                home
                            </button>
                        </div>

                    }

                </motion.div>
            </motion.div>
        </div>
    )
}




