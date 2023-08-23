import React from "react";

import { NavLink, Outlet } from "react-router-dom";

//HomePage contains the web app header "FlashKrew" with a nav bar for createflashcard and myflashcards page, it has a outlet for rendering routes from it
// By default the outler renders the below createflashcard page because of the router configurations

function HomePage() {
  return (
    <div className="Create FlashCard Page ">
      <nav className="flex flex-row items-center  justify-between shadow-[5px_5px_0px_0px_rgba(37,99,235)] px-[0.5%] py-[1%]  bg-white">
        <NavLink
          to="/"
          className="ml-[0.5%] flex font-sans  w-[10%]  text-lg sm:text-3xl  md:text-3xl lg:text-4xl  items-center  transition-all  text-blue-600"
        >
          FlashKrew{" "}
          <img
            src="https://png.pngtree.com/png-vector/20230504/ourmid/pngtree-flash-card-flat-icon-vector-png-image_7084651.png"
            alt=""
            width={50}
          ></img>
        </NavLink>
        <div className="flex   items-end justify-end">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " flex text-sm font-sans scale-105 text-blue-600 sm:text-xl md:text-2xl  mx-3 my-1  hover:text-blue  transition-all"
                : " flex text-sm font-sans scale-105 sm:text-xl  md:text-2xl  mx-3 my-1  hover:text-blue  transition-all"
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/MyFlashCards"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-sans sm:text-1xl ml-5  md:mr-32 scale-105 text-blue-600 md:text-2xl mx-3 my-1 md:mr:4   hover:text-blue  transition-all"
                : " text-sm font-sans sm:text-1xl ml-5  md:mr-32 scale-105  md:text-2xl mx-3 my-1 md:mr:4   hover:text-blue  transition-all"
            }
          >
            My FlashCards
          </NavLink>
        </div>
      </nav>

      {/* route renders here in the outlet */}
      <Outlet></Outlet>
    </div>
  );
}

export default HomePage;

// This page renders a list of Groups(decks) if created by the user 
//flashcards created is retained upon page reload using locals
