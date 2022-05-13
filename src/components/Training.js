import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddTraining from "./AddTraining";
import EditTraining from './EditTraining';
import { Button } from "@mui/material";

export default function Training(){

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const getapi = () => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`)
        .then(response => response.json())
        .then(responseData =>{
        setTrainings(responseData.content);
        })
      };

      useEffect(() => getapi(), []);

    const gridRef= useRef();
    
    const saveTraining = (training) => {
        fetch(`https://customerrest.herokuapp.com/api/trainings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(training)
        })
        .then(response => getapi())
        .then (_ => {
            alert("Training added successfully!");
            
        })
        .catch(err => console.error(err))
    }
    const updateTraining = (training,link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
        })
        .then(response => getapi())
        .then (_ => {
          alert('Training updated successfully!');
          setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {
          method: 'DELETE',})
        .then (res => getapi())
        .then (_ => {
          alert('Training deleted successfully!')
        })
        .catch(err => console.error(err))
        }
      };

    const columns = [
        {headerName: 'date', field: 'date', field: 'date', sortable:true, filter:true, floatingFilter:true},
        {headerName: 'duration', field: 'duration', field: 'duration', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'activity', field: 'activity', field: 'activity', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Update', cellRenderer:row => <EditTraining updateTraining={updateTraining} training={row.data}/>},
        {headerName: 'Delete', cellRenderer: row => <Button onClick={() => deleteTraining(row.data.links[0].href)}>Delete</Button> }
    ]

    return (
        <div>
            <h1>Trainings</h1>

            <AddTraining saveTraining={saveTraining}></AddTraining>
            <div
            className="ag-theme-material"
            style={{
                height: '1000px',
                width: '40%',
                margin: 'auto'}}
                >
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection='single'
                animateRows='true'
                columnDefs={columns}
                rowData={trainings}
               > 
            </AgGridReact>
            </div>
        </div>
    )
}