
import React, {useEffect, Fragment, useContext}from 'react'
import { UserContext } from './Context/UserContext';
import {useHistory} from "react-router-dom"


function CustomerListRestaurant() {

  const {rest, setRest} = useContext(UserContext)

  useEffect(() =>{
    
    fetchData();
  },[]);

  let history = useHistory()

  const fetchData = async () =>{
    try {
     const response = await  fetch("http://localhost:5000/restaurant/get/all")
     const jsonData = await response.json()
     console.log(jsonData);
     setRest(jsonData);
    } catch (err) 
    {
     console.error(err.message)
    }

  };

  
  const customertabledetails = (id) =>{
    history.push(`/list/customer/restaurant/details/${id}`)
  }

  return (
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
                  <tr key={restX.restaurant_id}>
                      <td>{restX.restaurantname}</td>
                      <td>{restX.location}</td>
                      <td>{"$".repeat(restX.pricerange)}</td>
                      <td><button className='btn btn-warning' onClick={() => customertabledetails(restX.restaurant_id)} > Details</button></td>
                  </tr>
              ))}

          </tbody>
      </table>
    </Fragment>
  )
}

export default CustomerListRestaurant