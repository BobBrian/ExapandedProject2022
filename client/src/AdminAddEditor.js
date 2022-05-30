import React,{Fragment, useState} from 'react'

function AdminAddEditor() {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [age , setAge] = useState("")
    const [email, setEmail] =useState("")
    const [password , setPassword] = useState("")
  
    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const body = {name, surname, age , email, password}
  
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
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="name"/>
          </div>
          <div className="col">
            <input className="form-control" value={surname} onChange={e => setSurname(e.target.value)}  type="text" placeholder="surname"/>
          </div>
          <div className="col">
            <input className="form-control" value={age} onChange={e => setAge(e.target.value)}  type="text" placeholder="age"/>
          </div>
          <div className="col">
            <input className="form-control" value={email} onChange={e => setEmail(e.target.value)}  type="text" placeholder="email"/>
          </div>
          <div className="col">
            <input className="form-control" value={password} onChange={e => setPassword(e.target.value)}  type="text" placeholder="password"/>
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-primary" > Add Editor </button>
        </div>
      </form>
    </div>
    </Fragment>
  )
}

export default AdminAddEditor