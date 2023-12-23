'use client'

import Link from 'next/link'
import './sidebar.css'
import { logout } from '@/api/auth.mjs'
import { Logout } from '../Auth/Auth'


export default function Sidebar(){
    return(<>
        <div className="sidebar">
            <div className="title">Inspire</div>
            <div className="link-container">
                {/* <Link href="/" className='link' onClick={() => logout}>Home</Link> */}
         
                <Link href="/dashboard" className='link'>Dashboard</Link>
                <Link href="/workout" className='link'>Workouts</Link>
                <Logout className='link'/>
            </div>
        </div>
    </>)
}