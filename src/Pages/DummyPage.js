import React from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import PreviewImage from "../Components/PreviewImage";
import { BiEdit } from "react-icons/bi";

function DummyPage() {
  const [image, setImage] = React.useState(false);

  const url = {
    image: `data:image/png;base64,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`,
  };

  const imageHandler = () => {
    setImage(true);
  };
  return (
    <div className="w-[50%] bg-red-200 ">
      <div className="  bg-blue-200 sm:min-w-[30%] sm:max-w-[35%]  md:min-w-[25%]  md:max-w-[30%] lg:min-w-[20%] lg:max-w-[25%] max-w-[60%] transition-all flex items-center">
        <div className="flex flex-col items-center justify-around  self-stretch">
          <span className="   my-1 mx-1 sm:text-xl md:text-xl lg:text-2xl xl:text-3xl  transition-all text-xl text-purple-700  bg-red-200  self-start">
            {" "}
            <BiEdit></BiEdit>
          </span>
          <span className=" my-1 mx-1 sm:text-xl md:text-xl lg:text-2xl xl:text-3xl transition-all text-xl text-purple-700 bg-red-200 self-end">
            <MdDelete></MdDelete>
          </span>
        </div>

        <button
          className="px-[2%] py-[2%] mx-1 my-1 bg-white   flex justify-center items-center self-center"
          onClick={imageHandler}
          type="button"
        >
          {image && (
            <PreviewImage
              file={url.image}
              className="  w-full object-cover object-center h-14 sm:h-16 md:h-20 lg:h-24 transition-all"
            ></PreviewImage>
          )}
          {!image && (
            <span className=" flex  flex-row items-center ">
              <span className=" px-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm  text-purple-700 ">
                <FiUpload></FiUpload>
              </span>
              <span className=" pr-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm  text-purple-700">
                Upload
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default DummyPage;
