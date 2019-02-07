import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
import AppMine from "./container/appMine";
import DataField from "./components/dataFeild";
import EnterCountMines from "./components/enterCountMines";

import "./scss/index.scss";
import "./scss/appMine.scss";
import "./scss/flag.scss";
import "./scss/dataField.scss";


let store = createStore(BaseReducer);
//store.subscribe(() => console.log(store.getState()));

class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header"><div><DataField /></div></div>
        <div className="advert"><div><EnterCountMines /></div></div>
        <div className="content"><div><AppMine /></div></div>
        <div className="footer"></div>
        <div className="empty"></div>
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}>
  <Main />
</Provider>, document.getElementById('app'));
