import React,{Fragment, useState} from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = ({setAuth}) => {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] =useState("")
  const [password, setPassword] = useState("")

  //This Works as Intended in the Video.
  const handleSubmit = async e =>{
    e.preventDefault();
    try {

      const body = {name, surname, age , email, password};
      const response = await fetch("http://localhost:5000/restaurant/register",{
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(body)
      });

      const parseData = await response.json()
      if(parseRes.jwtToken){
        
        localStorage.setItem("token", parseData.jwtToken);
        setAuth(true)
        toast.success("Login Succesfull")
    
      }else{
        setAuth(false)
        toast.error(parseData)
      }
      
    } catch (err) {

      console.error(err.message)
      
    }
  }


  return (
    <Fragment>
       <h1>Register Page</h1>
       <form>
            <input type="text" name="name" value={name} placeholder="Name" 
            onChange={e => setName(e.target.value)} className="form-control my-3"/>

            <input type="text" name="surname" value={surname} placeholder="Surname" 
            onChange={e => setSurname(e.target.value)} className="form-control my-3"/>

            <input type="text" name="age" value={age} placeholder="Age" 
            onChange={e => setAge(e.target.value)} className="form-control my-3"/>

           <input type="text" name="email" value={email} placeholder="Email" 
           onChange={e => setEmail(e.target.value)} className="form-control my-3"/>

           <input type="password" name="password" value={password} placeholder="Password" 
           onChange={e => setPassword(e.target.value)} className="form-control my-3"/>
           
           <button onClick={handleSubmit} type="submit" className="btn btn-success btn-block" > Register </button>
       </form>
       <Link to="/login">Login</Link>
    </Fragment>
  )
}

export default Register