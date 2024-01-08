import { getWeight } from '@/api/progression.mjs'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'

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
        <LineChart
      
            series={[
                {
                    data: weight,
                },
            ]}
            width={500}
            height={300}
        />
    </>)
}