import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/home';
import About from './component/about';
import NoteState from './context/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
import Alert   from "./component/Alert";
import { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null);
   const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
    }
  return (
    <div >
     <NoteState>
      <Router>
        <Navbar />
        <Alert alert = {alert}/>
        <div   >
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
           <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about"  element={<About /> } />
           <Route exact path="/login" element={<Login showAlert={showAlert}  /> } />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}


export default App;
