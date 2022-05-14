import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";




export default function AddTraining(props){

    const [trainigns, SetTrainings] = useState([]);
    const [training, setTraining] = useState({
        date:'',
        duration:'',
        activity:'',
        customer:props.training
    });

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const getapi = () => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`)
        .then(response => response.json())
        .then(responseData =>
        SetTrainings(responseData.content)
        )
      };

    const AddTraining = () =>{
        props.saveTraining(training);
        
    } 

    const [selectedDate, setSelectedDate] = useState(new Date());

    const setDate = (date) => {
        setSelectedDate(date);
        setTraining({...training, date: date.toISOString()})
      }

      useEffect(() => getapi(), []);

    return (
        <div>
            <h3>Add a training</h3>
            <Datetime name="date" value={training.date} onChange={date => setDate(date)} />
            <TextField name="duration" value={training.duration} onChange={inputChanged} label="Duration"/>
            <TextField name="activity" value={training.activity} onChange={inputChanged} label="Activity"/>
            <Button style={{margin : 5}} variant = 'outlined' onClick={AddTraining}>Add</Button>
            
        </div>
    )
}