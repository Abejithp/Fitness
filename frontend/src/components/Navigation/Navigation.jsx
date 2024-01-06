import './navigation.css'

import Card from '../Workout/Card/Card'
import { getActiveWorkout } from '@/api/workout.mjs'
import { useEffect, useState } from 'react'

export default function Navi(props) {

    const { workouts, update, build, text } = props

    const [pageNum, updatePage] = useState(0)

    const [filter, updateFilter] = useState([]);
    const [search, updateSearch] = useState([])
    const [currentWorkout, updateWorkout] = useState([])

    useEffect(() => {
        updateWorkout(workouts)
    }, [workouts.length])

    useEffect(() => {
        updateFilter(currentWorkout.slice(pageNum * 4, pageNum * 4 + 4))

        console.log(currentWorkout);
    }, [pageNum, currentWorkout.length])

    function handleSearch(search) {
        const filtered = workouts.filter(
            ({ workoutName }) =>
                workoutName.toLowerCase().includes(search.toLowerCase())
        );
        updateSearch(search)
        updateWorkout(filtered)
        updatePage(0)

    }

    return (<>
        <div className="navigation">
            <div className="content-navi">
                <div className="card create-btn" onClick={build}>{text}</div>
                <input type="text" value={search} placeholder='Search for Workout' onChange={(e) => handleSearch(e.target.value)} />
                <div className="ex-container">
                    {filter.map((item, index) => <Card key={index} name={item.workoutName} id={item._id} update={(res) => { getActiveWorkout(res).then((res) => update(res.data)) }} />)}
                </div>
            </div>

            <div className="pagination">
                <div className="btn" onClick={() => {
                    if (pageNum - 1 >= 0) {
                        updatePage(pageNum - 1)
                    }

                }}><img src='./arrow.png' className='left' /></div>
                <div className="btn" onClick={() => {
                    console.log(pageNum * 4)

                    if ((pageNum + 1) * 4 < currentWorkout.length) {
                        updatePage(pageNum + 1)
                    }
                }}><img src='./arrow.png' /></div>
            </div>
        </div>
    </>)
}