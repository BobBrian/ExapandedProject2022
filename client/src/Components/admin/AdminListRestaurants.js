import React, {useEffect,Fragment, useContext}from 'react'
import React, {useEffect, useState, Fragment, useContext}from 'react'
import UserContext from '.../Context/UserContext'



function AdminListRestaurants() {
  const {rest, setRest} = useContext(UserContext)




  useEffect(() =>{
    
    getAllRestaurants();
  },[]);

  const getAllRestaurants = async () =>{
    try {
      const response = await  fetch("http://localhost:5000/restaurant/get/all") // This is the All gET
      const jsonData = await response.json()
      console.log(jsonData);
      setRest(jsonData);
  } catch (err) 
  {
      console.error(err.message)
  }

  };

  const deleterestaurant = async (id) =>
  {
    try {
      const deleteRestaurant = await fetch(`http://localhost:5000/restaurant/delete/${id}`,{
        method: "DELETE"
      })
      setRest(rest.filter(rest => rest.id !== id))
      
    } catch (err) {
      console.error(err.message)  
    }
  }



return (
    <Fragment>
        <table className='table table-hover table-dark'>
            <thead>
                <tr className="bg-primary">
                    <th>Restaurant</th>
                    <th>Location</th>
                    <th>Price Range</th>
                    <th>Delete</th>
                </tr>  
            </thead>
            <tbody>
                {rest.map(restX =>(
                    <tr key={restX.restaurantid}>
                        <td>{restX.restaurantname}</td>
                        <td>{restX.location}</td>
                        <td>{"$".repeat(restX.pricerange)}</td>
                        <td><button className='btn btn-danger' onClick={(e) => deleterestaurant(restX.restaurantid)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
  )
}

export default AdminListRestaurants