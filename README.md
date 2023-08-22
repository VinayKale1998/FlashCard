# FlashKrew

FlashKrew is an interative flashcard generator application, where users can create a deck of flashcards, store and view them at a later point in time locally.
This project is powered by React JS, Redux and Tailwind CSS, 



## Directory💠
We have split the project's src folder into  Components, Store and UI for ease of management and modularity.

## App.js
Renders the main booking page with Movies, Seats and Timeslot components , handles booking submission and error and comfiration modal dispaly.


## Components Folder 


**Header.js**
Renders the header of the bookMyShow page

**LastBooking.js**
Renders the last booking details by fetching the backend API upon first render and for subsequent booking in the same session , collects booking confirmation from the local state and renders it to avoid unnecessary calls to the backend - Parent: App.js

**Movies.js**

Renders a list of movies and handles user selection - Parent: App.js

**Seats.js**

Renders a list of seat types with input field for user input  and handles user selection -  Parent: App.js


**TimeSlot.js**
Renders a list of seats and handles user selection - Parent: App.js


## Store Folder
**index.js**
Contains the configuration for the Redux store with multiple slices as display, movies , seats and slot with respective actions

## UI Folder
Contains reusable UI components : ErrorModal, ConfirmationModal, BookingConfirmModal, Button, Input , Card and respective module.css files

## Built with

<a href='https://react.dev/' ><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"  height="25" alt='react'></a>
<a href='https://redux.js.org/' ><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"  height="25"></a>
<a href='https://tailwindcss.com/' ><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"  height="25"></a>


## Deployed on
<a href='https://render.com/' ><img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white"  height="25"></a>




