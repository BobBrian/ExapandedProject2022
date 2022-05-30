import React,{Fragment, useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Registration from './Registration';
import Landing from './Landing';
import Dashboard from './Dashboard';
import CustomerTableDetails from './CustomerTableDetails';
import { UserProvider } from './Context/UserContext';
import EditorTableDetails from './EditorTableDetails';
import AdminListRestaurants from './AdminListRestaurants';
import EditorEditTableData from './EditorEditTableData';

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
        headers: { jwt_token: localStorage.token }
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
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Registration {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/list/customer/restaurant/details/:id"
              render={props =>
                isAuthenticated ? (
                  <CustomerTableDetails {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            /> 

            <Route
              exact
              path="/list/editor/restaurant/details/:id"
              render={props =>
                isAuthenticated ? (
                  <EditorTableDetails {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            /> 

            <Route
              exact
              path="/list/editor/update/details/:id"
              render={props =>
                isAuthenticated ? (
                  <EditorEditTableData {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            /> 

            <Route
              exact
              path="/admin/get/all"
              render={props =>
                isAuthenticated ? (
                  <AdminListRestaurants {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            /> 


            </Switch>


          </div>
        </Router>
      </Fragment>
    </UserProvider>
  )
}

export default App
