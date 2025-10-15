import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
const Login = (props) => {
    const[credentials,setcredentials] = useState({email:"",password:""})
       const navigate = useNavigate();

    const handleSubmit= async(e)=>{
     e.preventDefault();
      navigate("/home");
     const responce = await fetch("http://localhost:5000/api/auth/login",{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email:credentials.email
      ,password:credentials.password})
  });
   const json = await responce.json();
   console.log(json);
   if(json.success)
   {
    //save auth token 
    localStorage.setItem("token", json.authToken);
    props.showAlert("Logged in Successfully","success")
      navigate("/home"); 
   }
   else {
     props.showAlert("Invalid Details","danger")
   }
    }
    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };  
  return (
    <div className='container rounded' style={{marginTop:"60px",backgroundColor:"#201E2B",color:"white",width:"50%" ,padding:"20px"}}>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name = "email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
