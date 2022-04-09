import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    //Now where using the UseState

    const [rest, setRest] = useState([]);

    const [user, setUser] = useState([])

    const [selectedrest , setSelectedRest] = useState([])

    const [selectreview, setSelectReview] = useState([])


    return(
        <UserContext.Provider value = {{rest, setRest , user, setUser , selectedrest , setSelectedRest, selectreview , setSelectReview }}>
            {children}
        </UserContext.Provider>
    )
}