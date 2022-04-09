import React, {useEffect, useState, Fragment, useContext}from 'react'
import { UserContext } from '../Context/UserContext'

function ListUsers() {

  const {user, setUser} = useContext(UserContext)

  useEffect(() =>{
    
    fetchData();
  },[]);

  const fetchData = async () =>{
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

  
  <Fragment>
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
                  <tr key={userX.userid}>
                      <td>{userX.name}</td>
                      <td>{userX.surname}</td>
                      <td>{userX.email}</td>   
                      <td><button className='btn btn-danger' onClick={(e) => deleterestaurant(userX.userid)}>Delete</button></td>                  
                  </tr>
              ))}

          </tbody>
      </table>
  </Fragment>
}

export default ListUsers