import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormClassCode from "./services/formClass";
import RecordClassCode from "./services/recordClass";
import GameClassCode from "./services/gameClass";


import "./scss/headerPage.scss";
import "./scss/records.scss";
import "./scss/tablePage.scss";
import "./scss/formPage.scss";
import "./scss/gamePage.scss";
import "./scss/flag.scss";


const store = createStore(BaseReducer);

//store.subscribe(() => console.log(store.getState()));

class Main extends React.Component {
  state = { FormClass: null, GameClass: null, RecordClass: null }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
    const FormClass = await FormClassCode();
    const GameClass = await GameClassCode();
    const RecordClass = await RecordClassCode();
    this.setState({ FormClass, GameClass, RecordClass });
  }

  render() {
    const { FormClass, GameClass, RecordClass } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={FormClass} />
            <Route path="/game" component={GameClass} />
            <Route path="/records" component={RecordClass} />
          </Switch>
        </Router>
      </Provider>);
  }
}


ReactDOM.render(<Main />,
  document.getElementById("app")
)


