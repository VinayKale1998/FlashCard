import React from "react";
import CreateFlashCard from "./CreateFlashCard";
import { Link, NavLink, Outlet } from "react-router-dom";
import MyFlashCards from "./MyFlashCards";

function HomePage() {
  return (
    <div className="Create FlashCard Page ">
      <nav className="flex flex-row items-center  justify-between shadow-[5px_5px_0px_0px_rgba(37,99,235)] px-[0.5%] py-[1%]  bg-white">
        <NavLink
          to="/"
          className="ml-[0.5%] flex font-sans  w-[10%]  text-xl sm:text-3xl  md:text-4xl lg:5xl   transition-all  text-blue-600"
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
                ? "text-lg font-sans sm:text-1xl ml-10  scale-105 text-blue-600 md:text-2xl mx-3 my-1   hover:text-blue  transition-all"
                : "text-lg font-sans  sm:text-1xl ml-10 md:text-2xl   mx-3 my-1  hover:text-blue  transition-all"
            }
          >
            My FlashCards
          </NavLink>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

export default HomePage;
