import React, {useEffect,  Fragment, useContext}from 'react'
import {useHistory} from "react-router-dom"
import { UserContext } from './Context/UserContext';

function AdminListUsers() {

  const {user, setUser} = useContext(UserContext)

  let history = useHistory()

  useEffect(() =>{
    
    getAllUsers();
  },[]);

  const getAllUsers = async () =>{
    try {
      const response = await  fetch("http://localhost:5000/admin/get/all") // This is the All gET
      const jsonData = await response.json()
      console.log(jsonData);
      setUser(jsonData);
  } catch (err) 
  {
      console.error(err.message)
  }

  };

  const deleteuser = async (id) =>
  {
    try {
      const deleteuser = await fetch(`http://localhost:5000/admin/delete/${id}`,{
        method: "DELETE"
      })
      setUser(user.filter(user => user.id !== id))
      
    } catch (err) {
      console.error(err.message)  
    }
  }

  const adminlistrestaurnantdetails = () =>{
    history.push("/list/admin/restaurant/all")
  }

  return (
    <Fragment>
      <div>
      <td>
        <button className='btn btn-warning' onClick={() => adminlistrestaurnantdetails()} >
        List Restaurants
        </button>
      </td>

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
            {user.map(userX =>(
                <tr key={userX.user_id}>
                    <td>{userX.name}</td>
                    <td>{userX.surname}</td>
                    <td>{userX.email}</td>   
                    <td><button className='btn btn-danger' onClick={(e) => deleteuser(userX.userid)}>Delete</button></td>                  
                </tr>
            ))}
          </tbody>
      </table>
    </Fragment>
  )
}

export default AdminListUsers