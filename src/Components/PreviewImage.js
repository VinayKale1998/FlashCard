
import React from 'react'

function PreviewImage({ file,className}) {

    // const [preview,setPreview]= React.useState(null)

    // console.log("Inside Preview")
    // const reader = new FileReader();
    
    // reader.readAsDataURL(file);
    // reader.onload=()=>{
    //     setPreview(reader.result)
    // }
  return (
    <div>
        {<img src={file}  className ={className} alt='Preview' ></img>}
    </div>
  )
}

export default PreviewImage