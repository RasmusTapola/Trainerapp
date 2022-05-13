import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  {Dialog, DialogContent, DialogActions}  from '@mui/material';



export default function EditTraining(props){

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: ''
    });

    const changeTraining = () => {
        setTraining({
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity
          })
          setOpen(true);
         
        }

    const closeUp = () => {
        setOpen(false);
    }

    const updateTraining = () => {
        props.updateTraining(training, props.customer.links[0].href)

    }
    
    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button style={{margin:5}} onClick={changeTraining}>Edit</Button>
            <Dialog open={open} onClose={closeUp}>
            <DialogContent>
            <input type="date" name="date" value={training.date} onChange={inputChanged} label="Date"></input>
            <TextField name="duration" value={training.duration} onChange={inputChanged} label="Duration"/>
            <TextField name="activity" value={training.activity} onChange={inputChanged} label="Activity"/>
            </DialogContent>
            <DialogActions>
            <Button style={{margin : 5}} variant = 'outlined' onClick={updateTraining}>Edit</Button>
            <Button style={{margin : 5}} variant = 'outlined' onClick={closeUp}>Cancel</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}