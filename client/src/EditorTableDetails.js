import React,{Fragment, useContext, useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import {UserContext} from './Context/UserContext'
import { toast } from "react-toastify";

function EditorTableDetails({ setAuth}) {

  const {id} = useParams()

  const {selectedrestaurant , setSelectedRestaurant} = useContext(UserContext)

  const {selectedreview, setSelectedReview} = useContext(UserContext)

  const [name, setName] = useState("")
  
  useEffect(() =>{
    getSpecificRestaurant();
    getAllReviews();
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
  
  //This is a get all the Reviews Related to a Restaurant
  const getAllReviews = async () =>{
      try 
      {
        const response = await  fetch(`http://localhost:5000/restaurant/get/reviews/${id}`) 
        const jsonData = await response.json()
        console.log(jsonData);
        setSelectedReview(jsonData);
  
  
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

  const deletereview = async (id) =>
  {
    try {
      const deleteReview = await fetch(`http://localhost:5000/restaurant/editor/delete/${id}`,{
        method: "DELETE"
      })
      setSelectedReview(selectedreview.filter(selectereview => selectereview.review_id !== id))
      
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
       <h2 className="text-center display-1">Reviews for {selectedrestaurant.restaurantname}</h2>
      </>
      <div className="row row-cols-3 mb-2">
      {selectedreview.length !== 0 &&
            selectedreview[0].review_id !== null && selectedreview.map(selectreviewX =>(
          <div key={selectreviewX.review_id} className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
              <div className="card-header d-flex justify-content-between">
                <button className='btn btn-warning' onClick={() => deletereview(selectreviewX.reviewid)} > 
                  Delete Details
                </button>
              </div>
              <div className="card-header d-flex justify-content-between">
                <span>{selectreviewX.name} </span>
              </div>
              <div className="card-body">
                <p className="card-text">{selectreviewX.review}</p>
              </div>
          </div>
      ))}
      </div>
    </Fragment>
  )
}

export default EditorTableDetails