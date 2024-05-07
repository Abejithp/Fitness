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
import { getActive } from "@/api/progression.mjs"
import { Skeleton } from "./ui/skeleton"
import { useEffect, useState } from "react";



export function Tracker() {

  const [workout, setData] = useState({ loaded: false, data: [] });

  useEffect(() => {
    getActive().then((res) => {
      setData({ loaded: true, data: res.data.exercise })
      console.log(res.data.exercise)
    })
  }, [])


  return (<>
    {!workout.loaded ? <div className="flex flex-col flex-shrink-0 gap-4 w-full  pt-8">
      <Skeleton className={" flex flex-shrink-0 h-[60px] w-full bg-neutral-800"} />
      <div className="flex flex-col gap-3">
        {Array(3).fill(0).map((_, index) => {
          return (<div className="flex gap-2" key={index}>
            <Skeleton key={index} className={"h-[50px] w-[100px] bg-neutral-800"} />
            <Skeleton key={index} className={"h-[50px] w-[100px] bg-neutral-800 max-tablet:hidden"} />
            <Skeleton key={index} className={"h-[50px] w-full bg-neutral-800"} />
            <Skeleton key={index} className={"h-[50px] w-[150px] bg-neutral-800"} />
          </div>

          )
        })}
      </div>

    </div> :

      (workout.data.length) === 0 ?
        <div className="flex justify-center h-[300px]  text-center items-center text-[max(4rem,calc(100vw/20))] font-satoshi uppercase font-semibold text-neutral-600 
                        max-laptop:text-[4rem] max-tablet:text-[2rem] max-tablet:mt-[5rem] max-tablet:h-[200px]">
          No Workouts Today

        </div> :
        <Table className="mt-8 z-0">
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>
              <TableHead className="max-tablet:hidden">Status</TableHead>
              <TableHead>Popup</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.data.map((data, i) => (
              <TableRow key={i} className="text-white">

                <TableCell className="max-tablet:hidden">{data.name}</TableCell>
                <TableCell className=" text-orange-400">In Progress</TableCell>
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

