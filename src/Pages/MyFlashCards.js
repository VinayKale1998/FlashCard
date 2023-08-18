import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import React from "react";
import PreviewImage from "../Components/PreviewImage";

const MyFlashCards = () => {
  const decks = useSelector((state) => {
    const json = JSON.stringify(state.deck);
    localStorage.clear();
    localStorage.setItem("Decks", json);
    return state.deck;
  });

  return (
    //excessive margin added here
    <div className="main  mt-5 my-1  grid grid-cols-3 w-12/12 mb-96 pb-28 relative h-full ">
      <div
        className="   absolute left-[35%] top-[50%]  bg-white Empty px-2 py-2 mx-1 my-1 w-[38%] h-[150%] rounded-md flex flex-col space-y-8 "
      >
        {" "}
        <span className="text-3xl font-bold text-White  px-1 py-1 bg-red-400 pl-8 relative">
          No Flashcards created yet
        </span>
        
        <span className="text-3xl font-bold text-White  px-1 py-1 bg-red-400 pl-8 relative">
          Cick below to create a Flashcard
        </span>
        
        <div  className="bg-purple-700  text-white px-2 py-1 pl-7 rounded-lg ml-10 w-[50% ] max-w-[50%] absolute left-[20%]  top-24">
          <Link
            to=".."
            relative="path"
           className="text-white  w-[50%] max-w-[50%] "
          >
            Create Flashcard
          </Link>
        </div>
      </div>

      {decks.map((deck, index) => (
        <div
          className="w-[80%] h-[100%] flex  items-center px-10 relative mx-4  mt-20 mb-20 py-6  "
          key={index}
        >
          <div className="z-50 left-28">
            <div className="rounded-full absolute  font-bold bottom-40 w-28 h-28 left-[37%] border-2  border-purple-800  bg-white   text-purple-600">
              {deck.deckImage ? (
                <PreviewImage
                  className="w-28 h-28 rounded-full"
                  file={deck.deckImage}
                ></PreviewImage>
              ) : (
                <span className=" absolute top-10 left-3 ">No Image</span>
              )}
            </div>
          </div>

          <div className="   deck bg-white w-[100%] h-60 mx-1 my-1 py-3 px-3 flex flex-col items-center rounded-md border-2  border-purple-800 absolute top-0 left-0">
            <h1 className="font-bold text-xl  absolute top-12 left-[44%] h-10 uppercase text-purple-800">
              {deck.Group}
            </h1>
            <div className="  reative   w-68 h-20 absolute  top-20 left-5  leading-4 tracking-normal overflow-hidden ">
              {deck.Description}
            </div>
            <img src=""></img>

            <NavLink
              to={`${index}`}
              className=" border-2  border-purple-800 bg-purple-800 cursor-pointer bg-transparent text-purple-900  bg-purple-9 font-bold outline-none rounded-md absolute top-40 pl-14 pt-1 left-30 w-56 h-12 hover:bg-purple-800 hover:text-white "
            >
              View Cards
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyFlashCards;
