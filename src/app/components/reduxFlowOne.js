/**
 * First ever redux class and hell yeah!! its been great so far
  Imma keeping this file as my first redux basic explanation
  So naming this as the very first step fellas!!
  ----------- FIRST REDUX REACT --------------
 */

import { createStore } from "redux";
/**
 *   In order to determine which action occured so one reducer typically handles multiple actions
     Reducer - METHOD - Part which takes the actions dispatch anywhere in the application and does something with that action
    (Determine how the sate should be changed)
    Always have to return a state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      state = state + action.payload;
      break;
    case "SUBSTRACT":
    state = state -  action.payload;
      break;
  }
  return state;
};

/**
 * Accepts two arguments
   1. Reducer - METHOD - Part which takes the actions dispatch anywhere in the application and does something with that action
   (Determine how the sate should be changed)
   could be multiple reducers
   2. Initial application state (could be a JS object or an array here I pass just an integer)
 */
const store = createStore(reducer, 1);

/**
 * Actions which dipatch on reducers
   Store pass these to the reducer. Store doesnt know how to handle it,
   it just passes them down to the reducres
   Accepts a JS object as an argument
 */
 store.dispatch({
   type: "ADD",
   payload: 10

 });
 store.dispatch({
   type: "SUBSTRACT",
   payload: 10

 });

 /**
  * Subscibe to the store which means whenever the store gets updated, fire this callback pass here
    store.getSate() - built in funtion which gives us the new state
  */
  store.subscibe(() => {
    console.log("Store updated!!", store.getSate());
  });
