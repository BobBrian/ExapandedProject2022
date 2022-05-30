import React,{useState} from 'react'
import { useLocation, useParams, useHistory } from "react-router-dom";

function CustomerAddReview() {

  const { id} = useParams();

  const location = useLocation();

  console.log(location);

  const history = useHistory();

  console.log(id);

  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("Price Range")

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {

        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("jwt_token", localStorage.token);

        const body = {name, review , rating}
        const response = await fetch(`http://localhost:5000/restaurant/${id}/review/add`,{
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body)
        });

        const parseResponse = await response.json()

        console.log(parseResponse)

        history.push("/");
        history.push(location.pathname);
          
    } catch (err) {
        console.error(err.message)   
    }
  }

  
  

  return (
    <div className='mb-2'>
        <form action=''>
            <div className='form-row'>
                <div className='form-group col-8'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} placeholder="Name" 
                    onChange={e => setName(e.target.value)} className="form-control my-3"/>
                </div>
            </div>

            <div className='form-row'>
                <div className='form-group col-8'>
                    <label htmlFor="rating">Rating</label>
                    <select id='rating' value={rating} onChange={e => setRating(e.target.value)} className='custom-select'>
                        <option disabled> Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                  </select>
                </div> 
            </div>
            
            <div className='form-group'>
                <label htmlFor="Review">Review</label>
                <input type="text" name="review" value={review} placeholder="Review" 
                onChange={e => setReview(e.target.value)} className="form-control my-3"/>   
            </div>
            <button type="submit" onClick={handleSubmitReview} className='btn btn-primary'>
                Submit
            </button>
        </form>
    </div>
    )
}

export default CustomerAddReview