import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";


import AppMine from "./container/appMine";
import DataField from "./components/dataFeild";


import "./scss/appMine.scss";
import "./scss/flag.scss";
import "./scss/index.scss";
import "./scss/dataField.scss";

let store = createStore(BaseReducer);
//store.subscribe(() => console.log(store.getState()));

class Main extends React.Component {
  render() {
    return (<div>
      <DataField />
      <AppMine />
    </div>
    )
  }
}

ReactDOM.render(<Provider store={store}>
  <Main />
</Provider>, document.getElementById('app'));
