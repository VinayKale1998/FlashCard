import { createSlice, configureStore } from "@reduxjs/toolkit";

const deckSlice = createSlice({
  name: "deckSlice",
  initialState: localStorage.getItem("Decks")
    ? JSON.parse(localStorage.getItem("Decks"))
    : [],
  reducers: {
    deckDetailsAdd(state, action) {
      if(localStorage.getItem("Decks")===null ||undefined)
      {
        localStorage.setItem("Decks", "[]")
      }

      // console.log("inside deck reducer");
      // console.log(action.payload);

      state.push(action.payload);
      const Decks = JSON.parse(localStorage.getItem("Decks"));
      const newDecks = [...Decks, action.payload];
      localStorage.setItem("Decks", newDecks);
    },
  },
});



const store = configureStore({ reducer: { deck: deckSlice.reducer } });

export default store;

export const deckActions = deckSlice.actions;

