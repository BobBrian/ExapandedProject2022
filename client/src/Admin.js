import React,{Fragment} from 'react'
import AdminAddEditor from './AdminAddEditor'
import AdminListRestaurants from './AdminListRestaurants'

function Admin() {
  return (
    <Fragement>
         <AdminAddEditor/>
         <AdminListRestaurants/>
    </Fragement>
   
  )
}

export default Admin