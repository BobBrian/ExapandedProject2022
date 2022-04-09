import React,{Fragment, useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect ,Link} from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Registration from './Registration';
import Landing from './Landing';
import Dashboard from './Components/Dashboard';
import EditorResturantDetails from './Components/editor/EditorResturantDetails';
toast.configure();
//used for the main routing

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {

      const response = await fetch("http://localhost:5000/restaurant/verify",{
        method: "GET",
        headers: {token: localStorage.token}
      })

      const parseVerify = await response.json()
      
      parseVerify === true ? setIsAuthenticated(true): setIsAuthenticated(false)

      
    } catch (err) {

      console.error(err.message)
      
    }
  }

  useEffect(() =>{
    isAuth()
  })

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/> ) : ( <Redirect to="/landing" />)}/>  
          <Route exact path="/register" render={props => !isAuthenticated ? (<Registration {...props} setAuth={setAuth}/> ) : ( <Redirect to="/landing" />)}/>  
          <Route exact path="/landing" render={props => !isAuthenticated ? (<Landing {...props} setAuth={setAuth}/> ) : ( <Redirect to="/landing" />)}/>  
          <Route exact path="/dashboard" render={props => !isAuthenticated ? (<Dashboard {...props} setAuth={setAuth}/> ) : ( <Redirect to="/login" />)}/>  
          <Route exact path="/restaurant/update/:id" render={props => !isAuthenticated ? (<EditorResturantDetails {...props} setAuth={setAuth}/> ) : ( <Redirect to="/login" />)}/> 
        </Switch>
      </Router>
    </UserProvider>
    
  )
}

export default App
