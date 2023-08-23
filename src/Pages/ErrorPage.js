import React from "react";

import { NavLink } from "react-router-dom";


//ErrorPage is bound as a fallback in the router configuration to ensure when the user enters an inavlid route upon the base route, the user is redirected to this page,
// contains  the page header and links to the Create FlashCard Page and MyFlashcards Page

function ErrorPage() {
  return (
    <div className="Create FlashCard Page ">
      <nav className="flex flex-row items-center  justify-between shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  px-[0.5%] py-[1%]  bg-white">
        <NavLink
          to="/"
          className="ml-[0.5%] flex  font-sans  w-[10%]  text-xl sm:text-3xl md:text-4xl lg:5xl   transition-all  text-blue-600"
        >
          FlashKrew{" "}
          <img
            src="https://png.pngtree.com/png-vector/20230504/ourmid/pngtree-flash-card-flat-icon-vector-png-image_7084651.png"
            alt=""
            width={50}
          ></img>
        </NavLink>
        <div className="flex    items-end justify-end">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " flex text-lg font-sans scale-105 text-blue-600 sm:text-1xl  md:text-2xl  mx-3 my-1  hover:text-blue  transition-all"
                : " flex text-lg font-sans  sm:text-1xl  md:text-2xl mx-3 my-1   hover:text-blue  transition-all"
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/MyFlashCards"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-sans sm:text-1xl ml-10 md:text-2xl  text-blue-600 mx-3 my-1  hover:text-blue  transition-all"
                : "text-lg font-sans  sm:text-1xl ml-10 md:text-2xl   mx-3 my-1  hover:text-blue  transition-all"
            }
          >
            My FlashCards
          </NavLink>
        </div>
      </nav>

      <div className="flex flex-col h-[100vh] items-center pt-[10%]">
        <h1 className="sm:text-xl ml-10 md:text-3xl font-bold ">
          Page Not found! &nbsp; Please use the below links
        </h1>
        <div className="mx-1 mt-5 flex border border-1  border-blue-500 rounded-md">
          <NavLink
            to="/"
            className={
              " flex text-lg font-sans scale-105 text-blue-600 sm:text-1xl  md:text-2xl  mx-4 my-1  hover:text-blue  transition-all hover:scale-110 "
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/MyFlashCards"
            className={
              " flex text-lg font-sans scale-105 text-blue-600 sm:text-1xl  md:text-2xl  mx-3 my-1  hover:text-blue  transition-all  hover:scale-110"
            }
          >
            My FlashCards
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
