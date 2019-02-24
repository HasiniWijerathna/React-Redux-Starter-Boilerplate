import React from "react";
import {render} from "react-dom";

import { createStore, applyMiddleware, combineReducers } from 'redux';
 
import App from "./components/App"; 
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
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
* Middleware which we will be using in the applymiddleware function
 We have store passed in to a method which returns a method which takes next() provided by redux as the argument
 which then returns another method which takes the action which then finally has the function body
*/
const myLogger = (state) => (next) => (action) => {
 // functionality
 console.log("Logged action: ", action);
 /**
  * Below helps the action to travel further and if we dont call it, its not reached any further and it gets canceled
   Store and state will not get updated
  */
  next(action);
}
/**
 *  You can not put createStore(mathReducer, userReducer) so on that does not work when you want to get some work with multiple reducers.
    You can only pass one reducer using combineReducers
    ES6 will automatically expand below to key value pairs where the key name matches the value name

    myLogger middleware is passed to the applymiddleware() not executing it just passing the reference

    logger - Function which I need to execute to get the middleware chain. Thats pretty much how redux have imoplemented it so suck it!
 */
 //const store = createStore(combineReducers({mathReducer, userReducer}), {}, applymiddleware(myLogger,logger))
 //const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger))
 
 const store = createStore(combineReducers({mathReducer, userReducer}),
                          applyMiddleware(myLogger, logger))
 /**
  * App component is wrapped to hook up the whole application state
    FYI: Although you need to go to each component and hook up defining which properties of the state of which component,
    and actions need to dispatch     
  */
render(
    <Provider store={store} >
      <App  />
    </Provider>, 
    window.document.getElementById('app'));