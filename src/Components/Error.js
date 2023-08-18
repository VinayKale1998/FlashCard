import React from 'react'

function Error(props) {
  return (
   <span className={props.className}>{props.children} !</span>
  )
}

export default Error