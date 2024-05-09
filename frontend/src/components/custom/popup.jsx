'use client'

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

import Input from "./input";



function Popup({ data }) {
    return (
        <Drawer>
            <DrawerTrigger className=" w-fit text-white ">Track</DrawerTrigger>
            <DrawerContent className=" max-h-[600px] h-[60vh]  bg-neutral-950 border-neutral-900">
                <div className="flex w-full h-full justify-center text-white font-satoshi p-16">
                    {data.name}
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default Popup;