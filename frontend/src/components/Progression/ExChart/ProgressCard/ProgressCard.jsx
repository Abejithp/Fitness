import { useRef, useState } from "react"
import { LineChart } from "@mui/x-charts";
import { getExProgress } from "@/api/progression.mjs";
import "./progressCard.css"
export default function ProgressCard(props) {

    const { name } = props
    
    const style = name == "empty" ? "card-progress empty": "card-progress"

    const modalRef = useRef(null)
    const [data, setData] = useState([])

    function modal(option) {
        const modal = modalRef.current;

        if (option) {
            return modal.showModal()
        }

        return modal.close()
    }

    return (<>
        <div className={style} onClick={() => {
            modal(true && name != "empty");
            getExProgress(name).then((res) => {
                setData(res.data)
            })
        }
        }>
            {name}
        </div>

        <dialog className="modal progressCard" ref={modalRef}>
            <div className="line-chart">
                <LineChart
                    width={1000}
                    height={600}
                    series={[
                        { data: data, label: 'Preformance' },
                    ]}

                />
            </div>
            <button onClick={() => modal(false)}>X</button>
        </dialog>
    </>)
}