import React,{Fragment , useState , useEffect} from 'react'
import { toast } from "react-toastify";
import Admin from './Admin';
import Customer from './Customer';
import Editor from './Editor';



function Dashboard({ setAuth}) {

  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  //This Routes actually Work
  const  getName = async () =>{
    try {
        const response = await fetch("http://localhost:5000/res/dashboard/name",{
            method: "GET",
            headers: { jwt_token: localStorage.token }
        })
        const parseRes = await response.json()
        setName(parseRes.name)
    } catch (err) {
        console.error(err.message)
    }
  }

  //This Routes actually Work
  const  getRole = async () =>{
    try {
        const response = await fetch("http://localhost:5000/res/dashboard/role",{
            method: "GET",
            headers: { jwt_token: localStorage.token }
        })
        const parseRes = await response.json()
        setRole(parseRes.role)
      } catch (err) {
        console.error(err.message)
    }
  }
  

  useEffect(() =>{
    getName()
    getRole()
  },[])
    
  const logout = async e => {
    e.preventDefault();
    try {

      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
              <div className="container-fluid">
                <a className="navbar-brand" href="#"> Welcome {name}</a>
                <button className="btn btn-primary" onClick={e => logout(e)} >Logout</button>  
              </div>
            </nav>
            
            {role ==='Customer' && <Customer/>}
            {role ==='Editor' && <Admin/>}
            {role ==='Admin' && <Editor/>}
        </div>
    </Fragment>
)
}

export default Dashboard