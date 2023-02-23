
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue();


  return (
    //BEM naming convention
    <BrowserRouter>
    <div className="App">
    {!user ? (
     <Login />
    ) : (
      <div className='App_body'>
      {/* <Routes>
      <Route path='/app'>
      <Sidebar />
      <Chat />
      </Route>
      <Route exact path="/" element={<h1>home screen</h1>}/>
      </Routes> */}

      <Sidebar />
        <Routes>
        
          <Route exact path="/rooms/:roomId" element={ 
          <Chat />
        }/>
          <Route exact path="/" element={<Chat />}/>
        </Routes>
    

    </div>
    )}
    
    </div>
    </BrowserRouter>
  );
}

export default App;
