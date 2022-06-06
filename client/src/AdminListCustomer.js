import React, {useEffect,  Fragment, useContext , useState}from 'react'
import { UserContext } from './Context/UserContext';
import { toast } from "react-toastify";

function AdminListCustomer({ setAuth}) {
  const {user, setUser} = useContext(UserContext)

  const [name, setName] = useState("")



  useEffect(() =>{
    
    getAllUsers();
    getName();
    
  },[]);


  const getAllUsers = async () =>{
    try {
      const response = await  fetch("http://localhost:5000/admin/get/all/customer") // This is the All gET
      const jsonData = await response.json()
      console.log(jsonData);
      setUser(jsonData);
  } catch (err) 
  {
      console.error(err.message)
  }

  };


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

  const deleteuser = async (id) =>
  {
    try {
      const deleteuser = await fetch(`http://localhost:5000/admin/delete/${id}`,{
        method: "DELETE"
      })
      setUser(user.filter(user => user.user_id !== id))
      
    } catch (err) {
      console.error(err.message)  
    }
  }

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light" >
          <div className="container-fluid">
            <a className="navbar-brand" href="#"> Welcome {name}</a>
            <button className="btn btn-primary" onClick={e => logout(e)} >Logout</button>  
          </div>
      </nav>

      <div>

      </div>
      <table className='table table-hover table-dark'>
          <thead>
              <tr className="bg-primary">
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Delete</th>
              </tr>  
          </thead>
          <tbody>
            { user.map(userX =>(
                <tr key={userX.user_id}>
                    <td>{userX.name}</td>
                    <td>{userX.surname}</td>
                    <td>{userX.email}</td>   
                    <td><button className='btn btn-danger' onClick={(e) => deleteuser(userX.user_id)}>Delete</button></td>                  
                </tr>
            ))}
          </tbody>
      </table>
    </Fragment>
  )
}

export default AdminListCustomer