import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import React from "react";
import PreviewImage from "../UI-Components/PreviewImage";


// This page renders a list of Groups(decks) if created by the user 
//flashcards created is retained upon page reload using locals
const MyFlashCards = () => {
  //accessing the deck state from redux store
  const decks = useSelector((state) => {
    return state.deck;
  });

  return (
    <div className="main  mt-10 ml-5  grid grid-cols-2 lg:grid-cols-4 w-12/12 mb-96 pb-28 relative h-full mx-2 my-2">
      {/* rendered when no decks are added by the user, no flashacards created yet and provides a link to the createflashcard  page */}
      {decks.length == 0 && (
        <div className=" w-[90vw] flex flex-col space-y-2 items-center justify-center   Empty px-2 py-2 my-[20vh]  mx-2  rounded-md     ">
          {" "}
          <span className=" text-White   px-1 py-1  relative text-xl  sm:text-xl  md:text-3xl ">
            No Flashcards created yet!
          </span>
          <div className="bg-blue-600 text-white px-5 py-1 flex items-center rounded-md">
            <Link
              to=".."
              relative="path"
              className="text-white text-base  sm:text-xl  md:text-2xl"
            >
              Create Flashcard
            </Link>
          </div>
        </div>
      )}

      {/* if there are decks in the redux state, list is rendered via map , each div contains the deck image, deck title and a shor deck description*/}
      {decks.length > 0 &&
        decks.map((deck, index) => (
          <div
            className="Single-Deck  rounded-lg bg-white-600  px-1 py-1 mx-2 my-1 flex flex-col  overflow-hidden justify-start items-center relative  text-base  sm:text-xl  md:text-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] hover:scale-105 transition-all"
            key={index}
          >
            {deck.deckImage && (
              <PreviewImage
                className="Group Name w-32 h-32 sm:w-36 md:w-44 px-1 py-1 mx-1 my-1 rounded-full border border-1 border-blue-700 "
                file={deck.deckImage}
              ></PreviewImage>
            )}
            {!deck.deckImage && (
              <PreviewImage
                className="Group Name w-32 h-32 sm:w-36 md:w-44 px-1 py-1 mx-1 my-1 rounded-full  border border-1 border-blue-700  "
                file={deck.Terms[0].image}
              ></PreviewImage>
            )}
            <div className="Group Name px-1 py-1 mx-1 my-1 text-base  sm:text-xl  md:text-xl font-bold relative ">
              {deck.Group.slice(0, 50)}
            </div>
            <div className=" flex items-center text-center Group Description px-1 py-1 mx-2 md:mx-4 mb-14 text-xs  sm:text-md  md:text-lg  overflow-hidden  relative ">
              {deck.Description.slice(0, 100)}
            </div>
            <div className=" border-2 border-blue-600 text-black  px-5 py-1 flex items-center rounded-md absolute bottom-1 mx-1 my-1 hover:scale-110  hover:bg-blue-500 hover:text-white transition-all">
              <Link
                to={`${index}`}
                relative="path"
                className="text-xs  sm:text-lg  md:text-xl "
              >
                View Cards
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyFlashCards;
