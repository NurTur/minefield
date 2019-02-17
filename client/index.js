import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormClass from "./container/form";
import RecordClass from "./components/RecordClass";
import GameClass from "./components/GameClass";


import "./scss/headerPage.scss";
import "./scss/records.scss";
import "./scss/tablePage.scss";
import "./scss/formPage.scss";
import "./scss/gamePage.scss";
import "./scss/flag.scss";


const store = createStore(BaseReducer);

store.subscribe(() => console.log(store.getState()));

const Main = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={FormClass} />
        <Route path="/game" component={GameClass} />
        <Route path="/records" component={RecordClass} />
      </Switch>
    </Router>
  </Provider>
)


ReactDOM.render(<Main store={store} />,
  document.getElementById("app")
)


