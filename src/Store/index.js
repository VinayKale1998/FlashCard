import { createSlice, configureStore } from "@reduxjs/toolkit";

// configuration for the redux store using createSlice and configure slice methods from @reduxjs/toolkit

//slice created to manage state of the flashcard decks created by the user
const deckSlice = createSlice({
  name: "deckSlice",

  //takes the initial state from the local storage ,used for page reload data retention
  initialState: localStorage.getItem("Decks")
    ? JSON.parse(localStorage.getItem("Decks"))
    : [],
  reducers: {
    //reducer to add deck into the state and handle the local storage as well
    deckDetailsAdd(state, action) {
      if (localStorage.getItem("Decks") === null || undefined) {
        localStorage.setItem("Decks", "[]");
      }
      // console.log("inside deck reducer");
      // console.log(action.payload);

      state.push(action.payload);
      const Decks = JSON.parse(localStorage.getItem("Decks"));
      const newDecks = [...Decks, action.payload];

      localStorage.setItem("Decks", JSON.stringify(newDecks));
    },
  },
});

//store configured 
const store = configureStore({ reducer: { deck: deckSlice.reducer } });


//exporting the store for the provider and actions to access the reducer functions
export default store;
export const deckActions = deckSlice.actions;
