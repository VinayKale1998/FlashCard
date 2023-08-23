
import React from 'react'

function PreviewImage({ file,className}) {

// Component to render images
  return (
    <div>
        {<img src={file}   className ={className} alt='No image' ></img>}
    </div>
  )
}

export default PreviewImage