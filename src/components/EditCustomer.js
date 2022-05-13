import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  {Dialog, DialogContent, DialogActions}  from '@mui/material';



export default function EditCustomer(props){

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        city: '',
        streetaddress: '',
        postcode: '',
        email: '',
        phone: ''
    });

    const changeCustomer = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            city: props.customer.city,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            email: props.customer.email,
            phone: props.customer.phone
          })
          setOpen(true);
         
        }

    const closeUp = () => {
        setOpen(false);
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.customer.links[0].href)

    }
    
    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button style={{margin:5}} onClick={changeCustomer}>Edit</Button>
            <Dialog open={open} onClose={closeUp}>
            <DialogContent>
            <TextField autoFocus name="firstname" value={customer.firstname} onChange={inputChanged} label="First name"/>
            <TextField name="lastname" value={customer.lastname} onChange={inputChanged} label="Last name"/>
            <TextField name="streetaddress" value={customer.streetaddress} onChange={inputChanged} label="Address"/>
            <TextField name="postcode" value={customer.postcode} onChange={inputChanged} label="Postcode"/>
            <TextField name="city" value={customer.city} onChange={inputChanged} label="City"/>
            <TextField name="email" value={customer.email} onChange={inputChanged} label="Email"/>
            <TextField name="phone" value={customer.phone} onChange={inputChanged} label="Phone"/>
            </DialogContent>
            <DialogActions>
            <Button style={{margin : 5}} variant = 'outlined' onClick={updateCustomer}>Edit</Button>
            <Button style={{margin : 5}} variant = 'outlined' onClick={closeUp}>Cancel</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}