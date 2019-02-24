/**
 * Redux middleware
 ----------- FOURTH REDUX REACT --------------
 Middleware allows us to hook in to action and reducer. Once action is dispatched right before reaching the reducer,
 exscicuting some code (Ex: Login process and upcoming state changes)

 Use applymiddleware from redux
 Middleware is setup in the createStore() method

 createStore(combineReducers({mathReducer, userReducer}), {} , applymiddleware());
 First argument - Sets up the reducer
 Second argument - Initial state ({} here since it will be overridden by own initial states of the reducers)
 Third argument - applymiddleware function whihc take the middleware we want to use as the argument


 REDUX LOGGER - Gives us a nice logger logging the state changes
 npm install redux-logger --save
 Get adds to the applymiddleware()
 Logger allows us to get a clear picture of how the ate has been chnaged and the actions
 which gets dispatched like prev state, action, next state expressed clearly
 */
 import { createStore, combineReducers, applymiddleware} from "redux";
 import logger from "redux-logger";

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
  const store = createStore(combineReducers({mathReducer, userReducer}), {}, applymiddleware(myLogger, logger()));
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
