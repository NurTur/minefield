import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormClass from "./container/form";
import AppMine from "./container/appMine";
import DataField from "./components/dataFeild";
import ViewFooter from "./components/viewFooter";

import "./scss/game.scss";
import "./scss/appMine.scss";
import "./scss/flag.scss";
import "./scss/dataField.scss";
import "./scss/viewFooter.scss";
import "./scss/form.scss";

const store = createStore(
  BaseReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => console.log("erl", store.getState()));



class Game extends React.Component {
  render() {
    return (
      <div id="secondPage">
        <div className="container">
          <div className="header"><div></div></div>
          <div className="advert">{/*<div><DataField /></div>*/}</div>
          <div className="content"><div><AppMine /></div></div>
          <div className="footer">{/*<div><ViewFooter /></div>*/}</div>
          <div className="empty"></div>
        </div>
      </div >)
  }
}



class Main extends React.Component {

  render() {
    return (<Router>
      <div>
        <Switch>
          <Route exact path="/" component={FormClass} />
          <Route path="/game" component={Game} />
        </Switch>
      </div>
    </Router>)
  }
}





ReactDOM.render(<Provider store={store}><Main /></Provider>,
  document.getElementById("app")
)


