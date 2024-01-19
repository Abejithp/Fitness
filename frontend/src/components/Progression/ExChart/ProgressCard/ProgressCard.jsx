import { useEffect, useRef, useState } from "react"
import { LineChart } from "@mui/x-charts";
import { getExProgress } from "@/api/progression.mjs";
import "./progressCard.css"
export default function ProgressCard(props) {

    const { name } = props
    
    const style = name == "empty" ? "card-progress empty": "card-progress"

    const modalRef = useRef(null)

    const [data, setData] = useState([])
    const [width, setWidth] = typeof(window) !== "undefined" ? useState(Math.max(window.innerWidth * .5, 350)) : useState(350)


    function modal(option) {
        const modal = modalRef.current;

        if (option) {
            return modal.showModal()
        }

        return modal.close()
    }
    
    useEffect(() => {
        if(typeof(window) === "undefined"){
            return;
        }

        function handleResize() {
            setWidth(Math.max(window.innerWidth * .5, 300))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    
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
                    width={width}
                    height={width * (3 / 5)}
                    series={[
                        { data: data, label: 'Preformance' },
                    ]}

                />
            </div>
            <button onClick={() => modal(false)}>X</button>
        </dialog>
    </>)
}