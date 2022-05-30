import React,{Fragment, useContext, useEffect , useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import {UserContext} from './Context/UserContext'
import { toast } from "react-toastify";

function EditorEditTableData({ setAuth}) {

    const {id} = useParams()

    const history = useHistory();

    const {selectedrestaurant , setSelectedRestaurant} = useContext(UserContext)
  
    const [name, setName] = useState("")
    const [restaurantname, setRestaurantName] = useState("")
    const [location, setLocation] = useState("")
    const [pricerange, setPriceRange] = useState("Price Range")
    
    useEffect(() =>{
      getSpecificRestaurant();
      getName()
    },[]);
  
    //This is to get the Resturant Name
    const getSpecificRestaurant = async () =>{
        try 
        {
          const response = await  fetch(`http://localhost:5000/restaurant/get/${id}`)
          const jsonData = await response.json()
          console.log(jsonData);
          setSelectedRestaurant(jsonData);
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

    const updateRestaurants = async (e) =>{
      e.preventDefault();
      try {
  
          const body = {restaurantname,location,pricerange }
          //Check this One and be sure to Change it
          const response = await fetch(`http://localhost:5000/restaurant/update/${id}`,{
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          })
  
         // window.location = "/"
         history.push("/dashboard");
         
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
        <>
         <h2 className="text-center display-1">Update Details for  {selectedrestaurant.restaurantname}</h2>
        </>
        <div className="mb-4">
          <form action="">
            <div className="form-row">
              <div className="col">
                <input type="text" value={restaurantname} onChange={e => setRestaurantName(e.target.value)} className="form-control" placeholder="restaurantname"/>
              </div>
              <div className="col">
                <input className="form-control" value={location} onChange={e => setLocation(e.target.value)}  type="text" placeholder="location"/>
              </div>
              <div className="col">
                <select  className="custom-select my-1 mr-sm-2" value={pricerange} onChange={e => setPriceRange(e.target.value)}  >
                  <option disabled>Price Range</option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                  <option value="5">$$$$$</option>
                </select>
              </div>
              <button onClick={updateRestaurants} type="submit" className="btn btn-primary" > Update </button>
            </div>
          </form>
      </div>
      </Fragment>
    )

}

export default EditorEditTableData