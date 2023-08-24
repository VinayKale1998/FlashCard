# FlashKrew

FlashKrew is an interactive flashcard generator web application, where users can create a deck of flashcards, store and view them at a later point in time locally.
This project is powered by React JS, Redux , Tailwind CSS,Formik,Yup react-routerd-dom  and Jest

## Directory💠

The project's src folder is split into Components, Store and UI and test for ease of management and modularity.

## App.js

Contains code for route configurations for react-router-dom and renders the RouterProvider

This app uses a total of Five pages:- **HomePage**, **CreateFlashCard page** ,**MyFlashCards page**, **FlashCard Page** and **Error page**



## Pages Folder

**HomePage**
HomePage contains the web app header "FlashKrew" with a nav bar for createflashcard and myflashcards page, it has a outlet for rendering routes from it
By default the outler renders the below createflashcard page because of the router configurations

**CreateFlashCard**
The major page in the whole app, where we actually use Formik library to add Forms for Flash card deck creation. 
Handles the below things

1. Accept User input for Group name , Description and Group Image
2. Accept user input for Term Name(card name), term description and Term image, multiple such terms can be added to one group
3. Maintains the state of the form
4. Handles the form submission ,wherein we have dispatched actions to redux store which inturn manages localstorage data

**ErrorPage**
ErrorPage is bound as a fallback in the router configuration to ensure when the user enters an inavlid route upon the base route, the user is redirected to this page,
contains link to the Create FlashCard Page and MyFlashcards Page

**MyFlashCards Page**
This page renders a list of Groups(decks) if created

**FlashCards**
This page renders the expansion of the selected Groups by rendering the term details using a carousel for images and allows user to download and share the current deck

## Store Folder

**index.js**
Contains the configuration for the Redux store which uses @reduxjs/toolkit , deckSlice created to maintain state of the added decks

Handles deck addition and keeps the localstorage in sync with the state using the reducer functions

## UI Folder

**Error.js**
Renders the error element for Formik form errors used in createFlashcard page

**PreviewImage.js**
Acts as a wrapper element to render images with img elements

**ShareModal.js**

This component uses react portal to open up a modal for sharing the deck link and uses the respective module.css file

**Card.js**
This component acts as a simple div wrapper



## Test Folder
 Contains test files for the App components

# Built with

<a href='https://react.dev/' ><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"  height="25" alt='react'></a>
<a href='https://redux.js.org/' ><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"  height="25"></a>
<a href='https://tailwindcss.com/' ><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"  height="25"></a>

## Deployed on

<a href='https://render.com/' ><img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white"  height="25"></a>
