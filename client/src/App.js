import React,{Fragment, useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect ,Link} from "react-router-dom";
import { UserProvider } from './Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Registration from './Registration';
import Landing from './Landing';
import Dashboard from './Dashboard';
import EditorResturantDetails from './Components/editor/EditorResturantDetails';
import AdminListRestaurants from './Components/admin/AdminListRestaurants';
import CustomerResturantDetails from './Components/customer/CustomerResturantDetails';
toast.configure();
//used for the main routing

function App  ()  {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {

      const response = await fetch("http://localhost:5000/restaurant/verify",{
        method: "GET",
        headers: {jwt_token: localStorage.token}
      })

      const parseVerify = await response.json()
      
      parseVerify === true ? setIsAuthenticated(true): setIsAuthenticated(false)

      
    } catch (err) {

      console.error(err.message)
      
    }
  }

  useEffect(() =>{
    checkAuthenticated()
  },[])

  return (
    <UserProvider>
      <Fragment>
        <Router>
        <div className='container'>
            <Switch>
                  <Route exact path="/landing" component={Landing}/> 

                  <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/> ) : 
                  ( <Redirect to="/dashboard" />)}/>  

                  <Route exact path="/register" render={props => !isAuthenticated ? (<Registration {...props} setAuth={setAuth}/> ) : 
                  ( <Redirect to="/login" />)}/>

                  <Route exact path="/dashboard" render={props => !isAuthenticated ? (<Dashboard {...props} setAuth={setAuth}/> ) : 
                  ( <Redirect to="/login" />)}/>  

                  <Route exact path="/list/editor/restaurant/details/:id" render={props => !isAuthenticated ? 
                  (<EditorResturantDetails {...props} setAuth={setAuth}/> ) : ( <Redirect to="/login" />)}/>

                  <Route exact path="/list/customer/restaurant/details/:id" render={props => !isAuthenticated ? 
                  (<CustomerResturantDetails {...props} setAuth={setAuth} /> ) : ( <Redirect to="/login" />)}/> 

                  <Route exact path="/list/admin/restaurant/all" render={props => !isAuthenticated ? 
                  (<AdminListRestaurants {...props} setAuth={setAuth}/> ) : ( <Redirect to="/login" />)}/> 
            </Switch>
          </div>
        </Router>
      </Fragment>
    </UserProvider>
    
  )
}

export default App
