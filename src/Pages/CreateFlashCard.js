import { Link, NavLink } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Components/Error";
import * as Yup from "yup";
import PreviewImage from "../Components/PreviewImage";
import { deckActions } from "../Store";

const initialState = {
  Group: "",
  Description: "",
  deckImage: null,
  Terms: [{ Term: "", definition: "", image: null }],
};
function CreateFlashCard() {
  const fileRefs = useRef([]);
  const focusRefs = useRef([]);
  const deckRef = useRef();
  const dispatch= useDispatch();

  // const terms = useSelector((state) => state.deck);

  // const [image, setImage] = React.useState(false);

  // // const url = {
  // //   image: `data:image/png;base64,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`,
  // // };

  // const imageHandler = () => {
  //   setImage(true);
  // };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, { resetForm }) => {
        console.log("inside formk submit")
        dispatch(deckActions.deckDetailsAdd(values));
        resetForm();
      }}
      validationSchema={Yup.object({
        Group: Yup.string()
          .required("This Field is required")
          .min(4, "Group Name needs to be atleast 4 characters")
          .max(15, "Group name must be of less than 15 chars"),
        Description: Yup.string()
          .required()
          .max(400, "Description can be of maximimum 400 characters"),

        Terms: Yup.array(
          Yup.object({
            Term: Yup.string()
              .required("TermName is required")
              .min(4, "Term must contain 3 chars at minimum")
              .max(15, "Term cannot contain more than 15 characters"),
            definition: Yup.string()
              .required("Term Description is required")
              .min(5, "Term must contain at least 5 characters")
              .max(400, "Term must contain 400 chars at max"),
              image:Yup.string().required("Image is required")
          })
        )
          .min(1)
          .max(10, "too many elements"),
      })}
    >
      {({
        values,
        errors,
        isSubmitting,
        setFieldValue,
        setFieldError,
        setFieldTouched,
      }) => (
        <Form>
          <div className=" whole-form  px-1 py-1 ">
            <div className="main my-2">
              {/* navigation */}

              {/* page header */}
              <div className="Heading my-4 py-1 px-1 mx-auto ml-[28%] sm:ml-[35%]  transition-all cursor-pointer">
                <h1 className="heading   text-lg sm:text-2xl  md:text-3xl lg:text-3xl  text-blue-600  transition-all  ">
                  Create Flash Card
                </h1>
              </div>

              {/* first form */}
              <section className="  flex flex-wrap first-form bg-[white] my-4 py- px-1  mx-[2%]     sm:mx-[5%] md:mx-[6%] lg:mx-[6%]   transition-all border border-black  border-separate shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                {/* GroupName label and input */}
                <div className="groupName   flex flex-col  justify-start px-[0.2%] py-[0.2%] mx-[0.2%]  my-[1%] basis-[50%]  transition-all">
                  {/* grouplabel */}
                  <label className="pl-1 py-1  w-[99.8%] text-xs md:text-base lg:text-xl transition-all   ">
                    Group Name{" "}
                    <span className=" text-red-500  md:text-lg   ">*</span>
                  </label>

                  {/* groupInput */}
                  <Field
                    className=" focus:border-2 placeholder:text-base    focus:border-blue-400 bg-white px-1 py-1 x  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  text-[12px]  md:text-base lg:text-xl transition-all outline-none hover:border-1       border border-black "
                    placeholder="Enter Group Name"
                    name="Group"
                  ></Field>
                  <ErrorMessage
                    className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                    component={Error}
                    name="Group"
                  ></ErrorMessage>
                </div>

                {/*group image upload*/}
                <div
                  className={`${
                    values.deckImage ? "" : ""
                  }      px-[0.2%]  ml-[1%]  my-[1%]  flex flex-col  justify-start items-center  self-center basis-[40%] overflow-hidden`}
                >
                  <label
                    className={` ${
                      values.deckImage ? "hidden" : ""
                    } text-transparent pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   `}
                  >
                    sfsfsfs
                  </label>

                  <button
                    className={` ${
                      values.deckImage
                        ? "px-0  hover:bg-transparent w-24 sm:w-36 md:w-36 h-auto py-0 "
                        : "w-28 px-2 py-1"
                    } border border-black group shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex space-x-1 bg-blue-500   hover:bg-blue-900  transition-all outline-none hover:border-1     items-center self-stretch `}
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => {
                      deckRef.current.click();
                      if (values.deckImage) {
                        setFieldValue(`deckImage`, null);
                      }
                    }}
                  >
                    {values.deckImage && (
                      <PreviewImage
                        className="  bg-red-400 rounded-md border  object:cover object:center"
                        file={values.deckImage}
                      />
                    )}
                    {!values.deckImage && (
                      <span className="flex  ">
                        <span className="pt-[3px] text-xs md:text-base lg:text-xl mx-[1%]  text-white     ">
                          <FiUpload></FiUpload>
                        </span>
                        <span className="text-[12px] md:text-base lg:text-lg    text-white   ">
                          Upload
                        </span>
                      </span>
                    )}
                  </button>
                </div>

                {/* group description and label  */}
                <div className="groupName  flex flex-col px-[0.2%] py-[0.2%] mx-1  my-1  transition-all basis-[80%] md:basis-[60%]">
                  {/* description label */}
                  <label className="pl-1 py-1  text-xs md:text-base lg:text-xl transition-all    ml-1">
                    Group Description
                  </label>

                  {/*  group description input */}
                  <Field
                    as="textarea"
                    name="Description"
                    className="   focus:border-2 placeholder:text-base focus:border-blue-400 border border-black bg-white overflow-hidden   my-1 px-1 py-1 x    text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all outline-none hover:border-1      "
                    placeholder="Enter Group Description"
                  ></Field>
                  <ErrorMessage
                    className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                    component={Error}
                    name="Description"
                  ></ErrorMessage>
                  {/* image upload hidden input */}
                  <input
                    className="mx-1 my-1 bg-white px-2 py-1 hidden"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    ref={deckRef}
                    onChange={(event) => {
                      if (event.target.files[0]) {
                        if (event.target.files[0].size > 1097152) {
                          setFieldError(
                            "deckImage",
                            "Group Image size should be less than 1 mb"
                          );
                          setFieldTouched("deckImage");
                          alert("Deck-Image size is greater than 1 mb");
                        }
                        if (event.target.files[0].size < 1097152) {
                          const reader = new FileReader();

                          reader.readAsDataURL(event.target.files[0]);
                          reader.onload = () => {
                            console.log("inside deck onload");
                            setFieldValue(`deckImage`, reader.result);
                          };
                        }
                      }
                    }}
                  ></input>
                </div>
              </section>

              {/* second formx */}
              <FieldArray name="Terms">
                {({ push, remove }) => (
                  <section className=" mt-[2%] second-formb bg-[white] border border-black my-[0.5%] py-1 px-1 mx-[2%]    flex flex-col sm:mx-[5%] md:mx-[6%] lg:mx-[6%]  transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    {/* single term input */}

                    {values.Terms.map((item, index) => (
                      <div
                        className="flex   flex-wrap  py-1 mx-1 my-1  space-y-1 rounded-lg  items-start   "
                        key={index}
                      >
                        {/* index */}
                        <h1 className=" w-4 h-4 shrink-0 mt-[2%] basis-[3.5%] bg-blue-600 text-white px-1 py-1 rounded-full flex items-center justify-center    text-[10px] sm:text-[14px] md:text-[16xpx] lg:text-[20px]    transtion-all sm:w-6 sm:h-6 md:w-8 md:h-8  lg:w-10 lg:h-10">
                          {index + 1}
                        </h1>

                        {/*term name input*/}
                        <div className="  basis-[40%] lg:basis-[25%] flex flex-col px-[0.5%]   py-[0.5%]    overflow-hidden ">
                          <label className="pl-1 py-1 text-xs md:text-base lg:text-xl transition-all   ">
                            Term Name{" "}
                            <span className=" text-red-500  md:text-lg   ">*</span>
                          </label>

                          <Field name={`Terms[${index}].Term`}>
                            {({ field, form, meta }) => (
                              <input
                                {...field}
                                className=" focus:border-2 focus:border-blue-400   placeholder:text-base border border-black px-1 py-1  bg-white text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  md:text-base lg:text-xl transition-all  hover:border-1      outline-none"
                                ref={(element) =>
                                  (focusRefs.current[index] = element)
                                }
                                placeholder="Enter Term Name"
                                type="text"
                              ></input>
                            )}
                          </Field>
                          <ErrorMessage
                            name={`Terms[${index}].Term`}
                            component={Error}
                            className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>
                        </div>

                        {/* term description above lg */}
                        <div className=" basis-[60%] lg:basis-[50%]   flex-col  hidden  lg:flex  pl-[3%] py-[0.5%]     ">
                          <label className="pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   ">
                            Term Definition{" "}
                            <span className=" text-red-500  md:text-lg   ">*</span>
                          </label>
                          <Field
                            as="textarea"
                            name={`Terms[${index}].definition`}
                            className=" focus:border-2 focus:border-blue-400  overflow-hidden placeholder:text-base border border-black py-1 bg-white    px-1 text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all  hover:border-1      outline-none"
                            placeholder="Enter Term Description"
                          ></Field>
                          <ErrorMessage
                            name={`Terms[${index}].definition`}
                            component={Error}
                            className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>

                          {/* termImage input hidden  */}
                          <input
                            hidden
                            ref={(element) =>
                              (fileRefs.current[index] = element)
                            }
                            type="file"
                            accept=".png,jpg,jpeg"
                            onChange={(event) => {
                              if (event.target.files[0]) {
                                if (event.target.files[0].size > 1097152) {
                                  alert("Term Image size is greater than 1 mb");
                                }
                                if (event.target.files[0].size < 1097152) {
                                  const reader = new FileReader();

                                  reader.readAsDataURL(event.target.files[0]);
                                  reader.onload = () => {
                                    console.log("inside load");
                                    console.log(reader.result);
                                    setFieldValue(
                                      `Terms[${index}].image`,
                                      reader.result
                                    );
                                  };
                                }
                              }
                            }}
                          ></input>
                        </div>

                        {/* term image upload */}
                        <div
                          className={` hidden   px-[1%] py-[0.5%]   grow-[2] ${
                            values.Terms[index].image
                              ? "  flex flex-row "
                              : " flex flex-col"
                          }       basis-[15%] px-[0.2%]  ml-[0%] items-center self-center  
                         `}
                        >
                          {/* // add and edit button */}

                          {/* */}
                          <div>
                            {/* edit */}
                            {values.Terms[index].definition &&
                              values.Terms[index].Term &&
                              values.Terms[index].image && (
                                <button
                                  className=" "
                                  type="button"
                                  disabled={isSubmitting}
                                  onClick={() => {
                                    focusRefs.current[index].focus();
                                  }}
                                >
                                  <span className="  text-lg md:text-2xl lg:text-4xl  mx-[1%] text-blue-700 font-extrabold">
                                    <BiEdit color="#0033ff"></BiEdit>
                                  </span>
                                </button>
                              )}

                            {/* delete */}
                            {values.Terms.length > 1 && (
                              <button
                                className={`${
                                  values.Terms[index].definition &&
                                  values.Terms[index].Term &&
                                  values.Terms[index].image
                                    ? "visible"
                                    : "hidden"
                                }`}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => {
                                  remove(index);
                                  // refs.current.splice(index, index + 1);
                                }}
                              >
                                <span className=" text-sm md:text-lg lg:text-4xl  text-blue-00 font-extrabold bg-blue-400">
                                  <MdDelete></MdDelete>
                                </span>
                              </button>
                            )}
                          </div>
                          <label
                            className={` ${
                              values.Terms[index].image ||
                              values.Terms.length > 0
                                ? " hidden "
                                : ``
                            }  text-transparent pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   `}
                          >
                            <span className=" text-transparent   ">
                              *
                            </span>
                          </label>

                          <button
                            className={` ${
                              values.Terms[index].image
                                ? "px-0  hover:bg-transparent hover:border-white   py-0  "
                                : " "
                            }   border border-black  group shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex space-x-1 bg-white    transition-all outline-none hover:border-1     hover:text-white  items-center  justify-center `}
                            disabled={isSubmitting}
                            type="button"
                            onClick={() => {
                              fileRefs.current[index].click();
                              if (values.Terms[index].image) {
                                setFieldValue(`Terms[${index}].image`, null);
                              }
                            }}
                          >
                            {values.Terms[index].image ? (
                              <PreviewImage
                                className=" bg-red-400 rounded-md border    object:center  "
                                file={values.Terms[index].image}
                              />
                            ) : (
                              <span className="flex ">
                                <span className="pt-[3px] text-xs md:text-base lg:text-xl  mx-[3%] text-blue-700 ">
                                  <FiUpload></FiUpload>
                                </span>
                                <span className="text-[12px]  md:text-base lg:text-lg   text-blue-700  ">
                                  Upload
                                </span>
                              </span>
                            )}
                          </button>
                        </div>

                        {/* dummy div for upload wrapper */}

                        <div className=" basis-[10%] ml-6 sm:ml-8 lg:ml-1   transition-all flex items-center self-center">
                          <div className="flex flex-col items-center justify-around  self-stretch">
                            {/* edit button */}
                            <button
                              className="   my-1 mx-1 sm:text-xl md:text-xl lg:text-2xl xl:text-3xl  transition-all text-xl text-blue-700     -125   self-start"
                              type="button"
                              onClick={() => {
                                focusRefs.current[index].focus();
                              }}
                            >
                              <BiEdit></BiEdit>
                            </button>

                            {/* delete button */}
                            {values.Terms.length > 1 && (
                              <button
                                className=" my-1 mx-1 sm:text-xl md:text-xl lg:text-2xl xl:text-3xl transition-all text-xl text-blue-700  self-end    -125 "
                                type="button"
                                onClick={() => {
                                  remove(index);
                                  // refs.current.splice(index, index + 1);
                                }}
                              >
                                <MdDelete></MdDelete>
                              </button>
                            )}
                          </div>

                          <button
                            className={`${values.Terms[index].image?"":" bg-blue-500  borderborder-black hover:bg-blue-900 "} px-[2%] py-[2%] mx-1 my-1 w-24 sm:w-36 md:w-36   flex justify-center items-center   transition-all `}
                            onClick={() => {
                              fileRefs.current[index].click();
                              if (values.Terms[index].image) {
                                setFieldValue(`Terms[${index}].image`, null);
                              }
                            }}
                            type="button"
                          >
                            {values.Terms[index].image && (
                              // <PreviewImage
                              //   file={url.image}
                              //   className="  w-full object-cover object-center h-14 sm:h-16 md:h-20 lg:h-24 transition-all"
                              // ></PreviewImage>

                              <PreviewImage
                                className="  w-full object-cover object-center  transition-all "
                                file={values.Terms[index].image}
                              />
                            )}
                            {!values.Terms[index].image && (
                              <span className=" flex  flex-row items-center ">
                                <span className=" px-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm   text-white   ">
                                  <FiUpload></FiUpload>
                                </span>
                                <span className=" pr-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm   text-white    ">
                                  Upload
                                </span>
                              </span>
                            )}
                          </button>
                          <ErrorMessage
                            name={`Terms[${index}].image`}
                            component={Error}
                            className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>
                        </div>

                        {/* term description below lg */}
                        <div className="  basis-[90%]  flex flex-col   lg:hidden ml-[3%] pl-[3%] py-[0.5%]     sm:pl-[1%]  ">
                          <label className="pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   ">
                            Term Definition{" "}
                            <span className=" text-red-500  md:text-lg  ">*</span>
                          </label>
                          <Field
                            as="textarea"
                            name={`Terms[${index}].definition`}
                            className=" focus:border-2 placeholder:text-base focus:border-blue-400 border border-black py-1 bg-white    px-1 text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all overflow-hidden hover:border-1      outline-none"
                            placeholder="Enter Term Description"
                          ></Field>
                          <ErrorMessage
                            name={`Terms[${index}].definition`}
                            component={Error}
                            className=" text-red-500  md:text-lg  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>

                          {/* termImage input hidden  */}
                          <input
                            hidden
                            ref={(element) =>
                              (fileRefs.current[index] = element)
                            }
                            type="file"
                            accept=".png,jpg,jpeg"
                            onChange={(event) => {
                              if (event.target.files[0]) {
                                if (event.target.files[0].size > 1097152) {
                                  alert("Term Image size is greater than 1 mb");
                                }
                                if (event.target.files[0].size < 1097152) {
                                  const reader = new FileReader();

                                  reader.readAsDataURL(event.target.files[0]);
                                  reader.onload = () => {
                                    console.log("inside load");
                                    // console.log(reader.result);
                                    setFieldValue(
                                      `Terms[${index}].image`,
                                      reader.result
                                    );
                                  };
                                }
                              }
                            }}
                          ></input>
                        </div>
                      </div>
                    ))}

                    {/* addmore button */}
                    <div>
                      <button
                        className=" ml-[2%] mx-1 my-1  px-[0.4%] py-[0.4%] text-blue-500   text-[12px]  hover:scale-[120%] md:text-base lg:text-xl transition-all duration-250   -110   hover:text-blue-700 "
                        type="button"
                        onClick={() => {
                          push({ Term: "", definition: "", image: null });
                        }}
                      >
                        Add More +{" "}
                      </button>
                    </div>
                  </section>
                )}
              </FieldArray>

              <div>
                {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                <button
                  type="submit"
                  className="py-2 px-6 rounded-sm hover:scale-110 bg-blue-700 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  ml-[40%]  text-base  sm:text-xl  md:text-2xl  transition-all text-white hover:text-white  flex  "
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateFlashCard;
