import React, {useState, useEffect, useRef} from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Button } from "@mui/material";

export default function Customers(){

    const [customers, SetCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const getapi = () => {
        fetch(`https://customerrest.herokuapp.com/api/customers`)
        .then(response => response.json())
        .then(responseData =>{
        SetCustomers(responseData.content);
        })
      };

      useEffect(() => getapi(), []);

    const gridRef= useRef();

    const saveCustomer = (customer) => {
        fetch(`https://customerrest.herokuapp.com/api/customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        })
        .then(response => getapi())
        .then (_ => {
            alert("Customer added successfully!");
            
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer,link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(response => getapi())
        .then (_ => {
          alert('Customer updated successfully!');
          setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {
          method: 'DELETE',})
        .then (res => getapi())
        .then (_ => {
          alert('Customer deleted successfully!')
        })
        .catch(err => console.error(err))
        }
      };

    const columns =[
        {headerName: 'Firstname', field: 'firstname', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Lastname', field: 'lastname', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Address', field: 'streetaddress', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Postcode', field: 'postcode', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'City', field: 'city', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Email', field: 'email', sortable:true, filter:true, floatingFilter:true },
        {headerName: 'Phone', field: 'phone', sortable:true, filter:true, floatingFilter:true},
        {headerName: 'Update', cellRenderer:row => <EditCustomer updateCustomer={updateCustomer} customer={row.data}/>},
        {headerName: 'Delete', cellRenderer: row => <Button onClick={() => deleteCustomer(row.data.links[0].href)}>Delete</Button> },
        ];

    

    

    return (
        <div>
            <h1>Customers</h1>
            
            <AddCustomer saveCustomer={saveCustomer} />            
            <div
            className="ag-theme-material"
            style={{
                height: '1000px',
                width: '75%',
                margin: 'auto'}}
                >
            <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection='single'
                animateRows='true'
                columnDefs={columns}
                rowData={customers}
               > 
            </AgGridReact>
        </div>
        </div>
    )
}