import { getSummary } from '@/api/progression.mjs';
import React, { useEffect, useState } from 'react'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"





export default function Summary() {

    const [data, setData] = useState([]);

    useEffect(()=> {
        getSummary().then((res) => {
            setData(res.data)
        });
    }, [])

    return (
        <div className="flex h-[300px] mt-4 bg-neutral-950 rounded-sm">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Tooltip />
                    <XAxis dataKey={"day"} tickLine={false} tickMargin={8}/>
                    <Bar
                        dataKey="volume"
                        style={
                            {
                                fill: "#4f46e5",
                                opacity: 0.9,
                            }
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}
