import React, { Fragment } from 'react'
import EditorAddRestaurants from './EditorAddRestaurants'
import EditorListRestaurants from './EditorListRestaurants'

function Editor() {
  return (
    <Fragment>
      <div>
         <EditorAddRestaurants/>
         <EditorListRestaurants/>
      </div>
    </Fragment>
  )
}

export default Editor