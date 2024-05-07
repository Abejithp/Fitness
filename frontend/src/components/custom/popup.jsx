'use client'

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { LineChart } from "@mui/x-charts";
import Input from "./input";



function Popup({ data }) {
    return (
        <Drawer>
            <DrawerTrigger className=" w-fit text-white box-border ">Open</DrawerTrigger>
            <DrawerContent className=" max-h-[600px] h-[60vh]  bg-slate-600 border-slate-700">
                <div className="flex w-full h-full justify-center  p-16 box-border">
                    <div className="flex flex-col w-[50%] h-full flex-grow-0 flex-shrink-0">
                        <div className="flex text-[5rem] text-slate-400 font-satoshi uppercase font-medium">
                            {data.name}
                        </div>
                        <div className=" block w-[75%] h-full bg-slate-500 rounded-md">
                            <LineChart series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                }
                            ]} />
                        </div>
                    </div>

                    <div className="flex w-[50vw] h-full">
                        <Input />
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default Popup;