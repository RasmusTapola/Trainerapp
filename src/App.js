import './App.css';
import React from 'react';
import Home from './components/Home';
import Training from './components/Training';
import Customers from './components/Customers'
import Notfound from './components/Notfound';
import TrainingChart from './components/TrainingChart'
import TrainingCalendar from './components/TrainingCalendar';
import {  BrowserRouter,  Routes,  Route,  Link} from 'react-router-dom';
import { Button } from '@mui/material';


 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Button style={{margin: 5}}  component={Link} to={'/'}>Home</Button> 
          <Button style={{margin: 5}}  component={Link} to={'/Training'}>Trainings</Button>
          <Button style={{margin: 5}}  component={Link} to={'/Customers'}>Customers</Button>
          <Button style={{margin: 5}}  component={Link} to={'/TrainingCalendar'}>Training Calendar</Button>
          <Button style={{margin: 5}}  component={Link} to={'/TrainingChart'}>Training Chart</Button>
        <Routes>
          <Route exact path = "/" element={<Home />}/>
          <Route path = "/Training" element={<Training />}/>
          <Route path = "/Customers" element={<Customers />}/>
          <Route path = "/TrainingCalendar" element={<TrainingCalendar />}/>
          <Route path = "/TrainingChart" element={<TrainingChart />}/>
          <Route path = "/Notfound" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  
 
}

export default App;

