import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

export const MyDailyStatusNew_id = (props) => {
    const { state } = useLocation();
    const data =state.item;
  return (
    <div>
        <h2>Status Update on {data.dueDate}</h2>
        <div>
            <ul>
                <li><b>in Time</b></li>
                <li><b>Out Time</b></li>
                <li><b>Total Hours:</b></li>
            </ul>
            <h3>Please Find My Status Update:</h3>
            <ul>
                <span>
                    <b> 1: Project Name:</b>
                    {data.project_status}
                    </span>
                    <br/>
                    <span>
                        <b>Task :</b>
                        <div>
                            EOD:{data.task}
                            <br/>

                        </div>
                    </span>
                    <span>
                    <b>Working Hour: {data.working_hour}</b>{}
                    </span>
                    <br/>
                    <span><b>Status:</b> {data.status}</span>
                
            </ul>
        </div>
    </div>
  )
}
