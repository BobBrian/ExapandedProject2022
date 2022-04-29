import React,{Fragment, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function EditorResturantDetails() {

  const {id} = useParams()

  const {selectedrest , setSelectedRest} = useContext(UserContext)

  const {selectreview, setSelectReview} = useContext(UserContext)

  useEffect(() =>{
    getSpecificRestaurant();
    getAllSpecificRestaurantReviews ();
  },[]);

  //This is to get the  Specific Resturants Name
  const getSpecificRestaurant = async () =>{
        try 
        {
          const response = await  fetch(`http://localhost:5000/restaurant/update/${id}`)
          const jsonData = await response.json()
          console.log(jsonData);
          setSelectedRest(jsonData);


        } catch (err) 
      {
          console.error(err.message)
      }
  
  }; 

  //Shows all the Reviews of a Specific Restaurant
  const getAllSpecificRestaurantReviews = async () =>{
    try 
    {
      const response = await  fetch(`http://localhost:5000/restaurant/review/get/${id}`) 
      const jsonData = await response.json()
      console.log(jsonData);
      setSelectReview(jsonData);


    } catch (err) 
    {
      console.error(err.message)
    }

  };

  //Delete Reviews
  const deletereview = async (id) =>
  {
    try {
      const deleteReview = await fetch(`http://localhost:5000/restaurant/editor/delete/${id}`,{
        method: "DELETE"
      })
      setSelectReview(selectreview.filter(selectreview => selectreview.id !== id))
      
    } catch (err) {
      console.error(err.message)  
    }
  }


return (

  <Fragment>
      <h1 className="text-center display-1">Restaurant Details </h1>
      <>
       <h2 className="text-center display-1">{selectedrest.name}</h2>
      </>
      <div className="row row-cols-3 mb-2">
      {selectreview.map(selectreviewX =>(
          <div key={selectreviewX.reviewid} className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
              <div className="card-header d-flex justify-content-between">
                <button className='btn btn-warning' onClick={() => deletereview(selectreviewX.reviewid)} > 
                  Delte Details
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

export default EditorResturantDetails