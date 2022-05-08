import React,{Fragment, useState} from 'react'

function EditorEditTableData({restX}) {

  const [restaurantname, setRestaurantName] = useState(restX.restaurantname)
  const [location, setLocation] = useState(restX.location)
  const [pricerange, setPriceRange] = useState(restX.pricerange)

  const updateRestaurants = async(e) =>{
    e.preventDefault()

    try {

        const body = {restaurantname,location,pricerange }
        //Check this One and be sure to Change it
        const response = await fetch(`http://localhost:5000/restaurant/update/${restX.id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        window.location = "/"
    } catch (err) {

        console.error(err.message)
        
    }
  }


  return (
    <Fragment>
        
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${restX.restaurant_id}`}>
            Open modal
            </button>


            <div className="modal" id={`id${restX.restaurant_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    
                    <div className="modal-header ">
                        <h4 className="modal-title text-primary">Modal Heading</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    
                    <div className="modal-body text-primary">
                    <form>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type="text" className='form-control' value={restaurantname} onChange={e => setRestaurantName(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label>Location</label>
                            <input type="text" className='form-control' value={location} onChange={e => setLocation(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label>Price Range</label>
                            <input type="text" className='form-control' value={pricerange} onChange={e => setPriceRange(e.target.value)}/>
                        </div>

                    </form>  
                    </div>

                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal"onClick={e => updateRestaurants(e)} >Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
            </div>
    </Fragment>
  )

}

export default EditorEditTableData