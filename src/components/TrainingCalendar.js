import React, {useEffect, useState} from "react";
import {Scheduler} from '@aldabil/react-scheduler';
import moment from "moment";


export default function TrainingCalendar(){

    const [training, setTraining] = useState([]);
    const getapi = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData =>
        setTraining(responseData.content))
    }

    const week = {
        weekDays: [0,1,2,3,4,5,6],
        weekStartOn: 1,
        startHour: 9,
        endHour: 22,
        step: 30
    }

    const day = {
        startHour : 9,
        endHour: 22,
        step:30
    }

    useEffect(() => getapi(), []);

    return(
        <div>
            <h1>Training Calendar</h1>
        <Scheduler 
            view="week"
            events={training.map((training, i) =>({
                event_id: i,
                title: training.activity,
                start:new Date(training.date),
                end: moment(training.date).add(training.duration, 'minute')._d
            }))}
            week={week}
            day={day}
            
            />   
        </div>
    )
}