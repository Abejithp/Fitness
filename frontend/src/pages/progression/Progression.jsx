import Chart from '@/components/Progression/Chart/Chart';
import Exchart from '@/components/Progression/ExChart/ExChart';
import Weight from '@/components/Progression/Weight/Weight';
import { BarChart } from '@mui/x-charts/BarChart';

import './progress.css'

export default function Progression() {
  

    

    return (<>
        <div className="progress">
            <div className="weight">
                <Weight />
            </div>
            <Exchart /> 
        </div>
        
        {/* <Weight />
        <Chart />
        <Exchart /> */}
    </>)
}