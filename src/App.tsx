import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import './App.css';
import {Main} from './pages/create-post/main/main';
import {Login} from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/createPost';


function App() {
  return (
    <div className="App">
    
      <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/createPost" element={<CreatePost />}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
