import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


import { TiDelete } from 'react-icons/ti'
import { Prompt } from './Prompt';


export default function DataTable({ data, deletion, add }) {

    const limit = 5;

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [maxLen, setMaxLen] = useState(data.length)
    const [exercises, setExercises] = useState([]);

    const [creation, setCreation] = useState("");


    useEffect(() => {
        setExercises(data.slice(page * limit, (page + 1) * limit))
        setMaxLen(data.length)
    }, [data])

    useEffect(() => {
        const filtered = data.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
        setExercises(filtered.slice(page * limit, (page + 1) * limit))
        setMaxLen(filtered.length)
    }, [page, search])

    return (
        <div className="flex flex-col relative h-[100%] justify-evenly">
            <div className="flex justify-between max-tablet:flex-col gap-4">
                <input type="text" placeholder='Search for Exercise' className='pl-4 p-1 bg-neutral-900 placeholder:text-neutral-500 rounded-sm
                             font-satoshi h-fit w-fit' autoFocus={false} value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="flex">
                    <input type="text" placeholder='enter exercise name' className='pl-4 p-1 bg-neutral-900 placeholder:text-neutral-500 rounded-l-sm
                             font-satoshi h-fit w-fit' value={creation} onChange={(e) => setCreation(e.target.value)} />
                    <button className='p-1 px-4 rounded-r-sm bg-indigo-600 text-white'
                        onClick={() =>{ add(creation); setCreation('')}}>create</button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Exercise</TableHead>
                        <TableHead className="text-right">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exercises.map((el, i) => (
                        <TableRow key={i} className="text-white">
                            <TableCell>{el.name}</TableCell>
                            <TableCell className="text-indigo-500 text-2xl flex justify-end">
                                <Prompt 
                                    trigger={<TiDelete />} 
                                    update={() => deletion(el._id).then(() => {setExercises(data.slice(page * limit, (page + 1) * limit))})}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination >
                <PaginationContent className="flex w-full justify-evenly">
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious onClick={() => {
                            if (page - 1 >= 0)
                                setPage(page - 1)
                        }} />
                    </PaginationItem>
            
                    <PaginationItem className="cursor-pointer">
                        <PaginationNext onClick={() => {
                            if ((page + 1) * limit < maxLen)
                                setPage(page + 1)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    )
}
