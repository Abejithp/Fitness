import React from 'react'
import Menu from './Menu'

export default function Navbar() {
    return (
        <div className='w-full flex fixed top-0 justify-between p-8 px-16 max-tablet:px-8 z-50 bg-neutral-950 items-center'>
            <div className="flex text-white gap-2 items-center">
                <img src="logo.png" alt="logo" className="h-8" />
                <p className="text-[2rem] font-bold">INSPIRE</p>
            </div>

            <Menu />
        </div>
    )
}
