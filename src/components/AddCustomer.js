import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddCustomer(props){

    const [customers, SetCustomers] = useState([]);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        city: '',
        streetaddress: '',
        postcode: '',
        email: '',
        phone: ''
    });

    const getapi = () => {
        fetch(`https://customerrest.herokuapp.com/api/customers`)
        .then(response => response.json())
        .then(responseData =>
        SetCustomers(responseData.content)
        )
      };

    const AddCustomer = () =>{
        props.saveCustomer(customer);
        console.log(customer)
        
    } 

      useEffect(() => getapi(), []);

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }


    return (
        <div>
            
            <h3>Add a customer</h3>
            <TextField autoFocus name="firstname" value={customer.firstname} onChange={inputChanged} label="First name"/>
            <TextField name="lastname" value={customer.lastname} onChange={inputChanged} label="Last name"/>
            <TextField name="streetaddress" value={customer.streetaddress} onChange={inputChanged} label="Address"/>
            <TextField name="postcode" value={customer.postcode} onChange={inputChanged} label="Postcode"/>
            <TextField name="city" value={customer.city} onChange={inputChanged} label="City"/>
            <TextField name="email" value={customer.email} onChange={inputChanged} label="Email"/>
            <TextField name="phone" value={customer.phone} onChange={inputChanged} label="Phone"/>
            <Button style={{margin : 5}} variant = 'outlined' onClick={AddCustomer}>Add</Button>
            
        </div>
    )
}
