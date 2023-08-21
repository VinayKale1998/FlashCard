import { createSlice, configureStore } from "@reduxjs/toolkit";

// localStorage.setItem('Decks','[]')

const deckSlice = createSlice({
  name: "deckSlice",
  initialState: localStorage.getItem("Decks") ? JSON.parse(localStorage.getItem("Decks")):[],
  reducers: {
    deckDetailsAdd(state, action) {
      console.log("inside deck reducer")
      console.log(action.payload);
      state.push(action.payload);
      const Decks=JSON.parse(localStorage.getItem('Decks'))
      const newDecks=[...Decks,action.payload]
      localStorage.setItem('Decks',newDecks)
    },

   
  },
});

let count = 1;
const termsSlice = createSlice({
  name: "terms",
  initialState: [],
  reducers: {
    addDeck(state, action) {
      console.log(action.payload);
      console.log('reducer')
        // const Decks=JSON.parse(localStorage.getItem('Decks'))
        // const newDecks=[...Decks,action.payload]
        // localStorage.setItem('Decks',newDecks)
        
      state.push(action.payload);
      console.log(state);
    },
  },
});

const store = configureStore({ reducer: { deck: deckSlice.reducer } });

export default store;

export const deckActions = deckSlice.actions;
export const termActions = termsSlice.actions;
