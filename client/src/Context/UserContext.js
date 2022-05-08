import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    //Now where using the UseState

    const [rest, setRest] = useState([]);

    const [user, setUser] = useState([])

    const [selectedrestaurant , setSelectedRestaurant] = useState([])

    const [selectedreview, setSelectedReview] = useState([])


    return(
        <UserContext.Provider value = {{rest, setRest , user, setUser , selectedrestaurant , setSelectedRestaurant, selectedreview , setSelectedReview}}>
            {children}
        </UserContext.Provider>
    )
}