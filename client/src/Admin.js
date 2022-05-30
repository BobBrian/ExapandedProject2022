import React,{Fragment} from 'react'
import AdminAddEditor from './AdminAddEditor'
import AdminListRestaurants from './AdminListRestaurants'

function Admin() {
  return (
    <Fragment>
         <AdminAddEditor/>
         <AdminListRestaurants/>
    </Fragment>
   
  )
}

export default Admin