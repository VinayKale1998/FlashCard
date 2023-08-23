import classes from "./DeckCreatedModal.module.css";
import Card from "./Card";

import ReactDOM from "react-dom";
import React from 'react'


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onDismiss}></div>;
};

//Overaly which contains confirmation message
const ModelOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <div>
        <header className={classes.header}>
          <span className="font-bold"> Deck Created </span>
        </header>
        <div className={classes.content}><span className="font-bold">Go to My Flashcards to view your decks</span></div>
        <footer className={classes.actions}>
          
        </footer>
      </div>
    </Card>
  );
};

export default function DeckCreatedModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={props.onDismiss} />,
        document.getElementById("back")
      )}
      {ReactDOM.createPortal((<ModelOverlay onDismiss={props.onDismiss} title= {props.title} message={props.message}></ModelOverlay>),document.getElementById('over'))}
    </React.Fragment>
  );
}
