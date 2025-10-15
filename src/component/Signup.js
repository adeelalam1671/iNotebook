import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
const Signup = (props) => {
 
      const[credentials,setcredentials] = useState({name:"",email:"",cpassword:"", password:""})
         const navigate = useNavigate();
  
      const handleSubmit= async(e)=>{
       e.preventDefault();
        navigate('/login'); 
       const responce = await fetch("http://localhost:5000/api/auth/signup",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
  name: credentials.name,
  email: credentials.email,
  password: credentials.password
})
    });
     const json = await responce.json();
     console.log(json);
     if(json.success)
     {
      //save auth token 
      localStorage.setItem("toekn",json.authtoken);
      props.showAlert("Account created Successfully","success")
     }
     else {
      props.showAlert("Invalid Crandentials","danger")
     }
      }
      const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };  
  return (
    <div  style={{ width: "55%", height:"500px", background:"#201E2B",color:"white",marginTop:"60px"}} className='container  rounded-start-5 '>
      <form  onSubmit={handleSubmit}>
         <div className="mb-3 ">
           <label htmlFor="name" className="my-3 form-label">Name</label>
           <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
      <div className="mb-3">
           <label htmlFor="password" className="form-label">Password</label>
           <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
      </div>
      
            <div className="mb-3">
           <label htmlFor="cpassword" className="form-label">Confirm Password</label>
           <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
      </div>
        
      <button type="submit" className="btn btn-primary">Submit</button>
  </form>
    </div>
  )
}
export default Signup
