'use client'
import React, { useEffect } from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosAdd } from "react-icons/io";
import { getActiveMuscle } from '@/api/exercise.mjs';

import { TbArrowBackUp } from "react-icons/tb";

import MuscleTable from './MuscleTable';

const variants = {
    open: {
        width: 340,
        height: 420,
        top: "-10px",
        left: "-10px",
        padding: "2rem",
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

export default function WorkoutSelection({ muscle, update }) {
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
            <div className={`flex text-[1.5rem] p-2 bg-black border-2 border-indigo-600 font-medium rounded-md cursor-pointer text-white`}
                onClick={() => { setOpen(!open); setActive(null) }}>
                <IoIosAdd className={`${open ? 'rotate-45' : ''} transition-transform duration-500`} />
            </div>



            <motion.div
                initial={false}
                animate={open ? 'open' : 'closed'}
                variants={variants}
                transition={{ duration: 0.7, ease: [0.75, 0, 0.24, 1] }}
                className={`absolute bg-black flex flex-col  text-white -z-10 rounded-md`}
            >
                <motion.div className={`flex h-full  ${!open ? 'hidden' : 'flex'}`}
                    variants={variantsMenu}
                    animate={open ? 'enter' : 'exit'}
                    exit={"exit"}
                    initial="initial">

                    {(!active) ? <div className="flex flex-col gap-2 w-full justify-center h-full pt-6">
                        {muscle.map((el, i) =>
                            <button className="flex uppercase font-satoshi text-[1.5rem] py-2 font-medium 
                              text-white w-full pl-4 cursor-pointer"
                                onClick={() => { setActive(el); setExercises([]) }} key={i}
                            >
                                {el.group}
                            </button>
                        )}
                    </div> :

                        <div className="flex-col flex w-full h-full gap-4">
                            <p className=' text-[2rem] uppercase absolute top-3 left-[25%]'>
                                {active.group}
                            </p>

                            <div className="flex-col flex absolute top-[17%] h-[80%] overflow-hidden w-[85%] px-1">
                                <MuscleTable data={exercises} update={(exercise) => update(exercise)}/>
                                {/* {exercises.map((exercise, i) => {
                                    return <button className="flex text-white text-lg uppercase" onClick={() => update(exercise)} key={i}>
                                        {exercise.name}
                                    </button>
                                })} */}
                            </div>
                            <button className="flex absolute top-4 right-4" onClick={() => setActive(null)}>
                                <TbArrowBackUp className='text-[2rem]' />
                            </button>
                        </div>

                    }

                </motion.div>
            </motion.div>
        </div>
    )
}




