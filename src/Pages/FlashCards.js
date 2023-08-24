import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { ImDownload } from "react-icons/im";
import { BiShareAlt } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { BiLeftArrow } from "react-icons/bi";

import PreviewImage from "../UI-Components/PreviewImage";
import ShareModal from "../UI-Components/ShareModal";

//using saveAs to facilitate download for the user
import { saveAs } from "file-saver";

// This page renders the expansion of the selected Group(deck) by rendering the term details using a  custom carousel for images and allows user to download and share the current deck

function FlashCards() {
  //getting the  index of the deck  from the window location for displaying the respective deck
  const params = useParams();
  const index = params.index;

  //getting the deck state from the redux store
  const decks = useSelector((state) => state.deck);

  //getting the length of the requested deck
  const itemNos = decks[index]?.Terms?.length || 0;

  // term state for custom carousel movement
  const [currentTerm, setTerm] = useState(0);

  const [turnCard, setTurn] = useState(false);

  //using ref here to bind it to the carousel for the DOM manipulation
  const carouselRef = useRef();

  const [modal, setModal] = React.useState(false);

  //handling left scroll of the carousel to scroll using the cliendwidth property and scrollLeft property of the current object
  const leftScroll = () => {
    const width = carouselRef.current.clientWidth;
    // console.log(width);
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - width;
    setTerm((prevterm) => {
      if (prevterm === 0) {
        return prevterm;
      } else {
        return prevterm - 1;
      }
    });
  };

  //handling right scroll of the carousel to scroll using the cliendwidth property and scrollLeft property of the current object
  //in this case we just add extra width instead of subtracting it
  const rigthScroll = () => {
    setTerm((prevterm) => {
      return prevterm + 1;
    });

    const width = carouselRef.current.clientWidth;
    // console.log(width);
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft + width;
  };

  //modal handler to handle the share modal visibility
  const modalHandler = () => {
    setModal((prevModal) => !prevModal);
  };

  //using blob to provide download option to the user for downloading the viewing deck
  const handleDownload = () => {
    // console.log("inside download");
    const file = new Blob(
      localStorage.getItem("Decks") ? [localStorage.getItem("Decks")] : [" "],
      {
        type: "application/json",
      }
    );
    saveAs(file, "Deck.json");
  };

  return (
    <div>
      {/* gets index from the path parms and check if the decks has that index in the formik state for rendering the respective deck expansion */}
      {decks[index] && (
        <div className=" flashcard  transition-all mt-2">
          {/* rendering the group information , group name and group description and also a back button which goes to the myflashcard page */}
          <div className="text-3xl flex ml-5 mt-4">
            {/* using link with relative back path which leads to myflashcard page */}
            <Link to=".." relative="path" className="hidden md:block">
              <BiArrowBack></BiArrowBack>
            </Link>

            {/* Deck name and description */}
            <section className=" space-y-0  px-1 py-1 group-desc   mx-2 flex flex-col min-h-[16vh] md:h-[16vh] justify-center ml-[10vw] md:ml-[18vw] max-w-[80%] md:max-w-[48%]  ">
              <div className="Group Name   text-sm md:text-md lg:text-lg xl:text-xl transition-all static  flex  items-center   ">
                <span className=" font-bold">Deck : </span>
                {decks[index].Group}
              </div>

              <div className="Group Name   my-2   text-sm  md:text-md lg:text-lg xl:text-xl transition-all overflow-auto">
                <span className="font-bold">Description : </span>{" "}
                {decks[index].Description.slice(0, 200)}
              </div>
            </section>
          </div>

          <section className="Deck display flex flex-row my-1 mx-2 ml-4 ">
            {/*  rendering the list of terms using map into buttons which when clicked will go the respective image in the carousel */}
            <div className="flashcards rounded-lg hidden md:flex shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] w-[15%] mx-2 my-    flex-col items-center space-y-2 text-xs md:text-md lg:text-lg xl:text-xl transition-all">
              <h1 className="mt-2 text-md md:text-lg lg:text-2xl  mb-2  font-bold border border-b-4 border-blue-600 border-l-0 border-r-0 border-t-0 w-full text-center">
                {" "}
                FlashCards
              </h1>
              {decks[index].Terms.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${
                    index === currentTerm ?"bg-blue-500 text-white":""
                  } my-1 ml-1 w-[80%] border font-bold border-blue-800 rounded-md hover:text-white hover:bg-blue-500 hover:scale-[110%]  transition-all text-xs md:text-md lg:text-lg xl:text-xl`}
                  name={item.term}
                  onClick={() => {
                    setTerm(index);
                    const width = carouselRef.current.clientWidth;
                    // console.log(width);
                    carouselRef.current.scrollLeft = width * index;
                  }}
                >
                  {item.Term}
                </button>
              ))}
            </div>

            {/* Carousel which comes with left and right scroll, renders the list of images for the respective deck right and left scroll handled by the leftScroll and rightScroll methods above*/}
            <div className="relative carousel  ml-1  my-1 px-3 py-2  overflow-hidden flex  scroll-smooth transition-all">
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

              {/* container for the image carousel */}
              <div
                className="  container relative  flex overflow-hidden  w-[80vw]  md:w-[50vw] h-auto scroll-smooth ml-6 mr-8"
                ref={carouselRef}
              >
                {!turnCard &&
                  decks[index].Terms.map((item, index) => (
                    <div
                      className=" relative min-w-[100%]  max-w-[100%] "
                      key={index}
                    >
                      <button
                        className=" absolute bottom-1  right-[40%] lg:right-[45%] mx-1 my-1 px-1 py-1 bg-blue-600 text-white rounded-md text-sm md:text-md lg:text-lg xl:text-xl hover:scale-110 transition-all"
                        onClick={() => {
                          setTurn(true);
                        }}
                      >
                        Flip card
                      </button>
                      {/* preview image used to render the images of the terms */}
                      <PreviewImage
                        className=" w-full   max-h-[30vh] sm:max-h-[60vh] px-1 border border-1 border-blue-700 rounded-md"
                        file={item.image}
                      ></PreviewImage>
                    </div>
                  ))}
                {turnCard && (
                  <div className=" relative min-w-[100%] flex-col space-y-1 max-w-[100%] border border-1  bg-blue-100  min-h-[30vh] sm:min-h-[60vh]  flex items-center  justify-center max-h-[30vh] sm:max-h-[60vh]  border-blue-700 rounded-md overflow-auto">
                    <div className="border border-1 bg-white border-blue-400 flex flex-col w-auto px-2 py-2 max-w-[60%]  rounded-md  overflow-auto">
                      <span className=" px-1 py-1   text-xs sm:text-lg md:text-lg lg:text-lg xl:text-xl  overflow-auto">
                      <span className=" text-blue-700 font-bold">Term : </span>
                        {decks[index].Terms[currentTerm].Term.slice(0, 20)}
                      </span>
                      <span className=" px-1 py-1    text-xs sm:text-lg md:text-lg lg:text-lg xl:text-xl  overflow-auto">
                        <span className="text-blue-700 font-bold">Definition: </span>
                        {decks[index].Terms[currentTerm].definition.slice(
                          0,
                          100
                        )}
                      </span>
                    </div>

                    <button
                      className=" absolute bottom-1  right-[40%] lg:right-[45%] mx-1 my-1 px-1 py-1 bg-blue-600 text-white rounded-md text-sm md:text-md lg:text-lg xl:text-xl hover:scale-110 transition-all"
                      onClick={() => {
                        setTurn(false);
                      }}
                    >
                      Flip card
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* share and download options  for resolution greater than medium breakpoint */}
            <div className="   Justify Center hidden md:flex  flex-row items-center  relative  rounded-lg self-start justify-center w-[14%] px-1 py-1 mt-5   text-xs md:text-md lg:text-lg xl:text-xl transition-all shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
              {/* //download button which calls the handleDownload upon click */}
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

              {/* //share  button which changes the modal state upon click */}
              {/* rendering shareModal by listening to userclicks on the share button below*/}
              {modal && <ShareModal onClick={modalHandler}></ShareModal>}
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

          {/* rendering the current item in the carousel and total items in item/total item format which changes when user uses the scroll buttons */}
          <div className="  flex flex-row  space-x-10 md:space-x-10 items-start justify-center ">
            <div className="text-md md:text-lg lg:text-2xl  text-blue-600 ">
              <span className="font-bold">{`${
                currentTerm + 1
              }/${itemNos} `}</span>{" "}
              <span className="text-black ml-2 md:hidden">
                {" "}
                Term: {decks[index].Terms[currentTerm].Term}{" "}
              </span>
            </div>

            {/* share and download options  for resolution lesser than medium breakpoint */}
            <div className="  w-auto  flex md:hidden items-center  space-x-5   rounded-lg self-start justify-center  px-1 py-1  text-xs md:text-md lg:text-lg xl:text-xl transition-all shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
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
                {modal && <ShareModal onClick={modalHandler}></ShareModal>}
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

export default FlashCards;
