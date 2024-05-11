'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { logout } from '@/api/auth.mjs'


const variants = {
    open: {
        width: 350,
        height: 550,
        top: "-10px",
        right: "-10px",
        padding: "2rem",
        display: 'flex',
    },
    closed: {
        width: 70,
        height: 30,
        top: 8,
        right: 5,
        display: 'none',
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

export default function Menu() {
    const [open, setOpen] = useState(false)

    return (
  
            <div className="flex relative h-fit items-center z-50">
                <div className={`flex text-lg p-2 px-4 min-w-[83px] bg-black border-2 border-indigo-600 font-medium rounded-md  cursor-pointer text-white`}
                    onClick={() => setOpen(!open)}>
                    {open ? <>
                    close</>: <>menu</>}
                </div>



                <motion.div
                    initial={false}
                    animate={open ? 'open' : 'closed'}
                    variants={variants}
                    transition={{ duration: 0.7, ease: [0.75, 0, 0.24, 1] }}
                    className={`absolute bg-indigo-600 flex flex-col text-white shadow-md gap-4 -z-10 rounded-md max-tablet:`}
                >
                    <motion.div className={`flex min-h-[80%] items-center  ${!open ? 'hidden' : 'flex'}`}
                        variants={variantsMenu}
                        animate={open ? 'enter' : 'exit'}
                        exit={"exit"}
                        initial="initial">
                        <div className="flex flex-col gap-2">
                            <div className="flex text-lg border-b-2 border-white pb-1 w-full mb-4">
                                navigation
                            </div>
                            <div className="flex flex-col gap-3 text-[2rem]">
                                <a href="dashboard">DASHBOARD</a>
                                <a href="workouts">WORKOUTS</a>
                                {/* <a href="progression">PROGRESSION</a> */}
                                <button onClick={() => logout().then(()=> window.location.href = '/')} className='w-full text-left'>LOGOUT</button>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className={`grid h-full border-t-2 border-white text-white p-4 grid-rows-2 grid-cols-2 gap-4 ${!open ? 'hidden' : 'grid'}`}
                        variants={variantsMenu}
                        animate={open ? 'enter' : 'exit'}
                        exit={"exit"}
                        initial="initial"

                    >
                        <a href='https://www.linkedin.com/in/abejithp/' className='hover:underline justify-self-center'>LinkedIn</a>
                        <a href='https://github.com/Abejithp' className='hover:underline justify-self-center'>Github</a>
                        <div className="col-span-2 justify-self-center font-medium ">Developed by Abejith Pratheepan</div>
                    </motion.div>
                </motion.div>
            </div>
      


    )
}
