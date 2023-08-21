import React ,{useRef}from "react";
import classes from "./DownloadModal.module.css";

import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {" "}
    </div>
  );
};

const OverLay = (props) => {

  const ref = useRef()

  const printCurrent=(event)=>{
    console.log(event.target.innerHTML)
    const URL=event.target.innerHTML;
    navigator.clipboard.writeText(URL)
  }
  return <div className={classes.overLay}> 

  <div className="flex flex-col px-3 py-3 h-40 space-y-2">
  <button onClick={props.onClick} className="bg-red-500 flex justify-end"> </button>
  
    <h1 className="text-xl pl-2 font-bold"> Share</h1>
    <div className="flex flex-row w-[100%] pl-2">
      
    <input ref={ref} onClick={printCurrent} value={`Link :  ${window.location.href}`} className="outline-none border border-red-400 h-8 rounded-md pl-2 min-w-[85%]"></input>

    <button className="border border-red-400 rounded-md px-1 flex items-center">Copy</button>
    
   </div>
  </div>
  </div>
};

function DownloadModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClick}></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <OverLay onClick={props.onClick} link={props.link}>


        </OverLay>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
}

export default DownloadModal;
