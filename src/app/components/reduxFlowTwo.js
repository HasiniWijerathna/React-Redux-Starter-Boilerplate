/**
 * State and immutabitily.
   ----------- SECOND REDUX REACT --------------
   state which is passed to the create store is the initial state of the app,
   which can be an array or a object. Those are reference types in JS which means those stored in the memory
   and varibales only pointing to them as poiters pointing to them where they stored in the memory.
   So changing the state in immutable way is expressed below
 */

import { createStore } from "redux";
/**
 * Holds the initial state object
 */
const initialState = {
  result: 1,
  lastValues: []
};

/**
 *
    Add default parameters ES6 to define the default initialState in the case where no state is sent
    When dipatch an action redux passes the current state to the reducer ignoring the initial state.
    If no state is passed when the app initializing the defined initialState values is be passed to initialize the state
    ----------------------------------------------------------------------------
    Since initialstate is an object and belongs to reference type changes
    are made to the old object because its the same place in the memory

    Immutable approch is better otherwise we would not have a way to go back to an old state

    state = {
      ...state,
    };

    Above meaning,
    with the benifit of if we change (add or remove) any value in the object
    we don't have to make the changes everywhere it has been used

    state = {
      result: state.result,
      lastValues: state.lastValues
    };

    Above helps to override the relevent defined values only in the object
    Ex : result. It only override the prior result value in the object so on you can change the relevent value defineing them by overriding.
    First spread all the properties of the object and then override only the relevent values
    state = {
      ...state,
      result: state.result + action.payload
    };

    if you are confused with this,
    lastValues: [...state.lastValues, action.payload] mean adding goo to,  -> ['foo','bar']
    ['foo','bar','goo'] ;) or you can push of course

 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      break;
    case "SUBSTRACT":
    state = {
      ...state,
      result: state.result - action.payload,
       lastValues: [...state.lastValues, action.payload]
    };
      break;
  }
  return state;
};

/**
 *
   Integer value passed in the FIRST REDUX REACT file is deleted since there is a defined initial state above
 */
const store = createStore(reducer);

/**
 *
   Payload below is always just a value want to change the state
  ----------------------------------------------------------------------------
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
