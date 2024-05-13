'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Popup from "./popup"

import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react";
import { getToday } from "@/api/progression.mjs";



export function Tracker() {

  const [workout, setData] = useState({ loaded: false, data: [] });

  useEffect(() => {
    const day = new Date().getDay();
    getToday(day).then((res) => {
      if(!res.data){
        setData({loaded: true, data: []})
        return;
      }
      setData({ loaded: true, data: res.data.exercise })
    })
  }, [])


  return (<>
    {!workout.loaded ? <div className="flex flex-col flex-shrink-0 w-full">
      <Skeleton className={" flex flex-shrink-0 h-[60px] w-full bg-neutral-800"} />
    </div> :

      (workout.data.length) === 0 ?
        <div className="flex justify-center h-[300px]  text-center items-center text-[max(4rem,calc(100vw/20))] font-satoshi uppercase font-semibold text-neutral-600 
                        max-laptop:text-[4rem] max-tablet:text-[2rem] max-tablet:mt-[5rem] max-tablet:h-[200px]">
          No Workouts Today

        </div> :
        <Table className="z-0">
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>
              <TableHead className="max-tablet:hidden">Status</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.data.map((data, i) => (
              <TableRow key={i} className="text-white">

                <TableCell className="">{data.name}</TableCell>
                <TableCell className="text-orange-400 max-tablet:hidden">In Progress</TableCell>
                <TableCell >
                  <Popup data={data} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
    }


  </>)
}


export async function getStaticProps() {
  const res = await getActive()
  const data = await res.json()

  return { props: { data } }
}

