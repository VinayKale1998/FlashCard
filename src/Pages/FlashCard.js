import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { ImDownload } from "react-icons/im";
import { BiShareAlt } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { BiLeftArrow } from "react-icons/bi";

import PreviewImage from "../Components/PreviewImage";
import ShareModal from "../Components/ShareModal";
import { saveAs } from "file-saver";

function FlashCard() {
  //getting the params from the window location for displaying the respective deck
  const params = useParams();
  const index = params.index;

  //getting the deck state from the redux store
  const decks = useSelector((state) => state.deck);

  //getting the length of the requested deck
  const itemNos = decks[index]?.Terms?.length || 0;

  // term state for custom carousel movement
  const [currentTerm, setTerm] = useState(0);

  //using ref here to bind it to the carousel for the DOM manipulation
  const carouselRef = useRef();

  const [modal, setModal] = React.useState(false);

  // useEffect(() => {
  //   console.log(decks[index].Terms[currentTerm].image);
  // }, [currentTerm]);

  const leftScroll = () => {
    const width = carouselRef.current.clientWidth;
    console.log(width);

    //  carousel.scrollLeft = carousel.scrollLeft-width;
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - width;
    setTerm((prevterm) => {
      if (prevterm === 0) {
        return prevterm;
      } else {
        return prevterm - 1;
      }
    });
  };
  const rigthScroll = () => {
    setTerm((prevterm) => {
      return prevterm + 1;
    });

    // let carousel= document.querySelector('.carousel')
    const width = carouselRef.current.clientWidth;
    console.log(width);
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft + width;
  };

  // const cardsScroll = (index) => {
  //   const width = carouselRef.current.clientWidth;
  //   carouselRef.current.scrollLeft = carouselRef.current.scrollLeft;
  // };

  const modalHandler = () => {
    setModal((prevModal) => !prevModal);
  };

  const handleDownload = () => {
    console.log("inside download");
    const file = new Blob(
      localStorage.getItem("Decks") ? [localStorage.getItem("Decks")] : [" "],
      {
        type: "application/json",
      }
    );
    saveAs(file, "Deck.json");
  };

  // carousel.scrollLeft = carousel.scrollLeft+width;

  return (
    <div>
      {decks[index] && (
        <div className=" flashcard  transition-all mt-2">
          <div className="text-3xl flex ml-5 mt-4">
            <Link to=".." relative="path " className="hidden md:block"  >
              <BiArrowBack ></BiArrowBack>
              
            </Link>
            <section className=" space-y-0 group-desc my-1  mx-2 flex flex-col h-[10vh] md:h-[13vh] justify-center ml-[10vw] md:ml-[30vw]">
            <div className="Group Name   text-sm md:text-md lg:text-lg xl:text-xl transition-all static  flex  items-center   ">
              <span className=" font-bold">Deck : </span>
              {decks[index].Group}
            </div>

            <div className="Group Name   my-2   text-sm  md:text-md lg:text-lg xl:text-xl transition-all overflow-hidden">
              <span className="font-bold">Description : </span>{" "}
              {decks[index].Description}
            </div>
          </section>
          </div>
          

          <section className="Deck display flex flex-row my-1 mx-2 ml-4 ">
            {/* flashcards list */}
            <div className="flashcards rounded-lg hidden md:flex shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] w-[15%] mx-2 my-2    flex-col items-center space-y-2 text-xs md:text-md lg:text-lg xl:text-xl transition-all">
              <h1 className="mt-2 text-md md:text-lg lg:text-2xl  mb-2  font-bold border border-b-4 border-blue-600 border-l-0 border-r-0 border-t-0 w-full text-center">
                {" "}
                FlashCards
              </h1>
              {decks[index].Terms.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className=" my-1 ml-1 w-[80%] border font-bold border-blue-800 rounded-md hover:text-white hover:bg-blue-500 hover:scale-[110%]  transition-all text-xs md:text-md lg:text-lg xl:text-xl"
                  name={item.term}
                  onClick={() => {
                    setTerm(index);
                    const width = carouselRef.current.clientWidth;
                    console.log(width);
                    carouselRef.current.scrollLeft = width * index;
                  }}
                >
                  {item.Term}
                </button>
              ))}
            </div>
            {/* termExpansion */}
            <div className=" relative carousel  ml-1  my-1 px-3 py-2  overflow-hidden flex  scroll-smooth transition-all">
              <button
                className="leftScroll absolute left-0  h-[100%] flex flex-col justify-center "
                onClick={leftScroll}
                disabled={currentTerm == 0 && true}
              >
                <span className="text-2xl md:text-4xl w-5 h-10  flex flex-col justify-center  rounded-md pb-2  hover:scale-125 text-blue-500 ">
                  <BiLeftArrow></BiLeftArrow>
                </span>
              </button>

              <button
                className="rightScroll absolute   left-[90%] md:left-[95%] h-[100%] g-red-600 flex flex-col justify-center   "
                onClick={rigthScroll}
                disabled={currentTerm === itemNos - 1}
              >
                <span className="text-2xl md:text-4xl w-5 h-10  flex flex-col justify-center  rounded-md pb-2  hover:scale-125 text-blue-500 ">
                  <BiRightArrow></BiRightArrow>
                </span>
              </button>
              <div
                className=" container relative  flex overflow-hidden  w-[80vw]  md:w-[50vw] h-auto scroll-smooth ml-6 mr-8"
                ref={carouselRef}
              >
                {decks[index].Terms.map((item, index) => (
                  <div className="min-w-[98%] max-w-[98%]">
                    <PreviewImage
                      className=" relative object-fill  h-auto  px-1 border border-1 border-blue-700 rounded-md"
                      file={item.image}
                    ></PreviewImage>
                  </div>
                ))}
              </div>
            </div>
            <div className="   Justify Center hidden md:flex  flex-row items-center  relative  rounded-lg self-start justify-center w-[14%] px-1 py-1 mt-5   text-xs md:text-md lg:text-lg xl:text-xl transition-all shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
              {modal && <ShareModal onClick={modalHandler}></ShareModal>}
              <div className=" flex flex-col  justify-center items-center w-full  mx-1 my-1 hover:scale-110 ">
                <span className="text-xs md:text-md lg:text-lg xl:text-xl border-b-2 border-blue-600 border-l-0 border-r-0 border-t-0">
                  {" "}
                  Download
                </span>
                <button onClick={handleDownload}>
                  <span className="text-lg  md:text-2xl text-blue-600 ">
                    <ImDownload></ImDownload>
                  </span>
                </button>
              </div>
              <div className=" flex flex-col items-center  w-full   justify-between  hover:scale-110">
                <span className="text-xs md:text-md lg:text-lg xl:text-xl border-b-2 border-blue-600 border-l-0 border-r-0 border-t-0">
                  {" "}
                  Share
                </span>
                <button onClick={modalHandler} className="">
                  <span className="text-lg   md:text-2xl hover:scale-105 text-blue-600 ">
                    <BiShareAlt></BiShareAlt>
                  </span>
                </button>
              </div>
            </div>
          </section>
          <div className="  flex flex-row  space-x-16 md:space-x-10 items-start justify-center ">
            <div className="text-md md:text-lg lg:text-2xl  text-blue-600 ">
              <span className="font-bold">{`${
                currentTerm + 1
              }/${itemNos} `}</span>{" "}
              <span className="text-black ml-2 md:hidden">
                {" "}
                Term: {decks[index].Terms[currentTerm].Term}{" "}
              </span>
            </div>

            <div className="  w-auto  flex md:hidden items-center  space-x-5   rounded-lg self-start justify-center  px-1 py-1  text-xs md:text-md lg:text-lg xl:text-xl transition-all shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
              {modal && <ShareModal onClick={modalHandler}></ShareModal>}
              <div className=" flex flex-col  justify-center items-center w-full text-xs md:text-md lg:text-lg xl:text-xl mx-1 my-1">
                <span className="text-md  md:text-md lg:text-lg xl:text-xl border-b-2 border-blue-600 border-l-0 border-r-0 border-t-0 ">
                  {" "}
                  Download
                </span>
                <button onClick={handleDownload}>
                  <span className="text-xl text-blue-500   md:text-2xl hover:scale-105 ">
                    <ImDownload></ImDownload>
                  </span>
                </button>
              </div>
              <div className=" flex flex-col items-center  w-full   justify-between">
                <span className="text-md md:text-md lg:text-lg xl:text-xl border-b-2 border-blue-600 border-l-0 border-r-0 border-t-0">
                  {" "}
                  Share
                </span>
                <button onClick={modalHandler} className="">
                  <span className="text-xl   md:text-2xl hover:scale-105 text-blue-500 ">
                    <BiShareAlt></BiShareAlt>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;
