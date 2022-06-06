import React, {useEffect,  Fragment, useContext}from 'react'
import {useHistory} from "react-router-dom"
import { UserContext } from './Context/UserContext';

function EditorListRestaurants() {

  const {rest, setRest} = useContext(UserContext)

  let history = useHistory()

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
      setRest(rest.filter(restaurant => restaurant.restaurant_id !== id))
      
    } catch (err) {
      console.error(err.message)  
    }
  }

  const editortabledetails = (id) =>{
    history.push(`/list/editor/restaurant/details/${id}`)
  }

  const editorupdatetable = (id) =>{
    history.push(`/list/editor/update/details/${id}`)
  }

  return (
    <Fragment>
        <table className='table table-hover table-dark'>
            <thead>
                <tr className="bg-primary">
                    <th>Restaurant</th>
                    <th>Location</th>
                    <th>Price Range</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>  
            </thead>
            <tbody>
                {rest.length !== 0 && rest.map(restX =>(
                    <tr key={restX.restaurant_id}>
                        <td>{restX.restaurantname}</td>
                        <td>{restX.location}</td>
                        <td>{"$".repeat(restX.pricerange)}</td>
                        <td><button className='btn btn-warning' onClick={() => editortabledetails(restX.restaurant_id)} > Details</button></td>
                        <td><button className='btn btn-primary' onClick={() => editorupdatetable(restX.restaurant_id)} > Edit </button></td>
                        <td><button className='btn btn-danger' onClick={(e) => deleterestaurant(restX.restaurant_id)}>Delete</button></td>
                    </tr>
                ))}

            </tbody>

        </table>
    </Fragment>
  )
}

export default EditorListRestaurants