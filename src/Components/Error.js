import React from 'react'


//component to render errors in the CreateFlashCard form
function Error(props) {
  return (
   <span className={props.className}>{props.children} *</span>
  )
}

export default Error