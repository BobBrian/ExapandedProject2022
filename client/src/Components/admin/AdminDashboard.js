import React,{Fragment} from 'react'
import AddEditor from './AddEditor'
import ListUsers from './ListUsers'

function AdminDashboard() {
  return (
    <Fragment>
      <div>
        <AddEditor/>
        <ListUsers/>
      </div>
    </Fragment>
  )
}

export default AdminDashboard