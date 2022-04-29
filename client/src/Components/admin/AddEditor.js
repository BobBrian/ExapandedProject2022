import React,{Fragment, useState} from 'react'

function AddEditor() {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] =useState("")

  const handleSubmit = async e =>{
      e.preventDefault();
      try {
          const body = {restaurantname,location,pricerange }
          const response = await fetch("http://localhost:5000/admin/addeditor",{
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          });

          //console.log(response)
          window.location = "/"
          
      } catch (err) {
          console.error(err.message)
          
      }
  }


  return (
    <Fragment>
    <h2>Add Editors</h2>
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="restaurantname"/>
          </div>
          <div className="col">
            <input className="form-control" value={surname} onChange={e => setSurname(e.target.value)}  type="text" placeholder="location"/>
          </div>
          <div className="col">
            <input className="form-control" value={email} onChange={e => setEmail(e.target.value)}  type="text" placeholder="location"/>
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-primary" > Add Editor </button>
        </div>
      </form>
    </div>
    </Fragment>
  )
}

export default AddEditor