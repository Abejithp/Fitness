import { getWeight } from '@/api/progression.mjs'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'

import './chart.css'
export default function Chart() {
    const [weight, setWeight] = useState([])
    const [width, setWidth] = useState(Math.max(window.innerWidth*.4, 350))


    useEffect(() => {
        getWeight().then((res) => {
            const data = res.data.map((item) => item.weight)
            setWeight(data)
        })
    }, [])

    useEffect(() => {
        function handleResize() {
            setWidth(Math.max(window.innerWidth*.4, 350))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (<>
        <div className="chart">
            <LineChart
        
                series={[
                    {
                        data: weight,
                        color: "#3F704D",

                    },
                ]}
                width={width}
                height={width*(2/3)}
            />
        </div>

    </>)
}