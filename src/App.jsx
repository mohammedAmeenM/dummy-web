import React from 'react';
import { BrowserRouter as Router, Route,  Routes} from "react-router-dom";
import './App.css'
import '@pqina/pintura/pintura.css';
import UserRouter from './routes/UserRouter';
import Home from './pages/Home';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path = "/*" element = {<UserRouter/>} />
        <Route path = "/" element = {<Home/>} />

      </Routes>

    </Router>
      
    </>
  )
}

export default App
