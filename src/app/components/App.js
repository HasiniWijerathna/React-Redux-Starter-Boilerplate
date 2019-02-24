import React from "react";
import { User } from './User';
import { Main } from './Main';
import {connect} from 'react-redux';

class App extends React.Component {

constructor() {
    super();
    //this.testApp = this.testApp.bind(this);
  //  console.log(this.props);
}

    render() {
      console.log(this.props);
        return (
            <div className="container">
               <Main changeUsername={() => this.props.setName("Anna")}/>
                <User username={this.props.user.name}/>
            </div>
        );
    }
}

 /**
  * Defines that which properties of my global application application state
    do I want to use in this component and then to which local properties is this component to map them

    FYI: If you dont want to use the reducer names here you can change the key names below
    const store = createStore(combineReducers({math: mathReducer, user: userReducer}), applyMiddleware(myLogger, logger))
    Use it like this,
    return {
      user: state.user,
      math: state.math
    };

    Now we have access to the application state by this.props.
    Redux allos to access state after mapping state like below through props using the returned object keys
    <User username={this.props.user.name}/>

    In order to get some use above remember to execute the mapStateToProps() threfore use connect()
  */
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    math: state.mathReducer
  };
};

/**
 * Let Redux know which actions need to dispatch
  Returns a JS object with key values pairs keys created by redux for me.
  Ahhhh the values are actions which needs to get executed!!
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }
  };
};

/**
 * Connect connnects ReactJS and Redux which will get executed automatically
  WTF then we did with <Provider> in the index.js then???
  Well, There we only provide the store then we have to connect each component to get access to the store
  This bugger here accepts two parameters one is ofcourse the mapStateToProps() and the other one is mapDispatchToProps
  and returns another function which takes App / this component to be precise or in my knowledge! :P

  Pretty much this says redux to connect this component with the store
  Because this way I can chooose which properties of the global state and store this component needs
 */
 export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
 * If you dont want export default here add the export at the begginning of the class definition and {App} and use anywhere
 */
// connect(mapStateToProps, mapDispatchToProps)(App);
