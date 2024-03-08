'use client'
import './main.css'

import { Login, Register } from '../components/Auth/Auth'
import { useRef, useState } from "react";



export default function Home() {

	const loginRef = useRef(null)
	const aboutRef = useRef(null)
	const featureRef = useRef(null)

	function scroll(ref) {
		window.scrollTo({
			top: ref.offsetTop,
			left: 0,
			behavior: "smooth",
		});
	}

	return (
		<div className=" flex-col bg-neutral-900 h-auto font-satoshi overflow-hidden">
			<div className="flex w-full py-[2rem] fixed top-0 justify-center z-[100]">
				<div className="flex p-[1rem] px-[3rem] gap-[2rem] rounded-full text-white bg-indigo-800 w-fit
								font-satoshi font-medium cursor-pointer">
					<div onClick={() => { scroll(aboutRef.current) }} >About</div>
					<div onClick={() => { scroll(featureRef.current) }} >Features</div>
					<div onClick={() => { scroll(loginRef.current) }} >Join</div>
				</div>
			</div>


			<div className="flex h-screen justify-center items-center relative">
				<div className="flex h-[60%] aspect-square bg-blue-700 absolute left-[5%] top-[15%] rounded-full
									blur-[100px] opacity-40"></div>
				<div className="flex h-[70%] aspect-square bg-purple-900 absolute right-[5%] bottom-[5%] rounded-full
									blur-[100px] opacity-30"></div>
				<div className=" text-white text-[13rem] font-satoshi font-normal z-10">
					Inspire
				</div>
			</div>

			<div className="flex h-screen w-auto text-white justify-evenly items-center font-light relative pt-[4rem]" ref={aboutRef}>
				<div className="flex w-[60%] text-[3rem] text-left z-30 absolute left-[10%]">
					Empowering individuals to achieve their fitness goals by providing a personalized and accessible
					platform.
				</div>
				<div className="flex w-[45%] aspect-square justify-center items-center bg-indigo-800 rounded-full absolute right-[-25%] ">
					<img src="./assets/bottle.png" className='h-[120%] scale-x-[-1] rotate-[-15deg] absolute right-[15%] top-[-20%] ' />
				</div>

			</div>

			<div className="flex h-screen text-white justify-center items-center pt-[6rem]" ref={featureRef}>
				<div className="flex h-[70%] aspect-square rounded-full bg-sky-700 blur-[100px] opacity-40">

				</div>
				<div className="flex text-white z-20 absolute font-light text-[3rem]">
					Track your progress and Improve daily
				</div>
			</div>

			<div className="flex h-screen justify-center items-center pt-[6rem]" ref={loginRef}>
				<div className="flex bg-indigo-800 p-16 rounded-2xl shadow-2xl">
					<Login />
				</div>
			
			</div>



		</div>)
}
