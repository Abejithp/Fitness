import Exchart from '@/components/Progression/ExChart/ExChart';
import Weight from '@/components/Progression/Weight/Weight';

import './progress.css'

export default function Progression() {
    return (<>
        <div className="progress">
            <div className="weight">
                <Weight />
            </div>
            <Exchart /> 
        </div>
    </>)
}