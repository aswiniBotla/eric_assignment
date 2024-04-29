import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'

function Home(){

    const [Data,setData] = useState([])

    useEffect(()=>{
        const fetchData = ()=>{

            axios.get('http://localhost:3001/')
            .then(res=>{
                setData(res.data)
                console.log(res)
            })
            .catch(error=>console.log(error))
        }
        fetchData()
    },[])


    return(
        <div className='bg-primary bg-card'>
            <h1 className='bg-light w-50 m-auto p-3'>ROBO Details</h1>

            <div className='m-3'>
                <select>
                    <option value="Select">Select</option>
                </select>
            </div>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    Data.map((Details)=>(
                        <div className='bg-light p-3 m-5  rounded'>
                            <p>Name : {Details.Name}</p>
                            <p>Battery Level : {Details.BatteryLevel}</p>
                            <p>Status : {Details.Status}</p>
                            <p>RecentActivity : {Details.RecentActivity}</p>
                        </div>
                    ))
                }
            </div>
            <button className='btn btn-warning m-3' onClick={e=>(window.location.reload())}>Refresh</button>
        </div>
    )
}
export default Home