/**
 * Multiple reducers
 ----------- THIRD REDUX REACT --------------
 Untill the SECOND REDUX REACT we only had one reducer which is involded in mathematical stuff
 Lets goahed and change the name of that reducer to mathReducer so we can create more reducers and will not get conflict using a generic name
 We can have multiple states one per reducer since the reducer is the one responsibel for handing the state.

 combineReducers allows to pass created multiple reducers to the createStore()
 combineReducers accepts a JS object simply holds all the reducers as key value pairs
 NOTE : In ES6 if the key value pairs are same in name you can just pass the value by shorten that
 EX : combineReducers({mathReducer: mathReducer}) -> combineReducers({mathReducer})
 */
import { createStore, combineReducers } from "redux";
/**
 * Holds the initial state object of the mathReducer
 */
const initialMathState = {
  result: 1,
  lastValues: []
};

/**
 * Change the name to mathReducer to narrow the  similar functionalities to a one reducer
 */
const mathReducer = (state = initialMathState, action) => {
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
 * Holds the initial state object of the userReducer
 */
const initialUserState = {
  name: "Max",
  age: 25
};
/**
 * userReducer contains user related functionalities
 */
 const userReducer = (state = initialUserState, action) => {
   switch (action.type) {
     case "SET_NAME":
       state = {
         ...state,
         name: action.payload
       };
       break;
     case "SET_AGE":
     state = {
       ...state,
       age: action.payload
     };
       break;
   }
   return state;
 };

/**
 *  You can not put createStore(mathReducer, userReducer) so on that does not work when you want to get some work with multiple reducers.
    You can only pass one reducer using combineReducers
    ES6 will automatically expand below to key value pairs where the key name matches the value name
 */
 const store = createStore(combineReducers({mathReducer, userReducer}));
 /**
  *
    Payload below is always just a value want to change the state
   ----------------------------------------------------------------------------
   Names for the actions here should always be used once. Because here they dispatch on one store. Can use prefix in order to
   use the same action type names
  */
  store.dispatch({
    type: "ADD",
    payload: 10

  });
  store.dispatch({
    type: "SUBSTRACT",
    payload: 10

  });
  store.dispatch({
    type: "SET_AGE",
    payload: 10

  });
  /**
   * Subscibe to the store which means whenever the store gets updated, fire this callback pass here
     store.getSate() - built in funtion which gives us the new state
   */
   store.subscibe(() => {
     console.log("Store updated!!", store.getSate());
   });
