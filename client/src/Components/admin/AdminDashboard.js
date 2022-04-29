import React,{Fragment} from 'react'
import AddEditor from './AddEditor'
import AdminListUsers from './AdminListUsers'


function AdminDashboard() {
  return (
    <Fragment>
      <div>
        <AddEditor/>
        <AdminListUsers/>
      </div>
    </Fragment>
  )
}

export default AdminDashboard