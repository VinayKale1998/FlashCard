
import React from "react";
import { useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import Error from "../Components/Error";
import PreviewImage from "../Components/PreviewImage";
import { deckActions } from "../Store";


import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
//using yup library for formik validations


//intital state for the Formik form with Group referring to deck name and terms referring to array of term flashcards
const initialState = {
  Group: "",
  Description: "",
  deckImage: null,
  Terms: [{ Term: "", definition: "", image: null }],
};



function CreateFlashCard() {
  //file refs for the input elements for accessing files from the input elements 
  const fileRefs = useRef([]);

  //focus refs for the term text fields to provide focus when user clicks on edit card
  const focusRefs = useRef([]);

  //deck ref to use button to click the induce click action on the input field of type file //opens a browse window
  const deckRef = useRef();

  //dispatch to dispatch actions for storing state in redux
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, { resetForm }) => {
        console.log("inside formk submit");
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
            image: Yup.string().required("Image is required"),
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
              <section className="first form  rounded-md  flex flex-wrap first-form bg-[white] my-4 py- px-1  mx-[2%]     sm:mx-[5%] md:mx-[6%] lg:mx-[6%]   transition-all border border-blue-500 border-separate shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                {/* GroupName label and input */}
                <div className="groupName   flex flex-col  justify-start px-[0.2%] py-[0.2%] mx-[0.2%]  my-[1%] basis-[50%]  transition-all">
                  {/* grouplabel */}
                  <label className="pl-1 py-1  w-[99.8%] text-xs md:text-base lg:text-xl transition-all   ">
                    Group Name{" "}
                    <span className=" text-red-500  md:text-lg   ">*</span>
                  </label>

                  {/* groupInput */}
                  <Field
                    className=" focus:border-2 placeholder:text-xs sm:placeholder:text-base     focus:border-blue-400 bg-white px-1 py-1 x  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  text-[12px]  md:text-base lg:text-xl transition-all outline-none hover:border-1       border border-blue-500"
                    placeholder="Enter Group Name"
                    name="Group"
                  ></Field>
                  <ErrorMessage
                    className=" text-red-500  md:text-md  text-[10px] text-xs sm:text-sm"
                    component={Error}
                    name="Group"
                  ></ErrorMessage>
                </div>

                {/*group image upload*/}
                <div
                  className={`${
                    values.deckImage ? "" : ""
                  }      px-[0.2%]  ml-[1%]  my-[1%]  flex flex-col  justify-start items-start  self-start basis-[40%] overflow-hidden`}
                >
                  <label
                    className={` ${
                      values.deckImage ? "hidden" : ""
                    } text-transparent pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   `}
                  >
                    dummy
                  </label>

                  <button
                    className={` ${
                      values.deckImage
                        ? "px-0  hover:bg-transparent w-24 sm:w-36 md:w-36 h-auto py-0 "
                        : "w-16 md:w-24 lg:w-28 px-2 py-1"
                    } border border-blue-500 group shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex space-x-1 bg-blue-500   hover:bg-blue-900  transition-all outline-none hover:border-1     items-center  `}
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
                      <span className="flex flex-row text-center items-center justify-center ">
                        <span className="pt-[3px] text-xs md:text-base lg:text-xl mx-[1%]  text-white     ">
                          <FiUpload></FiUpload>
                        </span>
                        <span className="text-xs md:text-base lg:text-lg    text-white   ">
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
                    Group Description{" "}
                    <span className=" text-red-500  md:text-lg   ">*</span>
                  </label>

                  {/*  group description input */}
                  <Field
                    as="textarea"
                    name="Description"
                    className="   focus:border-2 placeholder:text-xs sm:placeholder:text-base  focus:border-blue-400 border border-blue-500 bg-white overflow-hidden   my-1 px-1 py-1 x    text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all outline-none hover:border-1      "
                    placeholder="Enter Group Description"
                  ></Field>
                  <ErrorMessage
                    className=" text-red-500  md:text-md  text-[10px] text-xs sm:text-sm"
                    component={Error}
                    name="Description"
                  ></ErrorMessage>
                  {/* image upload hidden input */}
                  <input
                    className="mx-1 my-1 bg-white px-2 py-1 hidden"
                    type="file"
                    accept=".png,.jpeg,.jpg,jpeg"
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
                  <section className="second-form rounded-md mt-[2%]  bg-[white] border border-blue-500 my-[0.5%] py-1 px-1 mx-[2%]    flex flex-col sm:mx-[5%] md:mx-[6%] lg:mx-[6%]  transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
                            <span className=" text-red-500  md:text-lg   ">
                              *
                            </span>
                          </label>

                          <Field name={`Terms[${index}].Term`}>
                            {({ field, form, meta }) => (
                              <input
                                {...field}
                                className=" focus:border-2 focus:border-blue-400   placeholder:text-xs sm:placeholder:text-base  border border-blue-500 px-1 py-1  bg-white text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  md:text-base lg:text-xl transition-all  hover:border-1      outline-none"
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
                            className=" text-red-500 md:text-md  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>
                        </div>

                        {/* term description above lg */}
                        <div className=" basis-[60%] lg:basis-[50%]   flex-col  hidden  lg:flex  pl-[3%] py-[0.5%]     ">
                          <label className="pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   ">
                            Term Definition{" "}
                            <span className=" text-red-500  md:text-lg   ">
                              *
                            </span>
                          </label>
                          <Field
                            as="textarea"
                            name={`Terms[${index}].definition`}
                            className=" focus:border-2 focus:border-blue-400  overflow-hidden placeholder:text-xs sm:placeholder:text-base  border border-blue-500 py-1 bg-white    px-1 text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all  hover:border-1      outline-none"
                            placeholder="Enter Term Description"
                          ></Field>
                          <ErrorMessage
                            name={`Terms[${index}].definition`}
                            component={Error}
                            className=" text-red-500 md:text-md text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>

                          {/* termImage input hidden  */}
                          <input
                            hidden
                            ref={(element) =>
                              (fileRefs.current[index] = element)
                            }
                            type="file"
                            accept=".png,.jpeg,.jpg,.jpeg"
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
                            <span className=" text-transparent   ">*</span>
                          </label>

                          <button
                            className={` ${
                              values.Terms[index].image
                                ? "px-0  hover:bg-transparent hover:border-white   py-0  "
                                : " "
                            }   border border-blue-500 group shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex space-x-1 bg-white    transition-all outline-none hover:border-1     hover:text-white  items-center  justify-center `}
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
                            className={`${
                              values.Terms[index].image
                                ? ""
                                : " bg-blue-500  borderborder-blue-500 hover:bg-blue-900 "
                            } px-[2%] py-[2%] mx-1 my-1 w-24 sm:w-36 md:w-36   flex justify-center items-center   transition-all `}
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
                            className=" text-red-500  md:text-md  text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>
                        </div>

                        {/* term description below lg */}
                        <div className="  basis-[90%]  flex flex-col   lg:hidden ml-[2%] sm:ml-[3%] pl-[3%] py-[0.5%]     sm:pl-[1%]  ">
                          <label className="pl-1 py-1  text-xs md:text-base lg:text-xl transition-all   ">
                            Term Definition{" "}
                            <span className=" text-red-500  md:text-lg  ">
                              *
                            </span>
                          </label>
                          <Field
                            as="textarea"
                            name={`Terms[${index}].definition`}
                            className=" focus:border-2 placeholder:text-xs sm:placeholder:text-base  focus:border-blue-400 border border-blue-500 py-1 bg-white    px-1 text-[12px]  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:text-base lg:text-xl transition-all overflow-hidden hover:border-1      outline-none"
                            placeholder="Enter Term Description"
                          ></Field>
                          <ErrorMessage
                            name={`Terms[${index}].definition`}
                            component={Error}
                            className=" text-red-500 md:text-md text-[10px] text-xs sm:text-sm"
                          ></ErrorMessage>

                          {/* termImage input hidden  */}
                          <input
                            hidden
                            ref={(element) =>
                              (fileRefs.current[index] = element)
                            }
                            type="file"
                            accept=".png,.jpeg,.jpg,.jpeg"
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
                        id="addMore"
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
                  className="py-2 px-6 rounded-sm hover:scale-110 bg-blue-700 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  mt-4 ml-[40%]  text-base  sm:text-xl  md:text-2xl  transition-all text-white hover:text-white  flex  "
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
