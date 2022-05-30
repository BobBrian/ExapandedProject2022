import React,{Fragment ,useState} from 'react'
import { Link} from "react-router-dom";
import { toast} from 'react-toastify';

const Login = ({setAuth}) => {

    const [email, setEmail] =useState("") //Transfer to UseContext
    const [password, setPassword] = useState("") //Transfer to UseContext

    const handleLogin = async e =>{
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/restaurant/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                toast.success("Logged in Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }  
            
        } catch (err) {
            console.error(err.message)    
        }
    }



    return (
        <Fragment>
            <h1>Login Page</h1>
            <form>
                <input type="text" name="email" value={email} placeholder="Email" 
                onChange={e => setEmail(e.target.value)} className="form-control my-3"/>

                <input type="password" name="password" value={password} placeholder="Password" 
                onChange={e => setPassword(e.target.value)} className="form-control my-3"/>
                
                <button onClick={handleLogin} type="submit" className="btn btn-success btn-block" > Login</button>
            </form>
            <div>
                
            </div>
            <Link to="/register">New to the Website ? Register Now</Link>
        </Fragment>
    )
}

export default Login