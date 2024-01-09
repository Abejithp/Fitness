import { getWeight } from '@/api/progression.mjs'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'

import './chart.css'
export default function Chart() {
    const [weight, setWeight] = useState([])

    useEffect(() => {
        getWeight().then((res) => {
            const data = res.data.map((item) => item.weight)
            setWeight(data)
        })
    }, [])

    console.log(weight)
    return (<>
        <div className="chart">
            <LineChart
        
                series={[
                    {
                        data: weight,
                        color: "#3F704D",

                    },
                ]}
                width={600}
                height={400}
            />
        </div>

    </>)
}