import React,{Fragment} from 'react'
import AddRestaurant from './AddRestaurant'
import ListRestaurant from '../ListRestaurant'

function EditorDashboard() {
  return (
    <Fragment>
      <div>
        <AddRestaurant/>
        <ListRestaurant/>
      </div>
    </Fragment>
  )
}

export default EditorDashboard