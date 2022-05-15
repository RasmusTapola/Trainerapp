import { BarChart, CartesianGrid, Bar, Legend, XAxis, YAxis, Tooltip } from "recharts";
import _ from 'lodash'
import React, {useState, useEffect} from "react";

export default function TrainingChart(){

    const [training, setTraining] = useState([]);
    const getapi = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData =>
        setTraining(responseData.content))
    }
    useEffect(() => getapi(), []);

    const _ = require("lodash");

    const data = _(training)
    .groupBy('activity')
    .map((training, i) => ({
        name: training.activity,
        training: _.sumBy(training, 'duration')
    }))
    .value()

    return (

        <div>
            <h1>Training Chart</h1>
            <BarChart style={{margin: 'auto'}} width={1000} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <YAxis/>
                <XAxis datakey="name"/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="training" fill="#8884d8"/>
            </BarChart>
        </div>
    )
}