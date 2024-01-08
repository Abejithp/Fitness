import Chart from '@/components/Progression/Chart/Chart';
import Weight from '@/components/Progression/Weight/Weight';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Progression() {
    return (<>
        <Weight />
        <Chart />
    </>)
}