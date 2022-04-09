import React, {useEffect, useState, Fragment, useContext}from 'react'
import { UserContext } from '../Context/UserContext'

function CustomerListRestaurant() {

  //Specially Made List Table for Only Customers to Use.

  const {rest, setRest} = useContext(UserContext)

  useEffect(() =>{
    
    fetchData();
  },[]);

  const fetchData = async () =>{
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

  <Fragment>
      <table className='table table-hover table-dark'>
          <thead>
              <tr className="bg-primary">
                  <th>Restaurant</th>
                  <th>Location</th>
                  <th>Price Range</th>
                  <th>Reviews</th>
              </tr>  
          </thead>
          <tbody>
              {rest.map(restX =>(
                  <tr key={restX.restaurantid}>
                      <td>{restX.restaurantname}</td>
                      <td>{restX.location}</td>
                      <td>{"$".repeat(restX.pricerange)}</td>
                      <td><button className='btn btn-warning' onClick={() => tabledetails(restX.restaurantid)} > Details</button></td>
                  </tr>
              ))}

          </tbody>
      </table>
  </Fragment>
}

export default CustomerListRestaurant