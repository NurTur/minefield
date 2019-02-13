import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
/*import AppMine from "./container/appMine";
import DataField from "./components/dataFeild";
import EnterCountMines from "./components/enterCountMines";
import ViewFooter from "./components/viewFooter";

import "./scss/index.scss";
import "./scss/appMine.scss";
import "./scss/flag.scss";
import "./scss/dataField.scss";
import "./scss/enterCountMines.scss";
import "./scss/viewFooter.scss";*/
import FormClass from "./container/form";

/*
const store = createStore(
  BaseReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));*/


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import "./scss/form.scss";

class Profile extends React.Component {
  state = { text: "Sign Up", id: "nav1" }

  handleClick(event) {
    event.preventDefault();
    if (this.state.id === "nav1") {
      this.setState({ text: "Log In", id: "nav2" });
    }
    else { this.setState({ text: "Sign Up", id: "nav1" }); }
  }

  render() {
    const { text, id } = this.state;
    const formtext = (text === "Sign Up" ? "Log in for game" : "Register for game");

    return <div className="container">
      <header className="header">
        <nav id={id} onClick={this.handleClick.bind(this)}>{text}</nav>
      </header>
      <main className="main">
        <div className="box">
          <section id="sec1"><p>Wellcome,</p><p>Please</p><p>{formtext}</p> </section>
          <section id="sec2">


            <form className="ui-form">
              <div className="form-row">
                <input type="text" id="email" required /><label htmlFor="email">USERNAME</label>
              </div>
              <div className="form-row">
                <input type="password" id="password" required /><label htmlFor="password">PASSWORD</label>
              </div>
            </form>
            <input type="submit" id="submit" value="LOG IN" />
          </section>
        </div>
      </main>
    </div>;
  }
}



class Main extends React.Component {

  render() {
    return (<Router>
      <div>
        <Switch>
          <Route exact path="/" component={Profile} />

        </Switch>
      </div>
    </Router>)
  }
}


/*class Main extends React.Component {
  state = { HomePage: null }

  componentDidMount() {
    this.onData();
  }

  onData = async () => {
    try {
      const HomePage = await HomePageHTML();
      this.setState({ HomePage });
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const { HomePage } = this.state;
    console.log(HomePage)

    return (
      <div className="container">
        <div className="header"><div><DataField /></div></div>
        <div className="advert"><div><EnterCountMines /></div></div>
        <div className="content"><div><AppMine /></div></div>
        <div className="footer"><div><ViewFooter /></div></div>
        <div className="empty"></div>
      </div>
    )
  }
}*/


/*ReactDOM.render(<Provider store={store}><Main /></Provider>,
  document.getElementById("app")
)*/

ReactDOM.render(<Main />,
  document.getElementById("app")
)
