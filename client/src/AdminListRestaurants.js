import React, {useEffect, Fragment, useContext}from 'react'
import { UserContext } from './Context/UserContext';

function AdminListRestaurants({ setAuth}) {


  const {rest, setRest} = useContext(UserContext)

  const [name, setName] = useState("")

  useEffect(() =>{
    getName();
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
            <a className="navbar-brand" href="#"> Welcome Mr {name}</a>
            <button className="btn btn-primary" onClick={e => logout(e)} >Logout</button>  
          </div>
      </nav>
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
            {rest.length !== 0 &&
              rest[0].restaurant_id !== null && rest.map(restX =>(
                <tr key={restX.restaurant_id}>
                    <td>{restX.restaurantname}</td>
                    <td>{restX.location}</td>
                    <td>{"$".repeat(restX.pricerange)}</td>
                    <td><button className='btn btn-danger' onClick={(e) => deleterestaurant(restX.restaurant_id)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
     </table>
  </Fragment>
  )
}

export default AdminListRestaurants